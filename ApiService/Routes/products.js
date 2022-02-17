const express = require("express");
const Product = require("../Models/Product");
const Brand = require("../Models/Brand");
const jwt = require("express-jwt");
const config = require("../config");
const multer = require("multer");
const appTrack = require("../Functions/appTracking");
const Metric = require("../Models/Metric");
const fs = require("fs");
const queryFilters = require("../Functions/Filters/queryFilters");

// Multer Middleware Config
const storageMiddleware = multer.diskStorage({
  destination: async function (req, file, callback) {
    var path = "./Public/products";
    var dirChk = fs.existsSync(path);
    if (!dirChk) {
      await fs.mkdirSync(path, { recursive: true });
    }
    callback(null, path);
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  },
});

// File Type Config
const fileExtensionFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

// Init Multer
const upload = multer({
  storage: storageMiddleware,
  limits: {
    fileSize: 1024 * 1024 * 7,
  },
  fileFilter: fileExtensionFilter,
});

//Router Export
const router = express.Router();

// Get Products (Open Route)
router.get("", async (req, res, next) => {
  try {
    // Query Params
    const { filter, sort, range } = req.query;
    if (filter && sort && range) {
      const data = await queryFilters.productsFiltersAndSort(filter, sort, range);
      const countFilter = Object.keys(data.products).length;
      const count = await Product.countDocuments();
      res.range({
        first: req.range.first,
        last: req.range.last,
        length: req.range.lenght,
      });
      if (data.status === "filtered") {
        res.header("X-Total-Count", countFilter);
      } else {
        res.header("X-Total-Count", count);
      }
      res.json(data.products.slice(req.range.first, req.range.last + 1));
      next();
    }
    else {
      const data = await Product.find({})
        .populate("brand", "name")
        .populate("categories", "name");
      res.status(200).send(data).end();
      next();
    }
  } catch (err) {
    return next(err.message);
  }
});

// Get Product by Id (Open Route)
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById({ _id: req.params.id })
    const code = "product";
    const name = product.name;
    const int = 0;
    const checkTracking = await Metric.findOne({ name: name }).countDocuments();
    if (checkTracking <= 0) {
      const count = int + 1;
      const metric = new Metric({
        code,
        name,
        count,
      });
      const newMetric = await metric.save();
    } else {
      appTrack.metricTracking(name);
    }
    res.send(product);
    res.end();
    next();
  } catch (error) {
    return next(error.message);
  }
});

// Post Product (Closed Route)
router.post("", upload.array("pictures", 2), jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  const {
    sku,
    name,
    price,
    salePrice,
    discount,
    shortDetails,
    description,
    stock,
    brand,
    newPro,
    sale,
    colorAvailable,
  } = req.body;
  const categories = req.body.categories;
  const tags = req.body.tags;
  const uploading = req.files;
  let pictures = { small: "", big: "" };
  // Check FormData images are provided if not update parameters passed only
  if (uploading) {
    const small = config.DEPLOY_URL + "/" + uploading[0].path;
    const big = config.DEPLOY_URL + "/" + uploading[1].path;
    pictures = { small: small, big: big };
  }
  const product = new Product({
    sku,
    name,
    price,
    salePrice,
    discount,
    shortDetails,
    description,
    stock,
    brand,
    newPro,
    sale,
    categories,
    tags,
    colorAvailable,
    pictures,
  });
  try {
    let brand_id = await Brand.findOne({ _id: brand })
      .then(async function (result) {
        if (result != null) {
          const newProduct = await product.save();
          res.send(newProduct);
          res.next();
        } else {
          res.status(404).send("Make sure to create the brands before the products.");
          res.next();
        }
      })
      .catch(function (err) {
        return err.message;
      });
  } catch (error) {
    return next(error.message);
  }
});

// Update Product (Closed Route)
router.patch("/:id", upload.array("pictures", 2), jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  const body = req.body;
  const categories = JSON.parse(body.categories);
  const tags = JSON.parse(body.tags);
  const uploading = req.files;
  // Check FormData images are provided if not update parameters passed only
  if (uploading) {
    const small = config.DEPLOY_URL + "/" + uploading[0].path;
    const big = config.DEPLOY_URL + "/" + uploading[1].path;
    const pictures = { small: small, big: big };
    const data = { body, categories, tags, pictures };
    try {
      const product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        data,
        { new: true, runValidators: true }
      );
      res.send(product);
      res.end();
      next();
    } catch (error) {
      return next(error.message);
    }
  } else {
    const data = { body, categories, tags };
    try {
      const product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        data,
        { new: true, runValidators: true }
      );
      res.send(product);
      res.end();
      next();
    } catch (error) {
      return next(error.message);
    }
  }
});

// Delete Product (Close Route)
router.delete("/:id", jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  try {
    const product = await Product.findOneAndRemove(
      { _id: req.params.id },
      { runValidators: true }
    );
    if (product) {
      res.status(204).send("Product Deleted: " + product);
      res.end();
      next();
    } else {
      res.status(404);
      res.end();
      next();
    }
  } catch (error) {
    return next(error.message);
  }
});

module.exports = router;
