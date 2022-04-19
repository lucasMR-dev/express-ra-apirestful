const express = require("express");
const Department = require("../Models/Deparment");
const config = require("../config");
const jwt = require("express-jwt");
const queryFilters = require("../Functions/Filters/queryFilters");

// Router Export
const router = express.Router();

// List Deparments
router.get("", jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  try {
    // Query Params
    const { filter, sort, range } = req.query;
    if (filter && !sort && !range) {
      let arr = JSON.parse(filter);
      const data = await Department.find({_id: { "$in": arr.id}});
      res.status(200).send(data).end();
      next();
    }
    else if (filter && sort && range) {
      const data = await queryFilters.departmentsFiltersAndSort(filter, sort, range);
      const countFilter = Object.keys(data.departments).length;
      const count = await Department.countDocuments();
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
      res.json(data.departments.slice(req.range.first, req.range.last + 1));
      next();
    } else {
      const data = await Department.find({})
        .populate('managers')
        .populate('employees');
      res.status(200).send(data).end();
      next();
    }
  } catch (err) {
    return next(err.message);
  }
});

// Get Department by Id (Open Route)
router.get("/:id",jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  try {
    const deparment = await Department.findOne({ _id: req.params.id });
    res.send(deparment).end();
    next();
  } catch (error) {
    return next(error.message);
  }
});

// POST Department
router.post("", jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  const { name, code, location, managers, employees } = req.body;
  const department = new Department({
    name, code, location, managers, employees
  });
  try {
    const newDepartment = await department.save().then(async (response) => {
      res.send(response).end();
      next();
    }).catch((response) => {
      res.status(403).json({ "Error": { "message": (`${response.name}[${response.code}]`) } }).end();
      next();
    });
  }
  catch (err) {
    return next(err.message);
  }
});

// Update Department (Closed Route)
router.patch("/:id", jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  try {
    let query = {name: req.body.name, code: req.body.code, location: req.body.location, managers: req.body.managers, employees: req.body.employees};
    const deparment = await Department.findOneAndUpdate(
      { _id: req.params.id },
      query,
      { new: true, runValidators: true }
    );
    res.send(deparment).end();
    next();
  } catch (error) {
    return next(error.message);
  }
});

// Delete Department (Closed Route)
router.delete("/:id", jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  try {
    const department = await Department.findOneAndDelete({ _id: req.params.id });
    res.send(department).end();
    next();
  } catch (err) {
    return next(err.message);
  }
});

module.exports = router;
