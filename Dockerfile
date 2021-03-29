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
COPY api/Pipfile .
COPY api/Pipfile.lock .
RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --deploy

#=======================================================================================================================

FROM node:13.12.0-alpine as ui-build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm i --silent
#RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./
RUN npm run build

#=======================================================================================================================

FROM base AS runtime

RUN apt update && apt-get install -y --no-install-recommends nginx

RUN rm /etc/nginx/sites-enabled/default
COPY CFE.conf /etc/nginx/conf.d
COPY --from=ui-build /app/build /var/www/html/


# Copy virtual env from python-deps stage
COPY --from=python-deps /.venv /.venv
ENV PATH="/.venv/bin:$PATH"

# Create and switch to a new user
WORKDIR /api


# Install application into container
COPY api/ .
COPY start_all.sh .
RUN chmod +x start_all.sh
EXPOSE 8080
EXPOSE 8000
# Run the application
CMD ./start_all.sh

#=======================================================================================================================