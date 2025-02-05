import User from "./../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/config.env.js";

export const register = async (req, res) => {
  /**
   * Bước 1: Kiểm tra email đã đăng ký chưa
   * Bước 2: Mã hoá mật khẩu: bcrypt, bcryptjs
   * Bước 3: Lưu thông tin đăng ký vào database.
   * Bước 4: Thông báo thành công
   *
   * Lưu ý:
   * - Nếu đăng ký mà cho phép người dùng đăng nhập luôn thì cần tạo token và đưa vào cookie hoặc trả token cho người dùng.
   * - Nếu muốn xác thực email, thì gửi email (nodemailer) cho người dùng để kích hoạt.
   *
   * 	 */

  const { email, password, role } = req.body;
  const existEmail = await User.findOne({ email });
  // Neu email đã tồn tại, không cho tạo tài khoản
  if (existEmail) {
    return res
      .status(400)
      .json({ message: "Email nay da duoc su dung, vui long dang nhap!" });
  }

  // Ma hoa mat khau
  // const hashPassword = await bcrypt.hash(password, 10);
  const hashPassword = bcryptjs.hashSync(password, 10);
  // console.log(hashPassword);

  // Luu thong tin register vao db
  const user = await User.create({
    ...req.body,
    password: hashPassword,
    role: role || "member",
  });

  // Thong bao thanh cong
  user.password = undefined;
  res.status(201).json({
    message: "Tao tai khoan thanh cong",
    user,
  });
};
export const login = async (req, res) => {
  /**
   * Bước 1: Kiểm tra email đã đăng ký chưa?
   * Bước 2: Từ email đã find được user, compare password.
   * Bước 3: Sign JWT (cài đặt jwt)
   * Bước 4: Sử dụng 1 trong các phương thức được học để duy trì trạng thái đăng nhập cho người dùng.
   * Bước 5: Sử dụng redis để lưu refresh token
   * Bước 5: Thông báo.
   */

  const { email, password } = req.body;

  // Bước 1: Kiểm tra email đã đăng ký chưa?
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(404).json({
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
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );

  console.log(accessToken);

  userExist.password = undefined;
  return res.status(200).json({
    message: "Dang nhap thanh cong",
    accessToken,
    user: userExist,
  });
};

export const refreshToken = async (req, res) => {
  /**
   * Bước 1: Khi Access Token hết hạn, sử dụng interceptor của axios (phía client) để gửi 1 request đến refreshToken
   * Bước 2: Lấy accesstoken ra (ExpiredIn Error), lấy refresh check xem còn hạn không?
   * Bước 3: sign new accessToken, refreshToken mới.
   * */
};
