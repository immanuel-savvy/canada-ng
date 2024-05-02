"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.save_video = exports.save_image = exports.save_file = exports.remove_video = exports.remove_image = exports.remove_file = exports.Paystack_public_key = exports.Paystack_private_key = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _functions = require("generalised-datastore/utils/functions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let strip_length = 8,
  prefix = "GIIT_ICT_Foundation";
const Paystack_public_key = exports.Paystack_public_key = "pk_test_88c19524a2abc3ad156a72952316e0f77ca87f4e";
const Paystack_private_key = exports.Paystack_private_key = "sk_test_8f53d8f0d9303a18a856d4aeba97603d0795fdcb";
const save_image = (base64_image, image_name) => {
  if (!base64_image || base64_image && !base64_image.startsWith("data")) return base64_image;
  image_name = "".concat(prefix, "_").concat(image_name || Date.now()).concat(image_name ? "" : (0, _functions.generate_random_string)(6, "alpha"), ".jpg");
  let image_path = __dirname.slice(0, __dirname.length - strip_length) + "assets/images/".concat(image_name);
  _fs.default.writeFileSync(image_path, Buffer.from(base64_image.slice(base64_image.indexOf(",")), "base64"));
  return image_name;
};
exports.save_image = save_image;
const save_file = (base64_file, file_name) => {
  if (!base64_file || base64_file && !base64_file.startsWith("data")) return base64_file;
  file_name = "".concat(prefix, "_").concat(file_name ? file_name.split(".")[0] + "-".concat(Date.now()) : Date.now()).concat(file_name ? "" : (0, _functions.generate_random_string)(6, "alpha"), ".").concat(file_name.split(".").slice(-1)[0]);
  let file_path = __dirname.slice(0, __dirname.length - strip_length) + "assets/files/".concat(file_name);
  _fs.default.writeFileSync(file_path, Buffer.from(base64_file.slice(base64_file.indexOf(",")), "base64"));
  return file_name;
};
exports.save_file = save_file;
const save_video = base6_video => {
  if (!base6_video || base6_video && !base6_video.startsWith("data")) return base6_video;
  let video_name = "".concat(prefix, "_").concat(Date.now()).concat((0, _functions.generate_random_string)(6, "alpha"), ".mp4");
  let video_path = __dirname.slice(0, __dirname.length - strip_length) + "assets/videos/".concat(video_name);
  _fs.default.writeFileSync(video_path, Buffer.from(base6_video.slice(base6_video.indexOf(",")), "base64"));
  return video_name;
};
exports.save_video = save_video;
const remove_image = image => {
  if (image === "user_image_placeholder.png" || !image) return;
  try {
    let image_path = __dirname.slice(0, __dirname.length - strip_length) + "assets/images/".concat(image);
    _fs.default.unlinkSync(image_path);
  } catch (e) {}
};
exports.remove_image = remove_image;
const remove_file = file => {
  if (file === "user_image_placeholder.png" || !file) return;
  try {
    let file_path = __dirname.slice(0, __dirname.length - strip_length) + "assets/files/".concat(file);
    _fs.default.unlinkSync(file_path);
  } catch (e) {}
};
exports.remove_file = remove_file;
const remove_video = video => {
  if (video === "user_image_placeholder.png" || !video) return;
  try {
    let video_path = __dirname.slice(0, __dirname.length - strip_length) + "assets/videos/".concat(video);
    _fs.default.unlinkSync(video_path);
  } catch (e) {}
};
exports.remove_video = remove_video;