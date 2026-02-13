const Application = require("../models/Application");

class ApplicationService {
  async create({ companyName, role, status, userId }) {
    const application = await Application.create({
      companyName,
      role,
      status,
      userId,
    });
    return application;
  }

  async getAllByUser(userId) {
    const applications = await Application.find({ userId }).sort({
      createdAt: -1,
    });
    return applications;
  }

  async updateById(id, userId, updates) {
    const application = await Application.findOneAndUpdate(
      { _id: id, userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!application) {
      const error = new Error("Application not found");
      error.statusCode = 404;
      throw error;
    }

    return application;
  }

  async deleteById(id, userId) {
    const application = await Application.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!application) {
      const error = new Error("Application not found");
      error.statusCode = 404;
      throw error;
    }

    return application;
  }
}

module.exports = new ApplicationService();
