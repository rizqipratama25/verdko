FROM ghcr.io/astral-sh/uv:latest AS uv_bin
FROM python:3.13-bookworm AS builder

WORKDIR /app

COPY --from=uv_bin /uv /bin/

ENV VIRTUAL_ENV=/app/.venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY pyproject.toml uv.lock* ./

RUN uv sync --frozen --no-cache

RUN uv run playwright install chromium

FROM python:3.13-bookworm AS final

WORKDIR /app

ENV VIRTUAL_ENV=/app/.venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
ENV PLAYWRIGHT_BROWSERS_PATH=/root/.cache/ms-playwright

COPY --from=builder /app/.venv /app/.venv
COPY --from=builder /root/.cache/ms-playwright /root/.cache/ms-playwright

RUN apt-get update && \
    playwright install-deps chromium && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY . .

CMD ["python", "-u", "main.py"]