const express = require("express");
const Client = require("../Models/Client");
const jwt = require("express-jwt");
const config = require("../config");
const queryFilters = require("../Functions/Filters/queryFilters");

//Router Export
const router = express.Router();

// Get Clients (Open Route)
router.get("", async (req, res, next) => {
  try {
    // Query Params
    const { filter, sort, range } = req.query;
    if (filter && sort && range) {
      const data = await queryFilters.categoriesFiltersAndSort(filter, sort, range);
      const countFilter = Object.keys(data.categories).length;
      const count = await Category.countDocuments();
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
      res.json(data.categories.slice(req.range.first, req.range.last + 1));
      next();
    } else {
      const data = await Client.find({});
      res.status(200).send(data).end();
      next();
    }
  } catch (err) {
    return next(err.message);
  }
});

// Get Client by Id (Open Route)
router.get("/:id", async (req, res, next) => {
  try {
    const client = await Client.findOne({ _id: req.params.id });
    res.send(client).end();
    next();
  } catch (error) {
    return next(error.message);
  }
});

// Post Client (Closed Route)
router.post("", jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  const { firstname, lastname, birthday, email, phone } = req.body;
  const client = new Client({
    firstname,
    lastname,
    birthday,
    email,
    phone
  });
  try {
    const newClient = await client.save(function (err, success) {
      err ? res.status(400).send(`${err.name}[${err.code}]`).end() : res.status(201).send(success).end();
      return next();
    });
  } catch (error) {
    return next(error.message);
  }
});

// Update Client (Closed Route)
router.patch("/:id", jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  try {
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.send(category).end();
    next();
  } catch (error) {
    return next(error.message);
  }
});

// Delete Client (Close Route)
router.delete("/:id", jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  try {
    const client = await Client.findByIdAndRemove(
      { _id: req.params.id },
      { runValidators: true }
    );
    if (client) {
      res.status(204).send("Client Deleted: " + client).end();
      next();
    }
    else {
      res.status(404).end();
      next();
    }
  } catch (error) {
    return next(error.message);
  }
});

module.exports = router;
