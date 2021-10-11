const express = require("express");
const { count } = require("../Models/Metric");
const Metric = require("../Models/Metric");

// Router Export
const router = express.Router();

// List Metrics
router.get("", async (req, res, next) => {
  try {
    var today = new Date();
    var week = new Date();
    // Set Last 7 days
    week.setDate(week.getDate() - 13);
    // Top 3 Brands
    const topBrands = await Metric.find({
      code: "brand",
      updated_at: {
        $gte: week,
        $lt: today,
      },
    })
      .sort({ count: -1 })
      .limit(3)
      .select({ count: 1, name: 1, id: 1 });
    // Top 5 Categories
    const topCategories = await Metric.find({
      code: "category",
      updated_at: {
        $gte: week,
        $lt: today,
      },
    })
      .sort({ count: -1 })
      .limit(5)
      .select({ count: 1, name: 1, id: 1 });
    // Top 10 Products
    const topProduct = await Metric.find({
      code: "product",
      updated_at: {
        $gte: week,
        $lt: today,
      },
    })
      .sort({ count: -1 })
      .limit(10)
      .select({ count: 1, name: 1, id: 1 });

    res.json({ topBrands, topCategories, topProduct });
    next();
  } catch (err) {
    return next(err.message);
  }
});

module.exports = router;
