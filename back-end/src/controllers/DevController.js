const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArrays");
//index: Listar todos
//show: Listar um
//store: Cadastrar
//update: Alterar
//destroy: Excluir
module.exports = {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      const apiRes = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name = login, avatar_url, bio } = apiRes.data;
      const techsArray = parseStringAsArray(techs);
      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };
      dev = await Dev.create({
        github_username,
        name,
        bio,
        avatar_url,
        techs: techsArray,
        location
      });
    }
    return res.json(dev);
  },
  async update(req, res) {
    const { github_username } = req.query;
    const { techs, latitude, longitude } = req.body;
    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      return res.json({ msg: "Dev não encontrado!" });
    }
    const techsArray = parseStringAsArray(techs);
    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };
    await Dev.update({
      techs: techsArray,
      location
    });
    dev = await Dev.findOne({ github_username });
    return res.json({ dev });
  },
  async destroy(req, res) {
    const { github_username } = req.query;
    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      return res.json({ msg: "Dev não encontrado!" });
    }
    await Dev.remove(dev);
    return res.json({ msg: `${github_username} foi removido com sucesso!` });
  },
  async index(_, res) {
    const devs = await Dev.find();
    return res.json(devs);
  }
};
