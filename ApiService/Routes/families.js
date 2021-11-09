const express = require("express");
const Family = require("../Models/Family");
const jwt = require("express-jwt");
const config = require("../config");
const queryFilters = require("../Functions/Filters/queryFilters");

//Router Export
const router = express.Router();

// Get Families (Open Route)
router.get("", async (req, res, next) => {
  try {
    // Query Params
    const { filter, sort, range } = req.query;
    const data = await queryFilters.familyFiltersAndSort(filter, sort, range);
    const countFilter = Object.keys(data.families).length;
    const count = await Family.countDocuments();
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
    res.json(data.families.slice(req.range.first, req.range.last + 1));
    next();
  } catch (err) {
    return next(err.message);
  }
});

// Get Family by Id (Open Route)
router.get("/:id", async (req, res, next) => {
  try {
    const family = await Family.findOne({ _id: req.params.id });
    res.send(family);
    next();
  } catch (error) {
    return next(error.message);
  }
});

// Post Family (Closed Route)
router.post("", jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  const { name } = req.body;
  const family = new Family({
    name,
  });
  try {
    const newFamily = await family.save();
    res.send(newFamily);
    res.end();
  } catch (error) {
    return next(error.message);
  }
});

// Update Family (Closed Route)
router.patch("/:id", jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  try {
    const family = await Family.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(family);
    next();
  } catch (error) {
    return next(error.message);
  }
});

// Delete Family (Close Route)
router.delete("/:id", jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  try {
    const family = await Family.findByIdAndRemove(
      { _id: req.params.id },
      { runValidators: true }
    );
    res.send("Family Deleted: " + family);
    res.end();
    next();
  } catch (error) {
    return next(error.message);
  }
}
);

module.exports = router;
