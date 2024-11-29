# Use an official Node.js image as the base
FROM ubuntu:25.04

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN apt-get update && apt-get install -y udev npm nodejs

RUN npm install

# Copy the app files
COPY . .

# Expose the app's port
EXPOSE 3001

# Run the app
CMD ["npm", "start"]
