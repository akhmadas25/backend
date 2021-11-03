const { User, trip, transaction, country } = require("../../models");

exports.addTransaction = async (req, res) => {
  try {
    const { tripId, qty, ...data } = req.body;
    
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
    const newQuota = detailTrip.quota - qty;
    console.log(tripId);
    const updateQuota = await trip.update(
      {
        quota: newQuota,
      },
      {
        where: {
          id: tripId,
        },
      }
    );

    const totalPrice = detailTrip.price * qty;
    console.log(totalPrice);

    const newTransaction = await transaction.create({
      ...data,
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
    const data = await transaction.findAll({
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
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "tripId"],
      },
    });
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
    const { id } = req.params;
    const userId = req.user.id;
    const data = await transaction.findOne({
      where: {
        id,
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
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "tripId"],
      },
    });
    const detailTrip = await trip.findOne({
      where: {
        id: tripId,
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
