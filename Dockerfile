FROM node
WORKDIR /app
COPY . /app
RUN yarn
RUN yarn build
EXPOSE 5000
CMD yarn start