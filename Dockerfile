FROM node:20-alpine

WORKDIR /app

RUN adduser -D octocat && \
    chown octocat:octocat /app
USER octocat

# Install when package manifests change
COPY --chown=octocat:octocat package.json package-lock.json /app/

RUN npm ci

COPY --chown=octocat:octocat . /app

# React app is built at image build time, not on every container start
ENV CI=true
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start-server"]
