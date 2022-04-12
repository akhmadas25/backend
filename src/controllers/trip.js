const { trip, country } = require("../../models");
const _ = require("lodash");
exports.getTrips = async (req, res) => {
  try {
    const data = await trip.findAll({
      include: [
        {
          model: country,
          as: "country",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idCountry"],
      },
    });

    res.send({
      status: "success",
      data: data.map((item) => {
        const itemValue = JSON.parse(item.dataValues.image);

        const newData = [];
        for (let i = 0; i < itemValue.length; i++) {
          newData.push(`${process.env.PATH_TRIPS}${itemValue[i]}`);
        }

        dataImage = newData;
        const countryName = item.dataValues.country.name;

        // change default image in data to new link image
        item.dataValues.image = dataImage;
        item.dataValues.country = countryName;
        return item;
      }),
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
    const data = await trip.findOne({
      where: {
        id,
      },
      include: [
        {
          model: country,
          as: "country",
          attributes: {
            exclude: ["createdAt", "updatedAt", "id"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idCountry"],
      },
    });

    const newData = [];
    newData.push(data);

    res.send({
      status: "success",
      message: `get trip with id = ${id} success`,
      data: newData.map((item) => {
        const itemValue = JSON.parse(data.image);
        const newImage = [];
        for (let i = 0; i < itemValue.length; i++) {
          newImage.push(`${process.env.PATH_TRIPS}${itemValue[i]}`);
        }

        const countryName = item.dataValues.country.dataValues.name;
        item.image = newImage;
        item.dataValues.country = countryName;
        return item;
      }),
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
    const { ...data } = req.body;
    const { image } = req.files;
    const images = [];
    for (let item of image) {
      images.push(item.filename);
    }
   
    const getTrip = await trip.findAll();
    const exist = getTrip.find((item) => req.body.title === item.title);
    if (exist) {
      res.send({
        status: "failed",
        message: "trip already exist",
      });
    } else {
      const imagesToString = JSON.stringify(images);
      const newTrip = await trip.create({
        ...data,
        image: imagesToString,
      });
      res.send({
        status: "success",
        message: "add trip was successfull!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

exports.editTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      idCountry,
      eat,
      day,
      night,
      accomodation,
      transportation,
      date,
      price,
      desc,
      quota,
    } = req.body;

    const { image } = req.files;
    const images = [];
    for (let item of image) {
      images.push(item.filename);
    }
    const imagesToString = JSON.stringify(images);

    await trip.update(
      {
        title: title,
        idCountry: idCountry,
        eat: eat,
        day: day,
        night: night,
        accomodation: accomodation,
        transportation: transportation,
        date: date,
        price: price,
        desc: desc,
        quota: quota,
        image: imagesToString,
      },
      {
        where: {
          id,
        },
      }
    );
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
    const { id } = req.params;
    await trip.destroy({
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
