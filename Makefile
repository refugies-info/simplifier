setupuv:
	curl -LsSf https://astral.sh/uv/install.sh | sh
	uv sync
st:
	@export $(shell grep -v '^#' .env | xargs) && uv run streamlit run app.py