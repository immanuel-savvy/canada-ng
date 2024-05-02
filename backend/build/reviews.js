"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.video_reviews = exports.update_video_review = exports.update_alumni_overview = exports.reviews = exports.remove_video_review = exports.remove_review = exports.new_video_review = exports.new_review = exports.approve_review = exports.alumni_overview = exports.GLOBAL_alumni_overview = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
const GLOBALS_verified_reviews = "verified_reviews";
const approve_review = (req, res) => {
  let {
    review
  } = req.params;
  let globals = _conn.GLOBALS.readone({
    global: GLOBALS_verified_reviews
  });
  if (globals) _conn.GLOBALS.update({
    global: GLOBALS_verified_reviews
  }, {
    reviews: {
      $push: review
    }
  });else _conn.GLOBALS.write({
    global: GLOBALS_verified_reviews,
    review: new Array(review)
  });
  _conn.REVIEWS.update(review, {
    verified: true
  });
  res.end();
};
exports.approve_review = approve_review;
const reviews = (req, res) => {
  let {
    limit,
    verified
  } = req.body;
  let reviews;
  let verified_reviews = _conn.GLOBALS.readone({
    global: GLOBALS_verified_reviews
  });
  if (!verified_reviews) reviews = new Array();else reviews = verified_reviews.reviews;
  if (Number(limit) > 0 && reviews.length) reviews = reviews.slice(0, limit);
  reviews = _conn.REVIEWS.read(verified ? reviews : null, {
    exclude: verified ? null : reviews,
    limit
  });
  res.json({
    ok: true,
    message: "reviews fetched",
    data: reviews
  });
};
exports.reviews = reviews;
const new_review = (req, res) => {
  let review = req.body;
  review.image = (0, _utils.save_image)(review.image);
  let result;
  if (review._id) result = _conn.REVIEWS.update(review._id, review);else result = _conn.REVIEWS.write(review);
  review._id = result._id;
  review.created = result.created;
  if (!req.body._id) if (review.verified) if (!!_conn.GLOBALS.readone({
    global: GLOBALS_verified_reviews
  })) _conn.GLOBALS.update({
    global: GLOBALS_verified_reviews
  }, {
    reviews: {
      $push: review._id
    }
  });else _conn.GLOBALS.write({
    global: GLOBALS_verified_reviews,
    reviews: new Array(review._id)
  });
  res.json({
    ok: true,
    message: "review added",
    data: review
  });
};
exports.new_review = new_review;
const remove_review = (req, res) => {
  let {
    review
  } = req.params;
  let review_ = _conn.REVIEWS.readone(review);
  if (!review_) return res.end();
  review_.image && !review_.user && (0, _utils.remove_image)(review_.image);
  review_.verified && _conn.GLOBALS.update({
    global: GLOBALS_verified_reviews
  }, {
    reviews: {
      $splice: review
    }
  });
  _conn.REVIEWS.remove(review);
  res.json({
    ok: true,
    message: "review removed",
    data: review
  });
};
exports.remove_review = remove_review;
const GLOBAL_alumni_overview = exports.GLOBAL_alumni_overview = "alumni_overview";
const alumni_overview = (req, res) => {
  let alumni_overview_ = _conn.GLOBALS.readone({
    global: GLOBAL_alumni_overview
  });
  res.json({
    ok: true,
    message: "alumni overview",
    data: alumni_overview_
  });
};
exports.alumni_overview = alumni_overview;
const update_alumni_overview = (req, res) => {
  let {
    video,
    thumbnail,
    text,
    title,
    image_hash
  } = req.body;
  video = (0, _utils.save_video)(video), thumbnail = (0, _utils.save_image)(thumbnail);
  let alumni_overview = _conn.GLOBALS.readone({
    global: GLOBAL_alumni_overview
  });
  alumni_overview && (thumbnail.startsWith("data") && (0, _utils.remove_image)(alumni_overview.thumbnail), video.startsWith("data") && (0, _utils.remove_video)(alumni_overview.video));
  _conn.GLOBALS.update({
    global: GLOBAL_alumni_overview
  }, {
    video,
    thumbnail,
    image_hash,
    text,
    title
  });
  res.json({
    ok: true,
    message: "alumni overview updated",
    data: {
      video,
      thumbnail
    }
  });
};
exports.update_alumni_overview = update_alumni_overview;
const new_video_review = (req, res) => {
  let {
    thumbnail,
    url,
    _id,
    image_hash
  } = req.body;
  thumbnail = (0, _utils.save_image)(thumbnail);
  url = (0, _utils.save_video)(url);
  let result;
  if (_id) result = _conn.VIDEO_REVIEWS.update(_id, {
    thumbnail,
    url,
    image_hash
  });else result = _conn.VIDEO_REVIEWS.write({
    thumbnail,
    url,
    image_hash
  });
  res.json({
    ok: true,
    data: {
      thumbnail,
      url,
      _id: result._id
    }
  });
};
exports.new_video_review = new_video_review;
const update_video_review = (req, res) => new_video_review(req, res);
exports.update_video_review = update_video_review;
const remove_video_review = (req, res) => {
  let {
    review
  } = req.params;
  _conn.VIDEO_REVIEWS.remove(review);
  res.end();
};
exports.remove_video_review = remove_video_review;
const video_reviews = (req, res) => {
  let {
    limit
  } = req.body;
  res.json({
    ok: true,
    data: _conn.VIDEO_REVIEWS.read(null, {
      limit: Number(limit)
    })
  });
};
exports.video_reviews = video_reviews;