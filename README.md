# All in one Stack #

- React-Admin Frontend
- ExpressJS APIRest
- Mongo-Express for Database Web Handle
- Dockerized all in one for easy Startup Proyects!

## What is this Repo all about? ##
This is a simple MERN Stack application, Each service is isolated and comunicate each other throughth a specific Docker network.

You can change the Frontend and Backend to your desire, making more easy to setup your own app!


## How to setup ##

### Build the app images ###
```
    Before creating the Images, Please Checkout Instructions inside Each Service Folder!

    Commands:
    - cd path/to/the/folder/Frontend > make 
    - cd path/to/the/folder/Backend > make
```

### Setup Config files ###
```
    Remember to change the URL and PORT on thoose files before deployment:
    - path/to/the/folder/Backend/Api/config.js
    - path/to/the/folder/Frontend/src/Api/config.js
    
```

### Docker up! ###
```
    Start:
    - docker-compose up -d
    Close:
    - docker-compose down
```
### Links ###
1. [Admin Panel(Frontend)](http://localhost:3000)
2. [Apirest(Backend)](http://localhost:5000/v1)
3. [Backend(Mongo Express Page)](http://localhost:8081)    