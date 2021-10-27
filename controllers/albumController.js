const { request, response, query } = require("express");
const bcryptjs = require("bcryptjs");
const {
  subidaImagenCloudinary,
  actualizarImagenCloudinary,
  eliminarImagenCloudinary,
} = require("./subidasController");
const { Album, User} = require("../models");

const albumPost = async (req, res = response) => {
    try {
      const { ...data } = req.body;
      let urlImage = "";
      if(req.body.img){
        urlImage = req.body.img;
      }
      if (req.files != null) {
        urlImage = await subidaImagenCloudinary(req.files);
      }
      const album = new Album(data);
      album.img = urlImage;
  
      //casa.user = req.usuario;
  
      // Guardar en BD
      const resAlbum = await album.save();
  
      //Buscar el User en la DB
      //const resUser = await User.findById(resCasa.user);
      //Asignar al usuario la casa
      //resUser.casas.push(casa);
      //guardar cambios en el user
      //await resUser.save();
  
      res.status(201).send({
        album: album,
        msg: "Álbum creado correctame",
      });
    } catch (e) {
      console.log(e)
      res.status(400).send({ msg: "Ha ocurrido un error al adicionar" });
    }
  };

module.exports = {
    albumPost,
};