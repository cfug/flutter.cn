#!/usr/bin/make -f
-include .env


all: build clean

.DEFAULT_GOAL := up
.PHONY: all

BUILD_COMMIT := $(shell git rev-parse --short HEAD)
BUILD_CONFIGS ?= _config.yml
BUILD_NAME = tmpbuild
BUILD_TAG = "fltbuild:${BUILD_COMMIT}"

# Build the production image and copy site build to local. 
# This will reset and also clean up after finished.
# Usage: `make build`
build:
	make clean
	DOCKER_BUILDKIT=1 docker build --rm --no-cache --target build \
  		--build-arg BUILD_CONFIGS=${BUILD_CONFIGS} -t ${BUILD_TAG} .
	docker run --rm -d --name ${BUILD_NAME} -t ${BUILD_TAG}
	docker cp ${BUILD_NAME}:/app/_site _site
	docker stop ${BUILD_NAME}
	docker rmi -f ${BUILD_TAG}

# Clean all caches, and test/build files
clean:
	rm -rf _site .jekyll* src/.jekyll* *.log tmp .dart_tool

# Deploy the Firebase hosting site from local. 
# NOTE that if you have a FIREBASE_TOKEN exported or 
# in your local `.env` file, it will be used. This style 
# is used inside the Github action.
# Usage: `make deploy`
deploy:
	bash tool/translator/deploy-cn.sh

# Move around docs in order to customize path orders
move-docs:
	bash tool/move_docs.sh

stage-local:
	make clean
	DOCKER_BUILDKIT=1 docker build --rm --no-cache --target build \
  		--build-arg BUILD_CONFIGS=${BUILD_CONFIGS} -t ${BUILD_TAG} .
	docker run --rm -d --name ${BUILD_NAME} -t ${BUILD_TAG}
	docker cp ${BUILD_NAME}:/app/_site _site
	docker stop ${BUILD_NAME}
	docker rmi -f ${BUILD_TAG}
