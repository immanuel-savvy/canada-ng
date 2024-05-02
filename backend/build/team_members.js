"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_team_member = exports.team_members = exports.remove_team_member = exports.add_team_member = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
const add_team_member = (req, res) => {
  let data = req.body;
  data.image = (0, _utils.save_image)(data.image);
  let result = _conn.TEAM_MEMBER.write(data);
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created
    }
  });
};
exports.add_team_member = add_team_member;
const update_team_member = (req, res) => {
  let data = req.body;
  data.image = (0, _utils.save_image)(data.image);
  let result = _conn.TEAM_MEMBER.update(data._id, {
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
exports.update_team_member = update_team_member;
const team_members = (req, res) => {
  res.json({
    ok: true,
    data: _conn.TEAM_MEMBER.read()
  });
};
exports.team_members = team_members;
const remove_team_member = (req, res) => {
  let {
    member
  } = req.params;
  let result = _conn.TEAM_MEMBER.remove(member);
  result && (0, _utils.remove_image)(result.image);
  res.end();
};
exports.remove_team_member = remove_team_member;