import User from "../models/user";

type createUserType = {
  email: string;
  encryptedPassword: string;
};

export default {
  create(createArgs: createUserType) {
    return User.create(createArgs);
  },

  update(id: string, updateArgs: { role: string }) {
    return User.update(
      { role: updateArgs.role },
      {
        where: { id },
        fields: ["role"],
      }
    );
  },

  delete(id: string) {
    return User.destroy({
      where: {
        id,
      },
    });
  },

  async find(id: string) {
    const user = await User.findByPk(id);
    return { email: user.email, role: user.role };
  },

  findAll() {
    return User.findAll();
  },

  getTotalUser() {
    return User.count();
  },

  findOne(email: string) {
    return User.findOne({
      where: { email: email },
    });
  },

  findAdmin(role: string) {
    return User.findOne({
      where: { role: role },
    });
  },
};
