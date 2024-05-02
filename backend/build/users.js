"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify_email = exports.users = exports.user_by_email = exports.user = exports.update_user = exports.to_title = exports.signup = exports.send_mail = exports.login = void 0;
var _conn = require("../ds/conn");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _functions = require("generalised-datastore/utils/functions");
var _emails = require("./emails");
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let email_verification_codes = new Object();
const to_title = string => {
  if (!string) return string;
  let str = "";
  string.split(" ").map(s => {
    if (s) str += " " + s[0].toUpperCase() + s.slice(1);
  });
  return str.trim();
};
exports.to_title = to_title;
const send_mail = _ref => {
  let {
    recipient,
    recipient_name,
    sender_name,
    subject,
    text,
    html,
    to
  } = _ref;
  let transporter;
  text = text || "";
  html = html || "";
  let sender = "signup@giitafrica.com";
  sender_name = sender_name || "GIIT ICT Foundation";
  try {
    transporter = _nodemailer.default.createTransport({
      host: "premium217.web-hosting.com",
      port: 465,
      secure: true,
      auth: {
        user: sender,
        pass: "signupgiitafrica"
      }
    });
    console.log("in here with", recipient);
  } catch (e) {}
  try {
    transporter.sendMail({
      from: "".concat(sender_name, " <").concat(sender, ">"),
      to: to || "".concat(recipient_name, " <").concat(recipient, ">"),
      subject,
      text,
      html
    }).then(() => {}).catch(e => console.log(e));
    console.log("Email sent", recipient);
  } catch (e) {}
};
exports.send_mail = send_mail;
const users = (req, res) => {
  let {
    query,
    limit,
    skip
  } = req.body;
  res.json({
    ok: true,
    message: "users",
    data: _conn.USERS.read(query, {
      limit,
      skip
    })
  });
};
exports.users = users;
const signup = (req, res) => {
  let user = req.body;
  let key = user.password;
  delete user.password;
  user.email = user.email.toLowerCase().trim();
  let user_exists = _conn.USERS.readone({
    email: user.email
  });
  if (user_exists) return res.json({
    ok: false,
    message: "user exists",
    data: "email already used."
  });
  if (user_exists) {
    user._id = user_exists._id;
    _conn.USERS.update(user._id, {
      firstname: user.firstname,
      lastname: user.lastname
    });
    _conn.USERS_HASH.update({
      user: user._id
    }, {
      key
    });
  } else {
    user.image = (0, _utils.save_image)(user.image);
    let result = _conn.USERS.write(user);
    user._id = result._id;
    user.created = result.created;
    _conn.USERS_HASH.write({
      user: user._id,
      key
    });
  }
  let code = (0, _functions.generate_random_string)(6);
  email_verification_codes[user.email] = code;
  let fullname = to_title("".concat(user.firstname, " ").concat(user.lastname));
  send_mail({
    recipient: user.email,
    recipient_name: fullname,
    subject: "[Seminar] Please verify your email",
    sender_name: "Seminar",
    html: (0, _emails.verification)(code, fullname)
  });
  res.json({
    ok: true,
    message: "user signup",
    data: {
      email: user.email,
      _id: user._id
    }
  });
};
exports.signup = signup;
const user_by_email = (req, res) => {
  let {
    email
  } = req.body;
  res.json({
    ok: true,
    message: "user by email",
    data: _conn.USERS.readone({
      email
    }) || "User not found"
  });
};
exports.user_by_email = user_by_email;
const update_user = (req, res) => {
  let {
    user
  } = req.params;
  let user_obj = req.body;
  let prior_user = _conn.USERS.readone(user);
  if (prior_user.image && user_obj.image && !user_obj.image.endsWith(".jpg")) (0, _utils.remove_image)(prior_user.image);
  user_obj.image = (0, _utils.save_image)(user_obj.image);
  user = _conn.USERS.update(user, {
    ...user_obj
  });
  res.json({
    ok: true,
    message: "user updated",
    data: {
      ...user,
      image: user_obj.image
    }
  });
};
exports.update_user = update_user;
const user = (req, res) => {
  let {
    user_id
  } = req.params;
  res.json({
    ok: true,
    message: "user fetched",
    data: _conn.USERS.readone(user_id)
  });
};
exports.user = user;
const verify_email = (req, res) => {
  let {
    email,
    verification_code
  } = req.body;
  email = email && email.trim().toLowerCase();
  verification_code = verification_code && verification_code.trim();
  let code = email_verification_codes[email];
  if (!code || code !== verification_code) return res.json({
    ok: false,
    message: "",
    data: "Email verification failed."
  });
  let user = _conn.USERS.readone({
    email
  });
  _conn.USERS.update(user._id, {
    verified: true
  });
  res.json({
    ok: true,
    message: "user email verified",
    data: user
  });
};
exports.verify_email = verify_email;
const login = (req, res) => {
  let {
    email,
    password
  } = req.body;
  let user = _conn.USERS.readone({
    email: email.toLowerCase()
  });
  if (!user) return res.json({
    ok: false,
    message: "user not found",
    data: "User not found"
  });
  let user_hash = _conn.USERS_HASH.readone({
    user: user._id
  });
  if (!user_hash || user_hash && user_hash.key !== password) return res.json({
    ok: false,
    message: "invalid password",
    data: "Invalid password"
  });
  res.json({
    ok: true,
    message: "user logged-in",
    data: user
  });
};
exports.login = login;