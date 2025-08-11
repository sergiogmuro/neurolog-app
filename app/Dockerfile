FROM node:18

WORKDIR /app

COPY . .

#RUN rm -rf package-lock.json && \
#    npm install
#RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
