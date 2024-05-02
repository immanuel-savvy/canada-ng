"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.participations = exports.add_participate = void 0;
var _conn = require("../ds/conn");
const add_participate = (req, res) => {
  let result = _conn.PARTICIPATIONS.write(req.body);
  res.json({
    ok: true,
    data: {
      _id: result._id,
      created: result.created
    }
  });
};
exports.add_participate = add_participate;
const participations = (req, res) => {
  res.json({
    ok: true,
    data: _conn.PARTICIPATIONS.read()
  });
};
exports.participations = participations;