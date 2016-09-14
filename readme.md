#StartupJS with Angular

Another boilerplate to start developing web applications without loose time doing server and client configuration. Go directly to the core and avoid the boring stuff.

###The server is:
* an ExpressJS app
* enabled REST webservices and websocket communication.
* Redux
* Mocha, chai and supertest for testing. (Supertest to test webservices).

###The client includes by default:
* Angular 2
* Redux (ng2-redux, DevToolsExtension, redux-logger)
* ng2-redux-router
* Bootstrap 3
* Gulp for building tasks.
* Webpack to bundle resources and serve the webapp.
* SASS to manage stylesheets.
* Mocha and chai for test.


##Setup

1) run `>git clone https://github.com/maxipaolucci/startupJSwithAngular2Redux.git`

2) Install node and npm in your pc (to check if you already have it installed do `>npm --version`  and  `>node --version`)


###Server Setup

3.1) Go to server directory and run `>npm install`

3.2) Start the server doing: `>npm run start`  (the server runs in port 3030)


###Client Setup

4.1) Install webpack-dev-server and gulp npm packages globally to have access to these
from the command line: `>npm install -g webpack-dev-server gulp`

4.1) Go to client directory and run `>npm install`

4.3) Start the development environment doing: `>gulp start` or `>gulp`
    This starts the webpack-dev-server
    The webpack-dev-servers has watchers for js and SASS files (inside src/app) with auto-refresh on browser.

4.4) Navigate to `http://localhost:8000`

####More GULP commands
1) Start the development environment: `>gulp` or `>gulp start`

2) Run the tests scripts doing: `>gulp test`

3) Create a build under /dist directory doing: `>gulp build`