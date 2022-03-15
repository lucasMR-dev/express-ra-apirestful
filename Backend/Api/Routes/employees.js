const express = require("express");
const Employee = require("../Models/Employee");
const User = require("../Models/User");
const Deparment = require("../Models/Deparment");
const jwt = require("express-jwt");
const config = require("../config");
const queryFilters = require("../Functions/Filters/queryFilters");
const multer = require("multer");
const fs = require("fs");
const bcrypt = require("bcryptjs");

// Multer Middleware Config
const storageMiddleware = multer.diskStorage({
  destination: async function (req, file, callback) {
    var path = "./Public/profiles";
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

// Get Employees (Open Route)
router.get("", async (req, res, next) => {
  try {
    // Query Params
    const { filter, sort, range } = req.query;
    if (filter && !sort && !range) {
      let filtro = JSON.parse(filter);
      const data = await Employee.find({_id: { "$in": filtro.id}});
      res.status(200).send(data).end();
      next();
    }
    else if (filter && sort && range) {
      const data = await queryFilters.employeesFiltersAndSort(filter, sort, range);
      const countFilter = Object.keys(data.employees).length;
      const count = await Employee.countDocuments();
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
      res.json(data.employees.slice(req.range.first, req.range.last + 1));
      next();
    } else {
      const data = await Employee.find({});
      res.status(200).send(data).end();
      next();
    }
  } catch (err) {
    return next(err.message);
  }
});

// Get Employee by Id (Open Route)
router.get("/:id", async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ $or: [{_id: req.params.id},{ user: req.params.id}]}).populate("user", '-password');
    if (employee) {
      res.send(employee).end();
    }
    else {
      res.status(404).end();
    }
    next();
  } catch (error) {
    return next(error.message);
  }
});

// Post Employee (Closed Route)
router.post("", upload.single('picture'), jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  const uploading = req.file;
  let { job_name, hire_date, position, salary, department, firstname, lastname, birthday, phone, username, email, isActive } = req.body;
  let password = Math.random().toString(36).substring(2, 15);
  let user = new User({
    username,
    email,
    isActive,
    password
  });

  const pw = password;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, async (err, hash) => {
      //Hash
      user.password = hash;
      try {
        await user.save().then(async () => {
          if (uploading) {
            const picture = config.DEPLOY_URL + "/" + uploading.path;
            let profile = { firstname: firstname, lastname: lastname, birthday: birthday, phone: phone, path: picture };
            let employee = new Employee({
              job_name,
              hire_date,
              position,
              salary,
              department,
              profile,
              user: user._id
            });
            await employee.save(async function (err, success) {
              if (err) {
                res.status(400).send(err).end();
              }
              else {
                let managers = [];
                let employees = [];
                let data = {};
                let query;
                if (success.position == 'manager') {
                  managers.push(success._id.toString());
                  data.managers = managers;
                  query = { "$push": { "managers": managers } };
                }
                else {
                  employees.push(success._id.toString());
                  data.employees = employees;
                  query = { "$push": { "employees": employees } };
                }
                await Deparment.findByIdAndUpdate({ _id: success.department }, query, { new: true, runValidators: true });
                const after = {email: user.email, password: pw };
                res.status(201).send(after).end();
              }
              return next();
            });
          }
          else {
            let profile = { firstname: firstname, lastname: lastname, birthday: birthday, phone: phone };
            let employee = new Employee({
              job_name,
              hire_date,
              position,
              salary,
              department,
              profile,
              user: data._id
            });
            await employee.save(async function (err, success) {
              if (err) {
                res.status(400).send(err).end();
              }
              else {
                let managers = [];
                let employees = [];
                let data = {};
                let query;
                if (success.position == 'manager') {
                  managers.push(success._id.toString());
                  data.managers = managers;
                  query = { "$push": { "managers": managers } };
                }
                else {
                  employees.push(success._id.toString());
                  data.employees = employees;
                  query = { "$push": { "employees": employees } };
                }
                await Deparment.findByIdAndUpdate({ _id: success.department }, query, { new: true, runValidators: true });
                res.status(201).send(success).end();
              }
              return next();
            });
          }
        }).catch((err) => res.status(400).send(err).end());
      } catch (error) {
        console.log(error);
      }
    });
  });
});

// Update Employee (Closed Route)
router.patch("/:id", jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  const uploading = req.file;
  let { job_name, hire_date, position, salary, department, firstname, lastname, birthday, phone, username, email, isActive } = req.body;
  try {
    const employee = await Employee.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.send(employee).end();
    next();
  } catch (error) {
    return next(error.message);
  }
});

// Delete Employee (Close Route)
router.delete("/:id", jwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndRemove({ _id: req.params.id }, { runValidators: true });
    const user = await User.findOneAndRemove({ _id: employee.user });
    let query;
    if (employee.position == "manager") {
      query = { "$pull": { "managers": employee.id } };
    }
    else {
      query = { "$pull": { "employees": employee.id } };
    }
    const department = await Deparment.findOneAndUpdate({ _id: employee.department }, query);
    Promise.all([employee, user, department]).then(() => {
      res.status(204).send().end();
      return next();
    }).catch((response) => {
      res.status(404).send(response.error).end();
      return next();
    });
  } catch (error) {
    return next(error.message);
  }
});

module.exports = router;
