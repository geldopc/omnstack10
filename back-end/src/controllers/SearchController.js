const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArrays");

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;
    const techsArray = parseStringAsArray(techs);
    const devs = await Dev.find({
      //filtrar por tecnologias
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          //busca todos des num raio de 10km
          $maxDistance: 1000
        }
      }
    });
    return res.json({ devs });
  }
};
