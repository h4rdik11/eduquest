# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.0
FROM node:${NODE_VERSION}-slim as base

ENV DB_USER=root
ENV DB_PASS=2F1pXJhnN8MuvuEC

# Node.js app lives here
WORKDIR /server

# Set production environment
ENV NODE_ENV="production"

# Install node modules
COPY package.json ./
RUN npm install

# Copy application code
COPY . .

RUN ls -la

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "node", "index.js" ]
