export const adminGuard = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "error",
      message: "Forbidden: Admin access required",
      data: null,
    });
  }
  next();
};

export const recruiterGuard = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({
      status: "error",
      message: "Forbidden: Recruiter access required",
      data: null,
    });
  }
  next();
};
