import User from "./../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

/**
 * Bước 1: Kiểm tra email đã đăng ký chưa
 * Bước 2: Mã hoá mật khẩu: bcrypt, bcryptjs
 * Bước 3: Lưu thông tin đăng ký vào database.
 * Bước 4: Thông báo thành công
 * Lưu ý:
 * - Nếu đăng ký mà cho phép người dùng đăng nhập luôn thì cần tạo token và đưa vào cookie hoặc trả token cho người dùng.
 * - Nếu muốn xác thực email, thì gửi email (nodemailer) cho người dùng để kích hoạt.
 **/

dotenv.config({});

const { SECRET_KEY } = process.env;

export const register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existEmail = await User.findOne({ email });

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
      user,
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

  // Bước 1: Kiểm tra email đã đăng ký chưa?
  const userExist = await User.findOne({ email });
  if (!userExist) {
    res.status(404).json({
      message: "Tai khoan chua dang ky!",
    });
  }

  // Bước 2: Từ email đã find được user, compare password xem có khớp không
  const compareResult = bcryptjs.compareSync(password, userExist.password);

  if (!compareResult) {
    return res.status(400).json({
      message: "Mat khau khong dung!",
    });
  }

  // Bước 3: Sign JWT (cài đặt jwt)

  const accessToken = jwt.sign(
    {
      _id: userExist._id,
    },
    SECRET_KEY,
    { expiresIn: "10d" }
  );

  userExist.password = undefined;
  return res.status(200).json({
    message: "Dang nhap thanh cong",
    accessToken,
    user: userExist,
  });
};
