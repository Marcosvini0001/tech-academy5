FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
<<<<<<< HEAD
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
=======
>>>>>>> 082efb170aa04a841603030106c5a6bd2f859619
EXPOSE 3000
CMD ["npm", "run", "dev"]