ARG RUBY_VERSION=3.0
FROM ruby:${RUBY_VERSION}-buster@sha256:6986a308eab6b20c612e6e0376196fa05e79973dd6e42c588c498dee9ce54832 as dev

ENV TZ=Asia/Shanghai

ARG NODE_VERSION=17
ENV NODE_VERSION=$NODE_VERSION

RUN curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x -o node_setup.sh && \
      bash node_setup.sh 1> /dev/null
RUN apt-get update && apt-get install -yq --no-install-recommends \
      build-essential \
      vim \
      git \
      diffutils \
      xdg-user-dirs \
      nodejs && \
      rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Ruby deps
ENV JEKYLL_ENV=development
RUN gem install bundler
COPY Gemfile Gemfile.lock ./
RUN bundle config set force_ruby_platform true
RUN bundle install

# Install Node deps
ENV NODE_ENV=development
COPY package.json package-lock.json ./
RUN npm ci

COPY ./ ./

# So that we have the most up to date submodules
RUN git submodule update --init --recursive

ARG FLUTTER_BRANCH
ENV FLUTTER_BRANCH=$FLUTTER_BRANCH
ENV FLUTTER_ROOT=flutter
ENV FLUTTER_BIN=flutter/bin
ENV PATH="/app/flutter/bin:$PATH"

# Used if wanting to build the container with a different branch
# e.g. `make FLUTTER_BRANCH=dev build`
# This is not to be confused with the $TEST_TARGET_CHANNEL
RUN if test -n "$FLUTTER_BRANCH" -a "$FLUTTER_BRANCH" != "stable" ; then \
      cd flutter && \
      git fetch && \
      git remote set-branches origin "$FLUTTER_BRANCH" && \
      git fetch --depth 1 origin "$FLUTTER_BRANCH" && \
      git checkout "$FLUTTER_BRANCH" -- && \
      git pull; \
    fi

# Set up Flutter
RUN flutter doctor
RUN flutter --version
RUN dart pub get

EXPOSE 35729
EXPOSE 4002


# -- Test target
FROM dev as test
ARG DISABLE_TESTS
ENV DISABLE_TESTS=$DISABLE_TESTS
ARG TEST_TARGET_CHANNEL=stable
ENV TEST_TARGET_CHANNEL=$TEST_TARGET_CHANNEL
RUN tool/test.sh --target $TEST_TARGET_CHANNEL --check-links --null-safety


# -- Build target
FROM test AS builder

ENV JEKYLL_ENV=production
ENV NODE_ENV=production

RUN bundle install
RUN cd flutter && \
      git fetch && \
      git remote set-branches origin stable && \
      git fetch origin stable && \
      git checkout stable && \
      git pull
RUN flutter doctor
RUN tool/translator/build.sh
