# Use an official Node.js runtime as the base image
FROM node:14

WORKDIR /app

COPY . .
RUN npm install



EXPOSE 3000

CMD ["npm", "start"]
