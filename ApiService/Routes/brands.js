const express = require("express");
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
    var path = "./Public/brands";
    var dirChk = fs.existsSync(path);
    if(!dirChk){
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

// Get Brands (Open Route)
router.get("", async (req, res, next) => {
  try {
    // Query Params
    const { filter, sort, range } = req.query;    
    const data = await queryFilters.brandsFiltersAndSort(filter, sort, range);
    const countFilter = Object.keys(data.brands).length;
    const count = await Brand.countDocuments();
    res.range({
      first: req.range.first,
      last: req.range.last,
      length: req.range.lenght,
    });
    if(data.status === "filtered"){
      res.header("X-Total-Count", countFilter);
    } else {
      res.header("X-Total-Count", count);
    }
    res.json(data.brands.slice(req.range.first, req.range.last + 1));
    next();
  } catch (err) {
    return next(err.message);
  }
});

// Get Brand by Id (Open Route)
router.get("/:id", async (req, res, next) => {
  try {
    const brand = await Brand.findById({ _id: req.params.id });
    const code = "brand";
    const name = brand.name;
    let count = 0;
    const checkTracking = await Metric.findOne({ name: name }).countDocuments();
    if (checkTracking <= 0) {
      count + 1;
      const metric = new Metric({
        code,
        name,
        count,
      });
      await metric.save();
    } else {
      await appTrack.metricTracking(name);
    }
    res.send(brand);
    res.end();
    next();
  } catch (error) {
    return next(error.message);
  }
});

// Post Brand (Closed Route)
router.post("", upload.single("logo"), jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
    const uploading = req.file;
    const { name, partnerStatus, active } = req.body;
    const categories = JSON.parse(req.body.categories);
    // Check FormData image is provided if not update parameters passed only
    if (uploading) {
      const logo = config.DEPLOY_URL + "/" + uploading.path;
      const brand = new Brand({
        name,
        logo,
        partnerStatus,
        active,
        categories,
      });
      try {
        const newBrand = await brand.save();
        res.send(newBrand);
        res.end();
        next();
      } catch (error) {
        return next(error.message);
      }
    } else {
      const brand = new Brand({
        name,
        partnerStatus,
        active,
        categories,
      });
      try {
        const newBrand = await brand.save();
        res.send(newBrand);
        res.end();
        next();
      } catch (err) {
        return next(err.message);
      }
    }
  }
);

// Update Brand (Closed Route)
router.patch("/:id", upload.single("logo"),jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
    const uploading = req.file;
    const { name, partnerStatus, active } = req.body;
    const categories = JSON.parse(req.body.categories);
    // Check FormData image is provided if not update parameters passed only
    if (uploading) {
      const logo = config.DEPLOY_URL + "/" + uploading.path;
      const data = { name, partnerStatus, active, categories, logo };
      try {
        const brand = await Brand.findOneAndUpdate(
          { _id: req.params.id },
          data,
          { new: true, runValidators: true }
        );
        res.send(brand);
        res.next();
      } catch (error) {
        return next(error.message);
      }
    } else {
      try {
        const data = { name, partnerStatus, active, categories };
        const brand = await Brand.findOneAndUpdate(
          { _id: req.params.id },
          data,
          { new: true, runValidators: true}
        );
        res.status(200);
        res.send(brand);
        res.next();
      } catch (error) {
        return next(error.message);
      }
    }
  }
);

// Delete Brand (Close Route)
router.delete(
  "/:id",
  jwt({ secret: config.JWT_SECRET }),
  async (req, res, next) => {
    try {
      const brand = await Brand.findByIdAndRemove(
        { _id: req.params.id },
        { runValidators: true }
      );
      res.send("Brand Deleted: " + brand);
      res.end();
      next();
    } catch (error) {
      return next(error.message);
    }
  }
);

module.exports = router;
