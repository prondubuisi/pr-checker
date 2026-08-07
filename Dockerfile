FROM node:20-alpine

WORKDIR /app

RUN adduser -D octocat && \
    chown octocat:octocat /app
USER octocat

# Install when package manifests change
COPY --chown=octocat:octocat package.json package-lock.json /app/

# Full install so `npm start` can build the React app
RUN npm ci

COPY --chown=octocat:octocat . /app

EXPOSE 5000

ENTRYPOINT ["npm", "start"]
