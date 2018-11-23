FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install the API dependencies
# We'll use a wildcard to ensure that wer use the package-lock.json to get the correct versions
COPY package*.json ./

# This should be changed and remove the --only flag for non-prodcution envs
RUN npm install --only=production

# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]