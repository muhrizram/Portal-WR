FROM harbor.cloudias79.com/devops-tools/node:18.16.0-alpine3.18 as builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN apk --update --no-cache add \
    libc6-compat \
    libpng-dev \
    automake \
    autoconf \
    file \
    g++ \
    tzdata \
    libtool \
    make \
    nasm \
    build-base \
    zlib \
    zlib-dev
USER root
ENV TZ="Asia/Jakarta"
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app
RUN rm -f package-lock.json
RUN npm cache clean --force
RUN npm install && npm run build --prefer-offline --no-audit

# RUNNER IMAGE
FROM nginx:stable

ENV TZ="Asia/Jakarta"
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/build /usr/share/nginx/html/wr