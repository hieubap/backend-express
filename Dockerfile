FROM node:14
WORKDIR /app
COPY package.json /app
# cài đặt thư viện trong container ==> trong container có node_modules/
RUN npm install --production
RUN npm install pm2 -g
RUN npm install db-migrate -g
COPY . /app
EXPOSE 3001
RUN git clone https://github.com/vishnubob/wait-for-it.git
#CMD ["npm","start"]
