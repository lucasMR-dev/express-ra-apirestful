const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const range = require("express-range");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRouter = require("./Routes/users");
const AuthRouter = require("./Routes/auth");
const productRouter = require("./Routes/products");
const categoriesRouter = require("./Routes/categories");
const brandsRouter = require("./Routes/brands");
const familiesRouter = require("./Routes/families");
const metricsRouter = require("./Routes/metrics");
const employeesRouter = require("./Routes/employees");
const departmentsRouter = require("./Routes/departments");
const path = require("path");
const server = express();

// Current API Version
const version = "/v1";

// Cors Config
server.use(cors({
  allowedHeaders: ['X-Total-Count', 'Content-Type', 'Content-Range', 'Authorization'],
  exposedHeaders: ['X-Total-Count']
}));

// Range Config
server.use(range());

// BodyParser Config
server.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
server.use(bodyParser.json());

// Static Files
server.use(version + "/assets", express.static("Public/assets"));
server.use(version + "/Public/profiles", express.static("Public/profiles"));
server.use(version + "/Public/products", express.static("Public/products"));
server.use(version + "/Public/brands", express.static("Public/brands"));

// Routers
server.use(version + "/users", usersRouter);
server.use(version + "/auth", AuthRouter);
server.use(version + "/products", productRouter);
server.use(version + "/categories", categoriesRouter);
server.use(version + "/brands", brandsRouter);
server.use(version + "/families", familiesRouter);
server.use(version + "/metrics", metricsRouter);
server.use(version + "/employees", employeesRouter);
server.use(version + "/departments", departmentsRouter);

// Index Page
server.get(version + "/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// Favicon
server.get(version + '/favicon.ico', (req, res) => res.sendStatus(204).end());

// No Token Eror 401 Handle
server.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Unauthorized");
  }
});

// MongoDB Connection
server.listen(config.PORT, () => {
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
});

const db = mongoose.connection;

db.on("error", (err) => console.log(err));

db.once("open", () => console.log(`Server started on port: ${config.PORT}`));

module.exports = { server };