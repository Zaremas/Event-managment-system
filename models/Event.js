const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    name:{
        type: String,
        required: true,
        trim: true,
      },
    description:{
        type: String,
        trim: true,
      },
    date:{
        type: Date,
      },
    spotsAvailable:{
        type: Number,
        required: true,
    },
    spotsOverall:{
        type: Number,
        required: true,
    },
    place:{
        type: String,
        required: true,
        trim: true,
      },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
