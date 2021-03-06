FROM python:3.9-slim as base

# Setup env
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1

#=======================================================================================================================

FROM base AS python-deps

# Install pipenv and compilation dependencies
RUN pip install pipenv
RUN apt-get update && apt-get install -y --no-install-recommends gcc

# Install python dependencies in /.venv
COPY Pipfile .
COPY Pipfile.lock .
RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --deploy

#=======================================================================================================================

FROM node:13.12.0-alpine as ui-build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

#=======================================================================================================================

FROM base AS runtime

RUN apt-get install -y --no-install-recommends nginx

RUN rm /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/

# Copy virtual env from python-deps stage
COPY --from=python-deps /.venv /.venv
ENV PATH="/.venv/bin:$PATH"

# Create and switch to a new user
WORKDIR /api


# Install application into container
COPY . .

EXPOSE 8000
# Run the application
ENTRYPOINT ["gunicorn", "api:app"]
CMD ["-w", "2", "-b", "0.0.0.0:8000"]

#=======================================================================================================================