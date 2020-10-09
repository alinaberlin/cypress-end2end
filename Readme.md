### Demo end2end test with cypress




### 1. Fork this repo


Fork this repo
If you want to experiment with running this project in Continous Integration, you'll need to fork it first.

After forking this project in Github, run these commands:

## 2 clone this repo to a local directory
git clone https://github.com/alinaberlin/cypress-end2end.git

## 3 cd into the fronted inside repo
cd frontend

## 4 install the node_modules
npm install

## 5 start the local webserver
$ docker-compose up

The npm start script will spawn a webserver on port 80, run by Traefik which hosts the Picories app.

You can verify this by opening your browser and navigating to: http://picories.localhost/register

You should see the Picories App up and running. We are now ready to run Cypress tests.

## 7 launch the cypress test runner
npx cypress open


![](cypress.gif)


**shortcut:** you can use command `npm run local:open` that uses [start-server-and-test](https://github.com/bahmutov/start-server-and-test) to start local server and open Cypress. When you close Cypress, the local server is stopped automatically. Similarly you can use `npm run local:run` to start the server, run Cypress tests headlessly and close the server.

### 2. Install & write tests in Cypress

[Follow these instructions to install and write tests in Cypress.](https://on.cypress.io/installing-cypress)
