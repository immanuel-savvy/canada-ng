"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stats = exports.paystack_secret_key = exports.get_admins = exports.domain_name = exports.create_admin = exports.client_domain = exports.admin_login = void 0;
var _conn = require("../ds/conn");
const domain_name = exports.domain_name = "https://dev.seminar.com";
const client_domain = exports.client_domain = "http://seminar.com";
const paystack_secret_key = exports.paystack_secret_key = "sk_test_8f53d8f0d9303a18a856d4aeba97603d0795fdcb";
const admin_login = (req, res) => {
  let {
    email,
    password
  } = req.body;
  let admin = _conn.ADMINSTRATORS.readone({
    email: email && email.toLowerCase()
  });
  if (admin) {
    let hash = _conn.ADMIN_HASH.readone({
      admin: admin._id
    });
    res.json(hash.key === password ? {
      ok: true,
      message: "admin logged-in",
      data: {
        admin
      }
    } : {
      ok: false,
      data: {
        message: "incorrect password"
      }
    });
  } else res.json({
    ok: false,
    data: {
      message: "admin not found"
    }
  });
};
exports.admin_login = admin_login;
const get_admins = (req, res) => {
  let admins = _conn.ADMINSTRATORS.read();
  res.json({
    ok: true,
    message: "adminstrators fetched",
    data: admins
  });
};
exports.get_admins = get_admins;
const create_admin = (req, res) => {
  let {
    email,
    password,
    firstname,
    lastname
  } = req.body;
  let admin = {
    email: email && email.toLowerCase(),
    firstname,
    lastname
  };
  let result = _conn.ADMINSTRATORS.write(admin);
  admin._id = result._id;
  admin.created = result.created;
  _conn.ADMIN_HASH.write({
    admin: admin._id,
    key: password
  });
  res.json({
    ok: true,
    message: "admin created",
    data: admin
  });
};
exports.create_admin = create_admin;
const stats = (req, res) => {
  let stats_ = new Array();
  res.json({
    ok: true,
    message: "stats",
    data: stats_
  });
};
exports.stats = stats;