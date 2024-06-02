const { Cars } = require("../models");


module.exports = {
  create(createArgs) {
    return Cars.create(createArgs);
  },

  update(name, updateArgs) {
    return Cars.update(updateArgs, {
      where: {
        name,
      },
    });
  },

  delete(name) {
    return Cars.destroy({
      where: {
        name,
      },
    });
  },

  find(id) {
    return Cars.findByPk(id);
  },

  findCarsTrue() {
    return Cars.findAll({
      where: {
        availability: true
      }
    });
  },
  
  findAll() {
    return Cars.findAll();
  },

  findOne(name) {
    return Cars.findOne({
      where : { name : name }
    });
  },

  getTotalCars() {
    return Cars.count();
  },
};
