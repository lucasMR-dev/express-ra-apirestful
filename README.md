## Features ##
- APIRest Service
- Cors Integration
- Upload Images
- JWT Tokens
- More...

## Installation ##

### First Steps ###

- cp copy.config.js ApiService/config.js

- Install Dependencies with `npm install`.

- Lets create a user send a `POST` request to http://localhost:3000/v1/auth/register use format `JSON` like this:
```
    {
        "username": "my_username",
        "email": "my_email",
        "password": "my_password",
        "isActive": true, # Either your login request will be rejected
        "access_type": "admin" # So we get all privilages at once let set it to admin
    }
```
- Now we will be able to Login into the Admin Panel and update our Profile information

### Unit Tests ###
- Run `npm run test` on Development mode if you pass all test you're good to go

### Development Server ###

- Use command `npm run dev` this allow nodemon to restart automatically our server when a file change.

### Production Server Deploy ###

- `npm install -g pm2`
- cd path/to/folder/app
- `pm2 start server.js`
- `env PATH=$PATH:/usr/local/bin pm2 startup -u 'usuario root'`
