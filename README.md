## Features ##
- ApiRest Service
- Cors Integration
- Upload Images
- JWT Tokens
- More...

## Installation ##

- cp copy.config.js ApiService/config.js

### First Steps ###

- Install Dependencies with `npm install`.

### Development Server ###

- Use command `npm run dev` this allow nodemon to restart automatically our server when a file change.

### Production Server Deploy ###

- `npm install -g pm2`
- cd path/to/folder/app
- `pm2 start server.js`
- `env PATH=$PATH:/usr/local/bin pm2 startup -u 'usuario root'`
