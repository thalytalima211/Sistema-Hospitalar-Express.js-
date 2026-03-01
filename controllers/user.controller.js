import UserService from "../services/user.service.js";

export class UserController {
  constructor() {
    this.userService = new UserService()
  }

  async create(req, res, next) {
    try {
      console.log(this.userService)
      const user = await this.userService.createUser(req.body);

      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      next(error);
    }
  }
}