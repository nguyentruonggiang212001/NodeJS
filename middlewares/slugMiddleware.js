import slugify from "slugify";

/**
 * Middleware để tự động tạo slug cho các model.
//  * @param {String} sourceField - Field ban đầu để tạo slug (ví dụ: 'name').
//  * @param {String} targetField - Field sẽ lưu slug (ví dụ: 'slug').
 */
const slugMiddleware = (sourceField, targetField) => {
  return function (schema) {
    schema.pre("save", async function (next) {
      // Kiểm tra xem đã có slug chưa, nếu chưa thì tạo mới
      if (!this[targetField] && this[sourceField]) {
        let slug = slugify(`${this[sourceField]}-${this._id}`, {
          lower: true, // Chuyển tất cả thành chữ thường
          strict: true, // Loại bỏ ký tự đặc biệt
          locale: "vi", // Hỗ trợ tiếng Việt
        });
        this[targetField] = slug;
      }
      next();
    });
  };
};

export default slugMiddleware;
