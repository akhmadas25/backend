const { Country } = require("../../models");

exports.getCountries = async (req, res) => {
  const countries = await Country.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  try {
    res.send({
      status: "success",
      data: {
        countries,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Country.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log("error");
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.addCountry = async (req, res) => {
  try {
    await Country.create(req.body);
    res.send({
      status: "success",
      message: "Add country has successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.editCountry = async (req, res) => {
  try {
    const { id } = req.params;
    await Country.update(req.body, {
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: `update country with id = ${id} successfull`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    await Country.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: `delete country with id = ${id} successfull`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
