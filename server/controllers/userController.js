const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// GET USER INFO
exports.getUserController = async (req, res) => {
  try {
    // Temukan pengguna
    const user = await userModel.findById(req.body.id);
    // Validasi
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // Sembunyikan password
    user.password = undefined;
    // Respons
    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
      error,
    });
  }
};

// UPDATE USER
exports.updateUserController = async (req, res) => {
  try {
    // Temukan pengguna
    const user = await userModel.findById(req.body.id);
    // Validasi
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // Perbarui
    const { userName } = req.body;
    if (userName) user.userName = userName;
    // Simpan pengguna
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update User API",
      error,
    });
  }
};

// UPDATE USER PASSWORD
exports.updatePasswordController = async (req, res) => {
  try {
    // Temukan pengguna
    const user = await userModel.findById(req.body.id);
    // Validasi
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // Dapatkan data dari pengguna
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New Password",
      });
    }
    // Periksa password pengguna | Bandingkan password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }
    // Hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};

// reset pass
exports.resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }
    // Hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in PASSWORD RESET API",
      error,
    });
  }
};

// delete profile acc
exports.deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete Profile API",
      error,
    });
  }
};
