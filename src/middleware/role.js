const checkAdmin = async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.isAdmin === false) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized Acess" });
    }
    next();
  } catch (error) {
    console.log(error, error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = checkAdmin;
