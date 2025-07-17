FROM node:20.19.0-alpine AS builder

RUN apk add --no-cache git openssh-client

WORKDIR /app

RUN --mount=type=ssh \
    GIT_SSH_COMMAND="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no" \
    git clone git@github.com:CORETEQ/mixin-ui.git --branch main --single-branch ./mixin-ui \
 && cd mixin-ui \
 && npm install --global pnpm \
 && pnpm install \
 && pnpm run build:web

EXPOSE 3000

WORKDIR /app/mixin-ui

CMD ["node", "dist/libs/web/analog/server/index.mjs"]
