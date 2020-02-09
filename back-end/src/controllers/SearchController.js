const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArrays");

module.exports = {
  async index(req, res) {
    //busca todos des num raio de 10km
    //filtrar por tecnologias
    const { latitude, longitude, techs } = req.query;
    const techsArray = parseStringAsArray(techs);
    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 1000
        }
      }
    });
    console.log(techsArray);

    return res.json({ devs });
  }
};
