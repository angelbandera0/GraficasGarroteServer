const { Schema, model, Types } = require("mongoose");

const ThirdPartyProviderSchema = new Schema({
  provider_name: {
    type: String,
    default: null,
  },
  provider_id: {
    type: String,
    default: null,
  },
  provider_data: {
    type: {},
    default: null,
  },
});

// Create Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    rol: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Role",
      default: Types.ObjectId("4edd40c86762e0fb12000001"),
    },
    albunes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    libros: [{ type: Schema.Types.ObjectId, ref: "Solicitud" }],

    //campo para decir si el user ya verificó su user
    isVerified: {
      type: Boolean,
      default: false,
    },
    //campo para decir si el user se unió usando google o no
    google: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    referral_code: {
      type: String,
      default: function () {
        let hash = 0;
        for (let i = 0; i < this.email.length; i++) {
          hash = this.email.charCodeAt(i) + ((hash << 5) - hash);
        }
        let res = (hash & 0x00ffffff).toString(16).toUpperCase();
        return "00000".substring(0, 6 - res.length) + res;
      },
    },
    referred_by: {
      type: String,
      default: null,
    },
    third_party_auth: [ThirdPartyProviderSchema],
    
  },
  { strict: false }
);
userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  //se modifica para q salga en los datos en vez de _id salga uid
  user.uid = _id;
  return user;
};
//Export the model
module.exports = model("User", userSchema);

