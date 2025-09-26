import mongoose from "mongoose";

const autoSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  anio: {
    type: Number,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
  },
  kilometraje: {
    type: Number,
  },
  tipoCombustible: {
    type: String,
  },
  transmision: {
    type: String,
  },
  categoria: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const autoModel = mongoose.models.auto || mongoose.model("auto", autoSchema);

export default autoModel;
