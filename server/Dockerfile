# Use an official Node.js runtime as a parent image
FROM node:20.0-buster
# Set the working directory to /app
WORKDIR /app
COPY ./package.json /app/package.json

# Install necessary dependencies, including docker-compose
RUN apt-get update && apt-get install -y \
    docker.io \
    docker-compose \
    && rm -rf /var/lib/apt/lists/* \
    && npm install


COPY ./tsconfig.json /app/tsconfig.json
# Copy the current directory contents into the container at /app
COPY ./src /app/src
COPY ./docker /app/docker

# Expose port 3001 to the outside world
EXPOSE 3001

# Define environment variable
ENV NODE_ENV=production

# Run app.js when the container launches
CMD ["yarn", "start"]
