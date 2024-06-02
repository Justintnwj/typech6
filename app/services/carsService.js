const carsRepository = require("../repositories/carsRepository");

module.exports = {
  async create (requestBody) {
    return carsRepository.create(requestBody);
  },

  async update(name, requestBody) {
    return carsRepository.update(name, requestBody);
  },

  async delete(name) {
    return carsRepository.delete(name);
  },

  async listTrue() {
    try {
      const cars = await carsRepository.findCarsTrue();
      const carsCount = await carsRepository.getTotalCars();

      return {
        data: cars,
        count: carsCount,
      };
    } catch (err) {
      throw err;
    }
  },

  async list() {
    try {
      const cars = await carsRepository.findAll();
      const carsCount = await carsRepository.getTotalCars();

      return {
        data: cars,
        count: carsCount,
      };
    } catch (err) {
      throw err;
    }
  },

  async findOne(name) {
    return carsRepository.findOne(name);
  },

  get(id) {
    return carsRepository.find(id);
  }
};
