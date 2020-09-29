FROM node:alpine

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD .babelrc .prettierrc .eslintrc.js stylelint.config.js ./

CMD [ "npm", "run", "dev" ]
