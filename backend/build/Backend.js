"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _conn = _interopRequireDefault(require("./ds/conn"));
var _routes = _interopRequireDefault(require("./routes"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _starter = require("./handlers/starter");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.static(__dirname + "/assets"));
app.use(_bodyParser.default.urlencoded({
  extended: true,
  limit: "100mb"
}));
app.use(_bodyParser.default.json({
  limit: "100mb"
}));
(0, _routes.default)(app);
app.get("/", (req, res) => res.send("<div><h1>Hi, its Canada.</h1></div>"));
app.listen(1450, () => {
  (0, _conn.default)();
  (0, _starter.create_default_admin)();
  console.log("Canada Backend started on :1450");
});