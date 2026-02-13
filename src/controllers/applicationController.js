const applicationService = require("../services/applicationService");

const create = async (req, res, next) => {
  try {
    const { companyName, role, status, ctc } = req.body;

    if (!companyName || !role) {
      return res.status(400).json({ message: "Company name and role are required" });
    }

    const application = await applicationService.create({
      companyName,
      role,
      status,
      ctc,
      userId: req.user.id,
    });

    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const applications = await applicationService.getAllByUser(req.user.id);
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = {};

    if (req.body.companyName) updates.companyName = req.body.companyName;
    if (req.body.role) updates.role = req.body.role;
    if (req.body.status) updates.status = req.body.status;
    if (req.body.ctc !== undefined) updates.ctc = req.body.ctc;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const application = await applicationService.updateById(id, req.user.id, updates);
    res.json(application);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await applicationService.deleteById(id, req.user.id);
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll, update, remove };
