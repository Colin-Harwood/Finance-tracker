# Use an official Node runtime as the base image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle the source code inside the Docker image
COPY . .

# Make port 8000 available to the outside world
EXPOSE 3000

# Run the application when the container launches
CMD ["npm", "start"]