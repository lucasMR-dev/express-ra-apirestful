module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 5000,
    URL: process.env.BASE_URL || 'http://localhost:5000/v1',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://<user>:<password>@mongo:27017/<db>',
    JWT_SECRET: process.env.JWT_SECRET || 'secret_token',
    // Deployment
    DEPLOY_URL: process.env.URL || 'http://localhost:5000/v1',
    // Jest
    JEST_USER: 'your_user',
    JEST_PASS: 'your_pass'
}