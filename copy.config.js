module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/apirest',
    JWT_SECRET: process.env.JWT_SECRET || 'secret_token',
    // Deployment
    DEPLOY_URL: process.env.URL || 'http://localhost:3000',
    // Jest
    JEST_USER: 'your_user',
    JEST_PASS: 'your_pass'
}