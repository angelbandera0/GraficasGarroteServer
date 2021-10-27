const { Schema, model, Types } = require("mongoose");

const albumSchema = new Schema({
  alias: {
    type: String,
    required: [true, "El alias es obligatorio"],
    index: true,
  },
  
  formato: {
    type: String,
    required: [true, "El tipo de formato es obligatorios"],
    index: true,
  },
  plantilla: {
    type: String,
    required: [true],
    index: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    //required: true,
    ref: "User",
  },

  img: [{ type: String }],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },

  
  
});

//Export the model
module.exports = model("Album", albumSchema);
