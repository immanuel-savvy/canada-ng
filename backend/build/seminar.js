"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user_seminars = exports.update_seminar = exports.seminars = exports.seminar = exports.remove_seminar = exports.register_attendance = exports.new_seminar = exports.in_attendance = exports.attendees = exports.attended = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
const seminars = (req, res) => {
  let {
    limit,
    skip,
    query,
    show_total
  } = req.body;
  let data = _conn.SEMINARS.read(query, {
    limit,
    skip
  });
  if (show_total) data = {
    seminars: data,
    total: _conn.SEMINARS.config.total_entries
  };
  res.json({
    ok: true,
    data
  });
};
exports.seminars = seminars;
const new_seminar = (req, res) => {
  let seminar = req.body;
  seminar.images = seminar.images.map(img => {
    img.url = (0, _utils.save_image)(img.url);
    return img;
  });
  seminar.attendees = 0;
  let result = _conn.SEMINARS.write(seminar);
  seminar._id = result._id;
  seminar.created = result.created;
  res.json({
    ok: true,
    message: "seminar created",
    data: seminar
  });
};
exports.new_seminar = new_seminar;
const update_seminar = (req, res) => {
  let seminar = req.body;
  seminar.images = seminar.images.map(img => {
    img.url = (0, _utils.save_image)(img.url);
    return img;
  });
  _conn.SEMINARS.update(seminar._id, {
    ...seminar
  });
  res.json({
    ok: true,
    message: "seminar updated",
    data: seminar
  });
};
exports.update_seminar = update_seminar;
const remove_seminar = (req, res) => {
  let {
    seminar
  } = req.params;
  _conn.SEMINARS.remove(seminar);
  _conn.ATTENDANT.remove({
    seminar
  });
  res.end();
};
exports.remove_seminar = remove_seminar;
const register_attendance = (req, res) => {
  let {
    user,
    seminar
  } = req.body;
  if (_conn.ATTENDANT.readone({
    user,
    seminar
  })) return res.end();
  _conn.ATTENDANT.write({
    user,
    seminar,
    attended: false
  });
  _conn.SEMINARS.update(seminar, {
    attendees: {
      $inc: 1
    }
  });
  _conn.USER_SEMINARS.write({
    user,
    seminar
  });
  res.end();
};
exports.register_attendance = register_attendance;
const seminar = (req, res) => {
  let {
    seminar_id
  } = req.params;
  res.json({
    ok: true,
    data: _conn.SEMINARS.readone(seminar_id)
  });
};
exports.seminar = seminar;
const in_attendance = (req, res) => {
  let {
    user,
    seminar
  } = req.body;
  res.json({
    ok: true,
    data: _conn.ATTENDANT.readone({
      user,
      seminar
    })
  });
};
exports.in_attendance = in_attendance;
const attended = (req, res) => {
  let {
    user,
    seminar
  } = req.body;
  _conn.ATTENDANT.update({
    user,
    seminar
  }, {
    attended: true
  });
  res.end();
};
exports.attended = attended;
const attendees = (req, res) => {
  let {
    seminar,
    query,
    limit,
    skip
  } = req.body;
  res.json({
    ok: true,
    data: _conn.ATTENDANT.read({
      seminar,
      ...query
    }, {
      limit,
      skip
    })
  });
};
exports.attendees = attendees;
const user_seminars = (req, res) => {
  let {
    user,
    limit,
    skip
  } = req.body;
  res.json({
    ok: true,
    data: _conn.USER_SEMINARS.read({
      user
    }, {
      limit,
      skip
    })
  });
};
exports.user_seminars = user_seminars;