const express = require("express");
const Category = require("../Models/Category");
const jwt = require("express-jwt");
const config = require("../config");
const appTrack = require("../Functions/appTracking");
const Metric = require("../Models/Metric");
const queryFilters = require("../Functions/Filters/queryFilters");

//Router Export
const router = express.Router();

// Get Categories (Open Route)
router.get("", async (req, res, next) => {
  try {
    // Query Params
    const { filter, sort, range } = req.query;
    const data = await queryFilters.categoriesFiltersAndSort(filter, sort, range);    
    const countFilter = Object.keys(data.categories).length;
    const count = await Category.countDocuments();
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
    res.json(data.categories.slice(req.range.first, req.range.last + 1));
    next();
  } catch (err) {
    return next(err.message);
  }
});

// Get Category by Id (Open Route)
router.get("/:id", async (req, res, next) => {
  try {
    const category = await Category.findOne({ _id: req.params.id })
      .populate("brand", "name")
      .populate("family", "name");
    const code = "category";
    const name = category.name;
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
    res.send(category);
    next();
  } catch (error) {
    return next(error.message);
  }
});

// Post Category (Closed Route)
router.post("", jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  const { name, family } = req.body;
  const category = new Category({
    name,
    family,
  });
  try {
    const newCategory = await category.save();
    res.send(newCategory);
    res.end();
  } catch (error) {
    return next(error.message);
  }
});

// Update Category (Closed Route)
router.patch("/:id", jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  try {
      const category = await Category.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      res.send(category);
      res.end();
      next();
  } catch (error) {
      return next(error.message);
    }
});

// Delete Category (Close Route)
router.delete(
  "/:id",
  jwt({ secret: config.JWT_SECRET }),
  async (req, res, next) => {
    try {
      const category = await Category.findByIdAndRemove(
        { _id: req.params.id },
        { runValidators: true }
      );
      res.send("Category Deleted: " + category);
      res.end();
      next();
    } catch (error) {
      return next(error.message);
    }
  }
);

module.exports = router;
