export const validationMiddleware = (req, res, next) => {
    console.log(req);
    const route = req.route.path;

  const hasId = route.includes("id");
  if (hasId) {
    if (req.params.id.length !== 24) {
      res.status(400).json({
        message: "ID not valid",
      });
    }
  }
  next();
};
//Middleware does not care what comes before or after..
//here it only valids ID so next() could be whatever.