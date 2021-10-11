const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const range = require("express-range");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRouter = require("./Routes/users");
const profileRouter = require("./Routes/profiles");
const AuthRouter = require("./Routes/auth");
const productRouter = require("./Routes/products");
const categoriesRouter = require("./Routes/categories");
const brandsRouter = require("./Routes/brands");
const familiesRouter = require("./Routes/families");
const metricsRouter = require("./Routes/metrics");
const path = require("path");
const server = express();

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
server.use("/public", express.static("Public/profiles"));
server.use("/assets", express.static("Public/assets"));
server.use("/Public/products", express.static("Public/products"));
server.use("/Public/brands", express.static("Public/brands"));

// Routers
server.use("/users", usersRouter);
server.use("/auth", AuthRouter);
server.use("/profile", profileRouter);
server.use("/products", productRouter);
server.use("/categories", categoriesRouter);
server.use("/brands", brandsRouter);
server.use("/families", familiesRouter);
server.use("/metrics", metricsRouter);

// Index Page
server.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// Favicon
server.get('/favicon.ico', (req, res) => res.sendStatus(204).end());

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

// Not Found Error 404 Handle
/*server.use(function (res) {
  res.status(404).send("Request not found");
});
*/