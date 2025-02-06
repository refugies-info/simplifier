setupuv:
	curl -LsSf https://astral.sh/uv/install.sh | sh
	uv sync
st:
	@export $(shell grep -v '^#' .env | xargs) && uv run streamlit run app.py
api:
	@export $(shell grep -v '^#' .env | xargs) && uv run fastapi dev apps/fastapi/main.py