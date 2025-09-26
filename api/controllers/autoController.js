import { v2 as cloudinary } from "cloudinary";
import autoModel from "../models/autoModel.js";

// Function for add auto
const addAuto = async (req, res) => {
  try {
    const {
      marca,
      modelo,
      anio,
      precio,
      kilometraje,
      tipoCombustible,
      transmision,
      categoria,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const autoData = {
      marca,
      modelo,
      anio,
      precio,
      kilometraje,
      tipoCombustible,
      transmision,
      categoria,
      images: imagesUrl,
      fecha: Date.now(),
    };

    console.log(autoData);

    const auto = new autoModel(autoData);
    await auto.save();

    res.json({ success: true, message: "Auto agregado con éxito" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Function for list autos
const listAutos = async (req, res) => {
  try {
    const autos = await autoModel.find({});
    res.json({ success: true, autos });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Function for removing autos
const removeAuto = async (req, res) => {
  try {
    const { id } = req.params;
    await autoModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Auto eliminado" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Function for single product info
const singleAuto = async (req, res) => {
  try {
    const { autoId } = req.params;
    const auto = await autoModel.findById(autoId);

    if (!auto) {
      return res.json({ success: false, message: "Auto no encontrado" });
    }

    res.json({ success: true, auto });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for updating auto
const updateAuto = async (req, res) => {
  try {
    const { id } = req.params;

    // Solo los campos que mandes en req.body serán actualizados
    const updates = req.body;

    // Si también quieres manejar actualización de imágenes
    if (req.files && Object.keys(req.files).length > 0) {
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];

      const images = [image1, image2, image3, image4].filter(
        (item) => item !== undefined
      );

      let imagesUrl = await Promise.all(
        images.map(async (image) => {
          let result = await cloudinary.uploader.upload(image.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );

      updates.images = imagesUrl; // sobrescribe imágenes
    }

    const updatedAuto = await autoModel.findByIdAndUpdate(id, updates, {
      new: true, // devuelve el documento ya actualizado
      runValidators: true, // aplica validaciones del schema
    });

    if (!updatedAuto) {
      return res.json({ success: false, message: "Auto no encontrado" });
    }

    res.json({ success: true, message: "Auto actualizado", auto: updatedAuto });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addAuto, listAutos, removeAuto, singleAuto, updateAuto };
