import locale
import logging
import os
import re
import tempfile
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.metrics import classification_report
from transformers import AutoModelForSequenceClassification, AutoTokenizer, Trainer

try:
    locale.setlocale(locale.LC_TIME, "fr_FR.UTF-8")
except locale.Error:
    print("fr_FR.UTF-8 locale not available, falling back to default")
    locale.setlocale(locale.LC_TIME, "C")  # Fallback to a default locale

import streamlit as st


def disable_sidebar():
    """
    Disable sidebar in Streamlit page.
    """
    st.markdown(
        """
<style>
    [data-testid="stSidebar"],
    [data-testid="collapsedControl"] {
        display: none;
    }
</style>
        """,
        unsafe_allow_html=True,
    )


# ---

TITLE = "Demo gen AI"

st.set_page_config(
    page_title=TITLE,
)

# ---

# Disable sidebar
disable_sidebar()

# ---

st.title(TITLE)


txt = st.text_area("", placeholder="type here")


def process(text: str):
    assert isinstance(text, str)
    result = {}
    label_encoder_classes_ = [
        "Compression",
        "Explanation",
        "Modulation",
        "Omission",
        "Substitution",
        "Synonymy",
        "Syntactic",
        "Transcription",
        "Transposition",
        "nan",
    ]
    data = pipe(text)[0]
    for i, l in enumerate(data):
        assert l["label"] == f"LABEL_{i}"
        result[label_encoder_classes_[i]] = l["score"]
    return result


# Load the saved model and tokenizer
saved_model_path = "/home/alex/CODE/genai-for-public-good/bert-base-multilingual-cased_Combined"
model = AutoModelForSequenceClassification.from_pretrained(saved_model_path)
tokenizer = AutoTokenizer.from_pretrained(saved_model_path)
from transformers import TextClassificationPipeline

pipe = TextClassificationPipeline(model=model, tokenizer=tokenizer, return_all_scores=True)


@st.cache_data(max_entries=1, ttl="30minutes")
def process_(text_input):
    return "none"


if len(txt.strip()):
    if st.button("GO"):
        dict_ = process(txt.strip())
        df = pd.DataFrame(dict_, index=[0]).T
        st.success(f"{dict_}")
        st.bar_chart(df)
