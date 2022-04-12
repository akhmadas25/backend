const { User } = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: users,
    });
    console.log(users);
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete user id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const id = req.user.id;
    await User.update(
      {
        profile: req.files.profile[0].filename,
      },
      {
        where: {
          id,
        },
      }
    );
    res.send({
      message: "profile successfully updated!",
    });
  } catch (error) {
    console.log(error);
  }
};
