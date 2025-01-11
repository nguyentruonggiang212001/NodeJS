import User from "./../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Bước 1: Kiểm tra email đã đăng ký chưa
 * Bước 2: Mã hoá mật khẩu: bcrypt, bcryptjs
 * Bước 3: Lưu thông tin đăng ký vào database.
 * Bước 4: Thông báo thành công
 * Lưu ý:
 * - Nếu đăng ký mà cho phép người dùng đăng nhập luôn thì cần tạo token và đưa vào cookie hoặc trả token cho người dùng.
 * - Nếu muốn xác thực email, thì gửi email (nodemailer) cho người dùng để kích hoạt.
 **/

export const register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existEmail = await User.findOne({ email: email });

    // Nếu email đã tồn tại, không cho tạo tài khoản
    if (existEmail) {
      return res
        .status(400)
        .json({ message: "Email này đã được sử dụng vui lòng đăng nhập" });
    }

    // Mã hóa mật khẩu
    const hashPassword = bcryptjs.hashSync(password, 10);

    // Lưu thông tin register vào database
    const user = await User.create({
      ...req.body,
      password: hashPassword,
      role: role || "member",
    });

    // Thông báo thành công
    res.status(201).json({
      message: "Tạo tài khoản thành công",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error); // Log lỗi
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra, vui lòng thử lại.", error });
  }
};

export const login = async (req, res) => {
  /**
   * Bước 1: Kiểm tra email đã đăng ký chưa?
   * Bước 2: Từ email đã find được user, compare password.
   * Bước 3: Sign JWT (cài đặt jwt)
   * Bước 4: Sử dụng 1 trong các phương thức được học để duy trì trạng thái đăng nhập cho người dùng.
   * Bước 5: Thông báo.
   */
  const { email, password } = req.body;

  try {
    // Bước 1: Kiểm tra email đã đăng ký chưa
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Email này chưa được đăng ký. Vui lòng đăng ký tài khoản.",
      });
    }

    console.log("Mật khẩu người dùng:", password);

    // Bước 2: So sánh mật khẩu
    const comparePassword = bcryptjs.compareSync(password, user.password);
    console.log(comparePassword);
    if (!comparePassword) {
      return res.status(400).json({ message: "Mật khẩu không chính xác." });
    }

    // Bước 3 và 4 : Tạo JWT token và duy trì trạng thái đăng nhập
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Thời gian hết hạn token là 1 ngày
    );

    // Bước 5: Thông báo thành công và trả về token
    res.status(200).json({
      message: "Đăng nhập thành công.",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error); // Log lỗi
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra, vui lòng thử lại.", error });
  }
};
