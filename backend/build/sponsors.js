"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_sponsor = exports.update_event_sponsors = exports.sponsors = exports.remove_sponsor = exports.new_sponsor = exports.event_sponsors = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
const new_sponsor = (req, res) => {
  let sponsor = req.body;
  sponsor.logo = (0, _utils.save_image)(sponsor.logo);
  let result = _conn.SPONSORS.write(sponsor);
  res.json({
    ok: true,
    data: {
      _id: result._id,
      logo: sponsor.logo,
      created: result.created
    }
  });
};
exports.new_sponsor = new_sponsor;
const update_sponsor = (req, res) => {
  let sponsor = req.body;
  sponsor.logo = (0, _utils.save_image)(sponsor.logo);
  _conn.SPONSORS.update(sponsor._id, {
    ...sponsor
  });
  res.json({
    ok: true,
    data: {
      logo: sponsor.logo,
      _id: sponsor._id,
      created: sponsor.created
    }
  });
};
exports.update_sponsor = update_sponsor;
const event_sponsors = (req, res) => {
  let {
    event
  } = req.params;
  let sponsors = _conn.EVENT_SPONSORS.readone({
    event
  });
  if (!sponsors) sponsors = new Array();else sponsors = _conn.SPONSORS.read(sponsors.sponsors);
  res.json({
    ok: true,
    data: sponsors
  });
};
exports.event_sponsors = event_sponsors;
const sponsors = (req, res) => {
  res.json({
    ok: true,
    data: _conn.SPONSORS.read()
  });
};
exports.sponsors = sponsors;
const update_event_sponsors = (req, res) => {
  let {
    event,
    sponsors
  } = req.body;
  let e_sponsor = _conn.EVENT_SPONSORS.readone({
    event,
    sponsors
  });
  if (e_sponsor) {
    _conn.EVENT_SPONSORS.update({
      event,
      _id: e_sponsor._id
    }, {
      sponsors
    });
  } else _conn.EVENT_SPONSORS.write({
    event,
    sponsors
  });
  res.end();
};
exports.update_event_sponsors = update_event_sponsors;
const remove_sponsor = (req, res) => {
  let {
    sponsor
  } = req.params;
  let result = _conn.SPONSORS.remove(sponsor);
  result && (0, _utils.remove_image)(sponsor.logo);
  res.end();
};
exports.remove_sponsor = remove_sponsor;