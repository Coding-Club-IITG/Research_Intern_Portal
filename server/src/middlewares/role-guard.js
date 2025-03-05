export const adminGuard = (req, res, next) => {
  // console.log(req.user);
  if (req.user.typeOfUser !== "admin") {
    return res.status(403).json({
      status: "error",
      message: "Forbidden: Admin access required",
      data: null,
    });
  }
  next();
};

export const recruiterGuard = (req, res, next) => {
  if (req.user.typeOfUser !== "recruiter") {
    return res.status(403).json({
      status: "error",
      message: "Forbidden: Recruiter access required",
      data: null,
    });
  }
  next();
};
