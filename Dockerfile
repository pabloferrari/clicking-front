FROM node:14

COPY ["./clicking-front/package.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install --only=production

RUN npm install --only=development

#COPY ["./app-react-dev/siteConfig/webpack.config.js", "./app-react-dev/siteConfig/.babelrc", "/usr/src/"]

#COPY ["./clicking-front/siteConfig/webpack.config.js", "/usr/src/"]

COPY ["./clicking-front", "/usr/src/"]

EXPOSE 80

CMD ["npm", "run", "serve"]