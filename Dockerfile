FROM ruby:3.2.3-slim-bookworm@sha256:97fccffe954d1e0c7fa6634020379417d67435a7f9a7c10b6ef3f49e498307e6 as base

SHELL ["/usr/bin/bash", "-c"]

# Configure Debian mirrors.
RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list.d/debian.sources

#ENV http_proxy="http://192.168.0.10:8764"
#ENV https_proxy="http://192.168.0.10:8764"
ENV no_proxy="localhost,127.0.*,172.0.*,192.168.*,*.cn"

ENV TZ=Asia/Shanghai
RUN apt-get update && apt-get install -yq --no-install-recommends \
      apt-transport-https \
      build-essential \
      ca-certificates \
      curl \
      diffutils \
      git \
      gnupg \
      lsof \
      make \
      rsync \
      unzip \
      xdg-user-dirs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app



# ============== INSTALL FLUTTER ==============
FROM base AS flutter

COPY ./site-shared ./site-shared
COPY pubspec.yaml ./

ARG FLUTTER_BUILD_BRANCH=stable
ENV FLUTTER_BUILD_BRANCH=$FLUTTER_BUILD_BRANCH
ENV FLUTTER_ROOT=flutter
ENV FLUTTER_BIN=flutter/bin
ENV PATH="/flutter/bin:$PATH"

RUN git clone --branch $FLUTTER_BUILD_BRANCH --single-branch --filter=tree:0 https://github.com/flutter/flutter /flutter/
VOLUME /flutter

#ENV PUB_HOSTED_URL="https://pub.flutter-io.cn"
#ENV FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"

# Set up Flutter
# NOTE You will get a warning "Woah! You appear to be trying to run flutter as root."
# and this is to be disregarded since this image is never deployed to production.
RUN flutter doctor
RUN flutter config --no-analytics  \
    && flutter config --no-cli-animations  \
    && flutter --version
RUN dart pub get



# ============== NODEJS INTSALL ==============
FROM flutter AS node

RUN mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
    && apt-get update -yq \
    && apt-get install nodejs -yq \
    && npm install -g npm # Ensure latest npm


# ============== FLUTTER CODE TESTS ==============
FROM flutter AS tests

COPY ./ ./

# Only test the code here, checking links is purely for site deployment
ENTRYPOINT ["tool/test.sh"]


# ============== DEV / JEKYLL SETUP ==============
FROM node AS dev

#RUN gem sources --add https://mirrors.tuna.tsinghua.edu.cn/rubygems/ --remove https://rubygems.org/
#RUN bundle config mirror.https://rubygems.org https://mirrors.tuna.tsinghua.edu.cn/rubygems

ENV JEKYLL_ENV=development
ENV RUBY_YJIT_ENABLE=1
RUN gem install bundler
COPY Gemfile Gemfile.lock ./
RUN bundle config set force_ruby_platform true
RUN bundle install

# Install Node deps
ENV NODE_ENV=development
COPY package.json package-lock.json ./
RUN npm ci

COPY ./ ./

# Jekyl ports
EXPOSE 35730
EXPOSE 4002

# Firebase emulator port
# Airplay runs on :5000 by default now
EXPOSE 5502

RUN tool/move_docs.sh

# ============== BUILD DEV JEKYLL SITE ==============
FROM dev as dev-build

RUN tool/move_docs.sh; tool/translator/build.sh

# ============== BUILD PROD JEKYLL SITE ==============
FROM node AS build

ENV JEKYLL_ENV=production
ENV RUBY_YJIT_ENABLE=1
RUN gem install bundler
COPY Gemfile Gemfile.lock ./
RUN bundle config set force_ruby_platform true
RUN BUNDLE_WITHOUT="test development" bundle install --jobs=4 --retry=2

ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci

COPY ./ ./

# RUN echo $'User-agent: *\nAllow: /' > src/robots.txt

ARG BUILD_CONFIGS=_config.yml
ENV BUILD_CONFIGS=$BUILD_CONFIGS
# RUN bundle exec jekyll build --config $BUILD_CONFIGS

RUN tool/move_docs.sh; tool/translator/build.sh
