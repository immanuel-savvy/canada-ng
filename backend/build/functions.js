"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valid_id = exports.shuffle_array = exports.month_index = exports.get_timestamp_from_id = exports.generate_random_string = exports.gen_random_int = exports.copy_object = exports._id = void 0;
const month_index = exports.month_index = new Object({
  0: "jan",
  1: "feb",
  2: "mar",
  3: "apr",
  4: "may",
  5: "jun",
  6: "jul",
  7: "aug",
  8: "sep",
  9: "oct",
  10: "nov",
  11: "dec"
});
const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const combinations = {
  alnum: charset,
  num: "01234556789",
  alpha: "abcdefghijklmnopqrstuvwxyz"
};
const gen_random_int = function (max_int) {
  let min_int = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return min_int + Math.floor(Math.random() * max_int);
};
exports.gen_random_int = gen_random_int;
const get_timestamp_from_id = _id => {
  let split_id = _id && _id.split("~");
  return split_id && split_id[2];
};
exports.get_timestamp_from_id = get_timestamp_from_id;
const generate_random_string = (len, combination) => {
  let string = "";
  combination = combinations[combination] || combinations["num"];
  for (let i = 0; i < (len || 6); i++) string += combination[gen_random_int(combination.length)];
  return string;
};
exports.generate_random_string = generate_random_string;
const _id = folder => {
  let random_value = "";
  for (let i = 0; i < gen_random_int(32, 12); i++) random_value += charset[gen_random_int(charset.length)];
  return "".concat(folder, "~").concat(random_value, "~").concat(Date.now());
};
exports._id = _id;
const valid_id = val => {
  if (typeof val !== "string" || !val) return;
  let splited = val.split("~");
  if (splited.length !== 3) return;
  return true;
};
exports.valid_id = valid_id;
const copy_object = object => {
  if (typeof object !== "object") return object;
  let new_object = {
    ...object
  };
  for (let prop in new_object) {
    let val = new_object[prop];
    if (Array.isArray(val) && typeof val[0] === "object" && val[0] && valid_id(val[0]._id)) new_object[val] = val.map(v => copy_object(v));else if (typeof val === "object" && val) new_object[val] = copy_object(val);
  }
  return new_object;
};
exports.copy_object = copy_object;
const shuffle_array = array => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
exports.shuffle_array = shuffle_array;