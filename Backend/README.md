## Features ##
- APIREST Service
- Cors Integration
- Upload Images
- JWT Tokens
- Unit Tests
- More...

## Installation ##

### First Steps ###

- cp copy.config.js Api/config.js

- Install Dependencies with `npm install`.

- Lets create a user send a `POST` request to http://localhost:3000/v1/auth/register use format `JSON` like this:
```
    {
        "username": "my_username",
        "email": "my_email",
        "password": "my_password",
        "isActive": true, # Either your login request will be rejected
        "access_type": 1 # So we get all privilages at once
    }
```
- Now we will be able to make a Login request to  http://localhost:3000/v1/auth/login and recibe our `Token` and navigate through the API endpoints

### Unit Tests ###
In Development mode you can run the Unit Tests:
- Run command `npm run test`

### Development Server ###

- Use command `npm run dev`

### Production Server Deploy ###

- `npm install -g pm2`
- cd path/to/folder/app
- `pm2 start server.js`
- `env PATH=$PATH:/usr/local/bin pm2 startup -u 'usuario root'`
