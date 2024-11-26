# Use an official Node.js image as the base
FROM node:22.11

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the app files
COPY . .

# Expose the app's port
EXPOSE 5001

# Run the app
CMD ["npm", "start"]
