import argparse
import concurrent

import random
import re 
import os
import time
os.environ["TOKENIZERS_PARALLELISM"]="false"
from langchain.prompts import PromptTemplate
from langchain_community.llms import OpenAI
from langchain.chains import LLMChain
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

import logging


STRATS = [
    ["Synonymy", """la phrase a le même sens, mais on en a changé la grammaire simple et le vocabulaire.
Exemple : Effectuer les démarches administratives
Résultat : Faire ses démarches administratives"""],
    ["Explanation", """explication de mots culturels, du contexte français, de concepts, etc. Donner des exemples. Ajout d'une info exogène, complément.
Exemple : l'apprentissage du vocabulaire français technique
Résultat : des cours de français professionnel (vocabulaire technique et spécifique)    """],
    ["Compression", """Simplification de construction grammaticale (phrases passives en actives, changement de temps). Cela ne doit pas remplacer des mots simples par des mots plus compliqués
Exemple : Une information juridique généraliste sur divers domaines du droit
Résultat : Rendez-vous individuels et conseils personnalisés"""]
]

import nltk
nltk.download("punkt")

def simpli_text_wrapper(text:str, llm, max_retries:int = 5):
    sentences = nltk.tokenize.sent_tokenize(text)
    result = [simpli_phrase_wrapper(sentence, llm, max_retries) for sentence in sentences]
    return result


def simpli_phrase_wrapper(phrase:str, llm, max_retries:int = 5):
    assert isinstance(phrase, str)
    for i in range(max_retries):
        try:
            return simpli_phrase(phrase, llm)
        except Exception as e:
            logging.error(f"{repr(e)}")
            time.sleep(1)

def simpli_phrase(phrase:str, llm):
    """simplifie une phrase"""
    historic = [phrase]
    strats_applied = []
    justifications = []
    for strat, temp in STRATS:
        template = """Ci-dessous un texte :
        ```
        {phrase}
        ```
        L'objectif est de rendre se message court et accessible pour des personnes qui maîtrise mal le français. Mais pour le moment, concentre-toi sur l'utilisation ou non d'une stratégie de simplification du message.
        Au regard du texte est ce que la stratégie suivante de semble pertinente ?
        La stratégie :
        ```
        {strat}
        ```
        Voici les différentes versions précedentes de la phrase, l'idéal serait de ne pas retomber dans une version précédente:
        ```
        {historic}
        ```
        Justifie si la stratégie est pertinente ou non sur le texte, la justification peut être un peu détaillée. Puis termine ton message par `OUI` pour utiliser la stragégie ou `NON` pour ne pas appliquer la stratégie.
        """
        prompt = PromptTemplate(input_variables=["phrase", "strat"], template=re.sub("[ ]{2,}", " ", template.strip()))
        chain = prompt | llm | StrOutputParser()
        rep = chain.invoke({"phrase":phrase, "strat":temp, "historic":"\n".join(f"{i}. {w}\n" for i, w in enumerate(historic))})
        do_strat = re.search(r"\**OUI\**", rep)# "OUI" in rep
        clean_rep = rep.replace("**OUI**", "OUI").replace("**NON**", "NON").replace("OUI", "").replace("NON", "").strip()

        if do_strat:
            template_strat = """Voici une phrase à transformer :
            ```
            {phrase}
            ```
            Ton rôle est d'appliquer la stratégie suivante pour transformer la phrase :
            ```
            {strat}
            ```
            Voici le pourquoi et le comment appliquer la stratégie :
            ```
            {clean_rep}
            ```
            Applique directement et simplement la stratégie pour transformer la phrase. N'ajoute pas de justification ou de complément
            """
            prompt = PromptTemplate(input_variables=["phrase", "strat"], template=re.sub("[ ]{2,}", " ", template_strat.strip()))
            chain = prompt | llm | StrOutputParser()
            new_phrase = chain.invoke({"phrase":phrase, "strat":strat, "clean_rep":clean_rep})
            new_phrase = re.split(r"\**Justification:?\**", new_phrase, re.IGNORECASE)[0].strip()
            logging.info(f"Avec la strat {strat} on remplace\n#{phrase}#\npar\n#{new_phrase}#\n")
            phrase = new_phrase
            historic.append(phrase)
            strats_applied.append(strat)
            justifications.append(clean_rep)
        else:
            logging.info(f"strat {strat} skipped")
    assert len(strats_applied) == len(justifications)
    return historic, strats_applied, justifications


if __name__ == "__main__":

    class Config:
        # Edit me!
        LLM_MODEL = "gemma2-27b"#'vicuna:13b-v1.5-16k-q8_0' #'mixtral'
        LLM_MAX_TOKENS = 2048
        LLM_TEMPERATURE = 0.0 # between 0.0 and 1.0
        LLM_FREQUENCY_PENALTY = 0.2 # between 0.0 and infinity
        LLM_PRESENCE_PENALTY = 0.0 # between 0.0 and infinity
    llm = ChatOpenAI(
    openai_api_base = os.environ["OPENAI_API_BASE"],
    openai_api_key = os.environ["OPENAI_API_KEY"],
    model_name = Config.LLM_MODEL,
    #max_tokens = Config.LLM_MAX_TOKENS,
    temperature = Config.LLM_TEMPERATURE,
    #model_kwargs = {
    #    'frequency_penalty': Config.LLM_FREQUENCY_PENALTY, 
    #    'presence_penalty': Config.LLM_PRESENCE_PENALTY,
    #}
    )
    print(simpli_phrase("Connaître les différents contrats (CDD, CDI, intérim...) et le droit du travail pour un salarié"))
