export const validBodyRequest = (schemaValid) => (req, res, next) => {
  //logic valid xong
  try {
    schemaValid.parse(req.body);
    next();
  } catch (err) {
    const errors = err.errors.map((item) => `${item.path}:${item.message}`);
    res.status(400).send({ errors });
  }
};
