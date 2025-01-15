import slugify from "slugify";

const slugMiddleware = (sourceField, targetField) => {
  return function (schema) {
    schema.pre("save", async function (next) {
      if (!this[targetField] && this[sourceField]) {
        let slug = slugify(`${this[sourceField]}-${this._id}`, {
          lower: true,
          strict: true,
          locale: "vi",
        });
        this[targetField] = slug;
      }
      next();
    });
  };
};

export default slugMiddleware;
