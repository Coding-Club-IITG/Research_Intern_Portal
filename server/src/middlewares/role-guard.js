export const adminGuard = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden: Admin access required" });
  }
  next();
};

export const recruiterGuard = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res
      .status(403)
      .json({ message: "Forbidden: Recruiter access required" });
  }
  next();
};
