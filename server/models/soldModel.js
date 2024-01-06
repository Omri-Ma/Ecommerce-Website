const mongoose = require("mongoose");
const soldSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    soldAmount: {
      type: Number,
      default: 1,
      required: true,
    },
    earned: {
      type: Number,
      required: true,
    },
    soldToName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    specialRequest: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("sold", soldSchema);
