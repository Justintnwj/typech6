const { User } = require("../models");

module.exports = {
  create(createArgs) {
    return User.create(createArgs);
  },

  update(id, updateArgs) {
    return User.update(
        { role: updateArgs.role }, 
        {
            where: { id },
            fields: ['role'], 
        }
    );
  },

  delete(id) {
    return User.destroy({
      where: {
        id,
      },
    });
  },

  find(id) {
    return User.findByPk(id);
  },

  findAll() {
    return User.findAll();
  },

  getTotalUser() {
    return User.count();
  },
  
  findOne(email) {
    return User.findOne({
      where : { email : email }
    });
  },

  findAdmin(role) {
    return User.findOne({
      where : { role : role }
    });
  },

};
