const { ObjectId } = require("mongodb");
class UserService {
  constructor(client) {
    this.User = client.db().collection("users");
  }

  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractConactData(payload) {
    const user = {
      email: payload.email,
      password: payload.password,
    };
    // Remove undefined fields
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
