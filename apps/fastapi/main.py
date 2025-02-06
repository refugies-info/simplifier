from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import argparse
import re 
import os
import time
from langchain.prompts import PromptTemplate
from langchain_community.llms import OpenAI
from langchain.chains import LLMChain
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI


os.environ["TOKENIZERS_PARALLELISM"]="false"

import logging


from typing import Union

from fastapi import FastAPI

app = FastAPI()
# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

from simpli import simpli_phrase_wrapper, simpli_text_wrapper

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

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Type, Union, Any
from enum import Enum

class APIResult(BaseModel):
    phrase: str
    historic: list[str]
    strats_applied: list[str]
    justifications: list[str]

class APIResultText(BaseModel):
    result: list[APIResult]
    

@app.post("/phrase", response_model=APIResult)
async def main(phrase:str):
    historic, strats_applied, justifications = simpli_phrase_wrapper(phrase, llm)
    logging.warn(f"{historic=}")
    logging.warn(f"{strats_applied=}")
    logging.warn(f"{justifications=}")
    return APIResult(phrase=historic[-1], historic=historic, strats_applied=strats_applied, justifications=justifications)


@app.post("/text", response_model=APIResultText)
async def main(phrase:str):
    list_ = simpli_text_wrapper(phrase, llm)
    list__ = [APIResult(phrase=historic[-1], historic=historic, strats_applied=strats_applied, justifications=justifications) for historic, strats_applied, justifications in list_]
    
    return APIResultText(result=list__)

#@app.post("/phrase", response_model=APIResult)
#async def main(phrase:str):
#    historic, strats_applied, justifications = simpli_phrase_wrapper(phrase:str, llm)
#    return APIResult(phrase=historic[-1], historic=historic, strats=strats_applied, justifications=justifications)



@app.get("/")
def read_root():
    return {"Hello": "World"}

