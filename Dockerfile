FROM node:18-alpine
WORKDIR /app
COPY . .
RUN apt install nodejs
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
