const router = require("express").Router();
const ConfigModel = require("../model/config");

router.get("/", async (_, response) => {
  const config = await ConfigModel.find({});
  response.status(200).json(config[0]);
});

router.post("/:id?", async (request, response) => {
  try {
    const data = request.body;
    const id = request.params.id;
    if (id) {
      await ConfigModel.findOneAndUpdate({ _id: id }, data, {
        upsert: true,
      }).exec();
    } else {
      const config = new ConfigModel(data);
      await config.save();
    }
    response.status(200).json({ message: "Configuration saved!!" });
  } catch (err) {
    console.log(err);
    response.status(200).json({ error: err });
  }
});

module.exports = router;
