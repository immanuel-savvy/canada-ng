"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user_conferences = exports.update_conference = exports.remove_conference = exports.register_conference_attendance = exports.new_conference = exports.in_conference_attendance = exports.conferences = exports.conference_attendees = exports.conference_attended = exports.conference = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
const conferences = (req, res) => {
  let {
    limit,
    skip,
    query,
    show_total
  } = req.body;
  let data = _conn.CONFERENCES.read(query, {
    limit,
    skip
  });
  if (show_total) data = {
    conferences: data,
    total: _conn.CONFERENCES.config.total_entries
  };
  res.json({
    ok: true,
    data
  });
};
exports.conferences = conferences;
const new_conference = (req, res) => {
  let conference = req.body;
  conference.images = conference.images.map(img => {
    img.url = (0, _utils.save_image)(img.url);
    return img;
  });
  conference.conference_attendees = 0;
  let result = _conn.CONFERENCES.write(conference);
  conference._id = result._id;
  conference.created = result.created;
  res.json({
    ok: true,
    message: "conference created",
    data: conference
  });
};
exports.new_conference = new_conference;
const update_conference = (req, res) => {
  let conference = req.body;
  conference.images = conference.images.map(img => {
    img.url = (0, _utils.save_image)(img.url);
    return img;
  });
  _conn.CONFERENCES.update(conference._id, {
    ...conference
  });
  res.json({
    ok: true,
    message: "conference updated",
    data: conference
  });
};
exports.update_conference = update_conference;
const remove_conference = (req, res) => {
  let {
    conference
  } = req.params;
  _conn.CONFERENCES.remove(conference);
  _conn.CONFERENCE_ATTENDANT.remove({
    conference
  });
  res.end();
};
exports.remove_conference = remove_conference;
const register_conference_attendance = (req, res) => {
  let {
    user,
    conference
  } = req.body;
  if (_conn.CONFERENCE_ATTENDANT.readone({
    user,
    conference
  })) return res.end();
  _conn.CONFERENCE_ATTENDANT.write({
    user,
    conference,
    conference_attended: false
  });
  _conn.CONFERENCES.update(conference, {
    conference_attendees: {
      $inc: 1
    }
  });
  _conn.USER_CONFERENCES.write({
    user,
    conference
  });
  res.end();
};
exports.register_conference_attendance = register_conference_attendance;
const conference = (req, res) => {
  let {
    conference_id
  } = req.params;
  res.json({
    ok: true,
    data: _conn.CONFERENCES.readone(conference_id)
  });
};
exports.conference = conference;
const in_conference_attendance = (req, res) => {
  let {
    user,
    conference
  } = req.body;
  res.json({
    ok: true,
    data: _conn.CONFERENCE_ATTENDANT.readone({
      user,
      conference
    })
  });
};
exports.in_conference_attendance = in_conference_attendance;
const conference_attended = (req, res) => {
  let {
    user,
    conference
  } = req.body;
  _conn.CONFERENCE_ATTENDANT.update({
    user,
    conference
  }, {
    conference_attended: true
  });
  res.end();
};
exports.conference_attended = conference_attended;
const conference_attendees = (req, res) => {
  let {
    conference,
    query,
    limit,
    skip
  } = req.body;
  res.json({
    ok: true,
    data: _conn.CONFERENCE_ATTENDANT.read({
      conference,
      ...query
    }, {
      limit,
      skip
    })
  });
};
exports.conference_attendees = conference_attendees;
const user_conferences = (req, res) => {
  let {
    user,
    limit,
    skip
  } = req.body;
  res.json({
    ok: true,
    data: _conn.USER_CONFERENCES.read({
      user
    }, {
      limit,
      skip
    })
  });
};
exports.user_conferences = user_conferences;