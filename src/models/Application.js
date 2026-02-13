const mongoose = require("mongoose");

const APPLICATION_STATUSES = ["Applied", "OA", "Interview", "Offer", "Rejected"];

const applicationSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
      maxlength: [100, "Role cannot exceed 100 characters"],
    },
    ctc: {
      type: String,
      trim: true,
      maxlength: [50, "Package/CTC cannot exceed 50 characters"],
      default: "",
    },
    status: {
      type: String,
      enum: {
        values: APPLICATION_STATUSES,
        message: "Status must be one of: " + APPLICATION_STATUSES.join(", "),
      },
      default: "Applied",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Application", applicationSchema);
module.exports.APPLICATION_STATUSES = APPLICATION_STATUSES;
