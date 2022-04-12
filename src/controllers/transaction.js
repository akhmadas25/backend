const { User, trip, transaction, country } = require("../../models");

exports.addTransaction = async (req, res) => {
  try {
    const { tripId, qty } = req.body;

    if (req.user.role == "admin") {
      res.send({
        message: "access denied",
      });
    }
    const detailTrip = await trip.findOne({
      where: {
        id: tripId,
      },
    });

    const newQuota = detailTrip.dataValues.available + qty;

    const updateQuota = await trip.update(
      {
        available: newQuota,
      },
      {
        where: {
          id: tripId,
        },
      }
    );

    const totalPrice = detailTrip.dataValues.price * qty;

    const newTransaction = await transaction.create({
      total: totalPrice,
      qty: qty,
      tripId: tripId,
      userId: req.user.id,
    });
    res.send({
      status: "success",
      message: "successfully booked!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    let data = await transaction.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "role", "password"],
          },
        },
        {
          model: trip,
          as: "trip",
          include: [
            {
              model: country,
              as: "country",
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      order: [["id", "DESC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "tripId"],
      },
    });
    data = JSON.parse(JSON.stringify(data));
    res.send({
      status: "succes",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const userId = req.user.id;

    let data = await transaction.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "role", "password"],
          },
        },
        {
          model: trip,
          as: "trip",
          include: [
            {
              model: country,
              as: "country",
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
          attributes: {
            exclude: ["image", "createdAt", "updatedAt", "desc", "quota"],
          },
        },
      ],
      order: [["id", "DESC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "tripId"],
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

exports.getTransactionId = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await transaction.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "role", "password"],
          },
        },
        {
          model: trip,
          as: "trip",
          include: [
            {
              model: country,
              as: "country",
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
          attributes: {
            exclude: ["image", "createdAt", "updatedAt", "desc", "quota"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "tripId"],
      },
    });

    const newData = [];
    newData.push(data);

    res.send({
      status: "success",
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await transaction.update(
      {
        status: status,
        attachment: req.files.attachment[0].filename,
      },
      {
        where: {
          id,
        },
      }
    );
    res.send({
      message: `payment was successfull ${status}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

exports.editStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const getTransaction = await transaction.findOne({
      where: {
        id,
      },
    });

    const tripId = getTransaction.dataValues.tripId;
    const qty = getTransaction.dataValues.qty;

    const getTrip = await trip.findOne({
      where: {
        id: tripId,
      },
    });

    const available = getTrip.dataValues.available;
    if (status === "canceled") {
      await trip.update(
        {
          available: available - qty,
        },
        {
          where: {
            id: tripId,
          },
        }
      );
      await transaction.update(
        {
          status: status,
        },
        {
          where: {
            id,
          },
        }
      );
    } else if (status === "aproved") {
      await transaction.update(
        {
          status: status,
        },
        {
          where: {
            id,
          },
        }
      );
    }

    res.send({
      message: `payment was successfull ${status}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};
