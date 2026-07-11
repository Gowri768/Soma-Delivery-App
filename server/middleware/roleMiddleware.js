const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {

    console.log("User Role:", req.user.role);
    console.log("Allowed Roles:", allowedRoles);

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    next();
  };
};

export default roleMiddleware;