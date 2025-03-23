# Use an official Node.js runtime as a parent image
FROM node:20.14.0

# Set the working directory
WORKDIR /backend

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm install

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the app
CMD ["npm", "start"]