import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {

    content: {
      type: String,
    },
    imageUrl: {
      type: [String], 
      default: [],
    },
    reportUrl: {
      type: [String], 
      default: [],
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    verifiedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      default: null, 
    }],
    verified: {
      type: Boolean,
      default: false, 
    },
    medicalHistory: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

const Post = mongoose.model("Post", postSchema);

const requestValidateShema = new mongoose.Schema(
  {
    doctorId: { String },
    ngoRequest: {
      ngoName: { type: String },
      requresList: [{
        reqId: { type: String },
        status: { type: String, default: "pending" }, // pending, approved, rejected
      }],
    },
  },
);


export const RequestValidate = mongoose.model("RequestValidate", requestValidateShema);



export default Post;
