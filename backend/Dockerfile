FROM node:18.16.0-alpine3.17

# Create app directory
RUN mkdir -p /home/app && chown -R node:node /home/app
WORKDIR /home/app

# Install app dependencies
COPY --chown=node:node package*.json ./
# COPY --chown=node:node . .
USER node

RUN npm install

# If you are building your code for production
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

#EXPOSE internal port 3000
EXPOSE  3000

# Run the web service on container startup.
CMD [ "npm", "start" ]
