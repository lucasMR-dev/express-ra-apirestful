const Metric = require('../Models/Metric');

metricTracking = function ($name) {
    Metric.findOneAndUpdate({name: $name},{$inc: {count: 1}}, {new: true, runValidators: true})
    .then()
    .catch((err) => {throw new Error(err.message)});
}

module.exports = {metricTracking};