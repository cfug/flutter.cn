FROM ruby:3.1.2-buster@sha256:d2e0889c0d5f071a8ac71acc1a0e58282fa20851bd0260919bff071cc7f2c888 AS base

ENV TZ=Asia/Shanghai
RUN apt-get update && apt-get install -yq --no-install-recommends \
      build-essential \
      diffutils \
      git \
      lsof \
      vim-nox \
      xdg-user-dirs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app



# ============== INSTALL FLUTTER ==============
# NOTE that this will fail if you have not cloned the repo with --recurse-submodules 
# or run `git submodule update --init --recursive` after cloning.
FROM base AS flutter

# This Flutter install uses/requires the local ./flutter submodule
COPY ./flutter ./flutter
COPY ./site-shared ./site-shared
COPY pubspec.yaml ./

ARG FLUTTER_BUILD_BRANCH
ENV FLUTTER_BUILD_BRANCH=$FLUTTER_BUILD_BRANCH
ENV FLUTTER_ROOT=flutter
ENV FLUTTER_BIN=flutter/bin
ENV PATH="/app/flutter/bin:$PATH"

# Used if wanting to build the container with a different branch, this 
# would change the current branch of and update the mirrored submodule
# e.g. `make build FLUTTER_BUILD_BRANCH=beta`
# This is not to be confused with the $FLUTTER_TEST_BRANCH
RUN if test -n "$FLUTTER_BUILD_BRANCH" -a "$FLUTTER_BUILD_BRANCH" != "stable" ; then \
      cd flutter && \
      git fetch && \
      git remote set-branches origin "$FLUTTER_BUILD_BRANCH" && \
      git fetch --depth 1 origin "$FLUTTER_BUILD_BRANCH" && \
      git checkout "$FLUTTER_BUILD_BRANCH" -- && \
      git pull; \
    fi

# Set up Flutter
# NOTE You will get a warning "Woah! You appear to be trying to run flutter as root."  
# and this is to be disregarded since this image is never deployed to production.
RUN flutter doctor
RUN flutter --version
RUN dart pub get



# ============== NODEJS INTSALL ==============
FROM flutter AS node

RUN curl -sL https://deb.nodesource.com/setup_18.x -o node_setup.sh && \
      bash node_setup.sh 1> /dev/null
RUN apt-get update -q && apt-get install -yq --no-install-recommends \
      nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install global Firebase CLI
RUN npm install -g firebase-tools@11.16.0



# ============== FLUTTER CODE TESTS ==============
FROM flutter AS tests

COPY ./ ./

ARG FLUTTER_TEST_BRANCH=stable
ENV FLUTTER_TEST_BRANCH=$FLUTTER_TEST_BRANCH

# Only test the code here, checking links is purely for site deployment
# NOTE bash scripts will switch the Flutter branch based on $FLUTTER_TEST_BRANCH
ENTRYPOINT ["tool/test.sh"]



# ============== DEV / JEKYLL SETUP ==============
FROM node AS dev

ENV JEKYLL_ENV=development
RUN gem install bundler
COPY Gemfile Gemfile.lock ./
RUN bundle config set force_ruby_platform true
RUN bundle install

# Install Node deps
ENV NODE_ENV=development
COPY package.json package-lock.json ./
RUN npm install

COPY ./ ./

# Jekyl ports
EXPOSE 35729
EXPOSE 4002

# Firebase emulator port
# Airplay runs on :5000 by default now
EXPOSE 5500



# ============== BUILD PROD JEKYLL SITE ==============
FROM node AS build

ENV JEKYLL_ENV=production
RUN gem install bundler
COPY Gemfile Gemfile.lock ./
RUN bundle config set force_ruby_platform true
RUN BUNDLE_WITHOUT="test development" bundle install --jobs=4 --retry=2

ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci

COPY ./ ./

# RUN echo $'User-agent: *\nAllow: /' > src/robots.txt

# ARG BUILD_CONFIGS=_config.yml
# ENV BUILD_CONFIGS=$BUILD_CONFIGS
# RUN bundle exec jekyll build --config $BUILD_CONFIGS

RUN ["tool/translator/build.sh"]

FROM build as checklinks

CMD ["tool/check-links.sh"]
