export const adminGuard = (req, res, next) => {
  if (req.user.role !== "admin") {
<<<<<<< HEAD
    return res
      .status(403)
      .json({ message: "Forbidden: Admin access required" });
=======
    return res.status(403).json({
      status: "error",
      message: "Forbidden: Admin access required",
      data: null,
    });
>>>>>>> Dhruv
  }
  next();
};

export const recruiterGuard = (req, res, next) => {
  if (req.user.role !== "recruiter") {
<<<<<<< HEAD
    return res
      .status(403)
      .json({ message: "Forbidden: Recruiter access required" });
=======
    return res.status(403).json({
      status: "error",
      message: "Forbidden: Recruiter access required",
      data: null,
    });
>>>>>>> Dhruv
  }
  next();
};
