"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_speaker = exports.submit_a_talk = exports.speakers = exports.remove_speaker = exports.pending_talks = exports.decline_talk = exports.approve_talk = exports.add_speaker = exports.GLOBAL_pending_talks = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
const add_speaker = (req, res) => {
  let data = req.body;
  data.image = (0, _utils.save_image)(data.image);
  let result = _conn.SPEAKERS.write(data);
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created
    }
  });
};
exports.add_speaker = add_speaker;
const update_speaker = (req, res) => {
  let data = req.body;
  data.image = (0, _utils.save_image)(data.image);
  let result = _conn.SPEAKERS.update(data._id, {
    ...data
  });
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created
    }
  });
};
exports.update_speaker = update_speaker;
const speakers = (req, res) => {
  res.json({
    ok: true,
    data: _conn.SPEAKERS.read()
  });
};
exports.speakers = speakers;
const remove_speaker = (req, res) => {
  let {
    speaker
  } = req.params;
  let result = _conn.SPEAKERS.remove(speaker);
  result && (0, _utils.remove_image)(result.image);
  res.end();
};
exports.remove_speaker = remove_speaker;
const GLOBAL_pending_talks = exports.GLOBAL_pending_talks = "pending_talks";
const submit_a_talk = (req, res) => {
  let {
    title,
    category,
    description,
    user
  } = req.body;
  let result = _conn.PENDING_TALKS.write({
    title,
    category,
    description,
    user
  });
  result && _conn.GLOBALS.update({
    global: GLOBAL_pending_talks
  }, {
    talks: {
      $push: result._id
    }
  });
  res.end();
};
exports.submit_a_talk = submit_a_talk;
const approve_talk = (req, res) => {
  let {
    talk
  } = req.params;
  _conn.PENDING_TALKS.update(talk, {
    approved: true
  });
  _conn.GLOBALS.update({
    global: GLOBAL_pending_talks
  }, {
    talks: {
      $splice: talk
    }
  });
  res.end();
};
exports.approve_talk = approve_talk;
const decline_talk = (req, res) => {
  let {
    talk
  } = req.params;
  _conn.PENDING_TALKS.update(talk, {
    declined: true
  });
  _conn.GLOBALS.update({
    global: GLOBAL_pending_talks
  }, {
    talks: {
      $splice: talk
    }
  });
  res.end();
};
exports.decline_talk = decline_talk;
const pending_talks = (req, res) => {
  res.json({
    ok: true,
    data: _conn.PENDING_TALKS.read(_conn.GLOBALS.readone({
      global: GLOBAL_pending_talks
    }).talks)
  });
};
exports.pending_talks = pending_talks;