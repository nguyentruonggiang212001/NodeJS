export const validBodyRequest = (schemaValid) => (req, res, next) => {
  //logic valid xong
  try {
    const data = schemaValid.parse(req.body);
    console.log(`data valid:${data}`);
    //neu body ngon roi => next
    next();
  } catch (err) {
    const errors = err.errors.map((item) => `${item.path}:${item.message}`);
    res.status(400).send({ errors });
  }
  next();
};
