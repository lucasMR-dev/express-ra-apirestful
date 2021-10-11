const express = require("express");
const User = require("../Models/User");
const config = require("../config");
const jwt = require("express-jwt");
const bcrypt = require("bcryptjs");
const queryFilters = require("../Functions/Filters/queryFilters");

// Router Export
const router = express.Router();

/**
 * USER ROUTES
 */

// List Users
router.get("", async (req, res, next) => {
  try {
    // Query Params
    const { filter, sort, range } = req.query;
    const data = await queryFilters.usersFiltersAndSort(filter, sort, range);
    const countFilter = Object.keys(data.users).length;
    const count = await User.countDocuments();
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
    res.json(data.users.slice(req.range.first, req.range.last + 1));
    next();
  } catch (err) {
    return next(err.message);
  }
});

// GET USER
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ _id: id });
    const data = {
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      access_type: user.access_type,
      id: user._id,
    };
    res.send(data);
    res.end();
    next();
  } catch (err) {
    return next(err.message);
  }
});

// POST USER
router.post("", async (req, res, next) => {
  const { username, email, password, access_type, isActive } = req.body;
  const user = new User({
    username,
    email,
    password,
    access_type,
    isActive,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, async (err, hash) => {
      //Hast password
      user.password = hash;
      //Save user
      try {
        const newUser = await user.save();
        res.send(newUser);
        res.end();
        next();
      } catch (err) {
        return next(err.message);
      }
    });
  });
});

// Update User (Closed Route)
router.patch(
  "/:id",
  jwt({ secret: config.JWT_SECRET }),
  async (req, res, next) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      const data = {
        username: user.username,
        email: user.email,
        isActive: user.isActive,
        access_type: user.access_type,
        id: user._id,
      };
      res.send(data);
      res.end();
      next();
    } catch (error) {
      return next(error.message);
    }
  }
);

// Delete User (Closed Route)
router.delete(
  "/:id",
  jwt({ secret: config.JWT_SECRET }),
  async (req, res, next) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });
      res.send(user);
      res.end();
      next();
    } catch (err) {
      return next(err.message);
    }
  }
);

module.exports = router;
