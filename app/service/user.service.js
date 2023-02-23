const { ObjectId } = require("mongodb");
class UserService {
  constructor(client) {
    this.User = client.db().collection("users");
  }

  extractConactData(payload) {
    const user = {
      email: payload.email,
      password: payload.password,
    };
    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );
    return user;
  }
  async createUser(payload) {
    const user = this.extractConactData(payload);
    const result = await this.User.findOneAndUpdate(
      user
    );
    return result.value;
  }
}
module.exports = UserService;
