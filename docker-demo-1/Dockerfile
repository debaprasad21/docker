# We want to use Node.js as a base image, so that we want to have Node.js available inside of our container
FROM node:20

# Certain directory in the container file system, every container has its own file system.
# We want to have a special directoryin there in which we wanna work.
WORKDIR /app

# copy the package.json file into our working directory.
COPY package.json .

# we Run the npm install command to install dependencies
RUN npm install

# we copy the rest of the code
COPY . .

# We expose the port 3000 to the outside world and as the application run on that port
EXPOSE 3000

# then we execute app.mjs with node command
CMD ["node", "app.mjs"]