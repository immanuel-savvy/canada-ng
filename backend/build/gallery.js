"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_media = exports.remove_media = exports.new_media = exports.fetch_media = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
const new_media = (req, res) => {
  let {
    image,
    video,
    description,
    title,
    image_hash
  } = req.body;
  if (video) video = (0, _utils.save_video)(video);
  image = (0, _utils.save_image)(image);
  let result = _conn.GALLERY.write({
    video,
    image,
    image_hash,
    title,
    description
  });
  res.json({
    ok: true,
    data: {
      video,
      image,
      _id: result._id,
      created: result.created
    }
  });
};
exports.new_media = new_media;
const remove_media = (req, res) => {
  let {
    media
  } = req.params;
  _conn.GALLERY.remove(media);
  res.end();
};
exports.remove_media = remove_media;
const fetch_media = (req, res) => {
  let {
    skip,
    limit,
    total_media
  } = req.body;
  let media = _conn.GALLERY.read(null, {
    limit,
    skip
  });
  if (total_media) media = {
    gallery: media,
    total_media: _conn.GALLERY.config.total_entries
  };
  res.json({
    ok: true,
    message: "media fetched",
    data: media
  });
};
exports.fetch_media = fetch_media;
const update_media = (req, res) => {
  let {
    _id,
    title,
    description,
    image,
    video,
    image_hash
  } = req.body;
  let media = _conn.GALLERY.readone(_id);
  if (image.startsWith("data")) (0, _utils.remove_image)(media.image);
  if (video && video.startsWith("data")) (0, _utils.remove_video)(media.video);
  image = (0, _utils.save_image)(image);
  video = (0, _utils.save_image)(video);
  _conn.GALLERY.update(_id, {
    title,
    description,
    image,
    video,
    image_hash
  });
  res.json({
    ok: true,
    message: "media updated",
    data: {
      _id,
      image,
      title,
      description,
      video,
      created: media.created
    }
  });
};
exports.update_media = update_media;