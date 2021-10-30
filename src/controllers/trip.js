const { Trip, Country } = require("../../models");

exports.getTrips = async (req, res) => {
  try {
    const data = await Trip.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

exports.getTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Trip.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Country,
          as: "country",
          attributes: {
            exclude: ["createdAt", "updateAt"],
          },
        },
      ],
    });
    res.send({
      status: "success",
      message: `get trip with id = ${id} success`,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

exports.addTrip = async (req, res) => {
  try {
    const { country: countryName, ...data } = req.body;
    const newTrip = await Trip.create({
      ...data,
      picture1: req.files.image[0].filename,
      picture2: req.files.image[1].filename,
      picture3: req.files.image[2].filename,
      picture4: req.files.image[3].filename,
    });
    const countryData = await Country.findOne({
      where: {
        name: countryName,
      },
    });

    if (countryData.name !== countryName) {
      await Country.create({
        name: countryName,
      });
    }

    newTrip = JSON.parse(JSON.stringify(newTrip));
    res.send({
      status: "success",
      message: "add trip was successfull!",
      data: {
        ...newTrip,
        picture1: "http:localhost:5000/uploads/" + newTrip.picture1,
        picture2: "http:localhost:5000/uploads/" + newTrip.picture2,
        picture3: "http:localhost:5000/uploads/" + newTrip.picture3,
        picture4: "http:localhost:5000/uploads/" + newTrip.picture4,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

exports.editTrip = async (req, res) => {
  try {
    const { id } = req.params.id;
    await Trip.update(req.body, {
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "update trip success!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.params.id;
    await Trip.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "delete trip was successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};
