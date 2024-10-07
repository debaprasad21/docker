FROM node:20

# Sets the working directory to execute the commands below this
WORKDIR /app

# this instructions way is optimized as the dependecies mentioned in package.json doesnt change frequently than code, 
# so the below step can be executed from cache
COPY package.json /app

RUN npm install
# the above commands to set the image

# COPY . .
# the first . signifies the path of host file system
# the second . signifies inside the image/ container file system or the root folder system
# /app will be created inside image
COPY . /app
# ./ points to /app also

EXPOSE 80

# To run the image in the container
CMD ["node", "server.js"]