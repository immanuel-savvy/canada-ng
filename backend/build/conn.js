"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gds = exports.default = exports.VIDEO_REVIEWS = exports.USER_SEMINARS = exports.USER_CONFERENCES = exports.USERS_HASH = exports.USERS = exports.TRENDING_ARTICLES = exports.TEAM_MEMBER = exports.SPONSORS = exports.SPEAKERS = exports.SEMINARS = exports.SECTORS = exports.REVIEWS = exports.REPLIES = exports.PENDING_TALKS = exports.PARTICIPATIONS = exports.PAGES = exports.GLOBALS = exports.EVENT_SPONSORS = exports.CONFERENCE_ATTENDANT = exports.CONFERENCES = exports.COMMENTS = exports.ATTENDANT = exports.ASSOCIATES = exports.ARTICLE_CATEGORIES = exports.ARTICLES = exports.ADMIN_HASH = exports.ADMINSTRATORS = void 0;
var _generalisedDatastore = _interopRequireDefault(require("generalised-datastore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let gds = exports.gds = void 0;
let USERS = exports.USERS = void 0,
  ADMINSTRATORS = exports.ADMINSTRATORS = void 0,
  ADMIN_HASH = exports.ADMIN_HASH = void 0,
  USERS_HASH = exports.USERS_HASH = void 0,
  USER_SEMINARS = exports.USER_SEMINARS = void 0,
  GLOBALS = exports.GLOBALS = void 0,
  TEAM_MEMBER = exports.TEAM_MEMBER = void 0,
  SPEAKERS = exports.SPEAKERS = void 0,
  ATTENDANT = exports.ATTENDANT = void 0,
  PENDING_TALKS = exports.PENDING_TALKS = void 0,
  ASSOCIATES = exports.ASSOCIATES = void 0,
  PAGES = exports.PAGES = void 0,
  SEMINARS = exports.SEMINARS = void 0,
  ARTICLES = exports.ARTICLES = void 0,
  ARTICLE_CATEGORIES = exports.ARTICLE_CATEGORIES = void 0,
  COMMENTS = exports.COMMENTS = void 0,
  REVIEWS = exports.REVIEWS = void 0,
  SECTORS = exports.SECTORS = void 0,
  VIDEO_REVIEWS = exports.VIDEO_REVIEWS = void 0,
  REPLIES = exports.REPLIES = void 0,
  CONFERENCES = exports.CONFERENCES = void 0,
  TRENDING_ARTICLES = exports.TRENDING_ARTICLES = void 0,
  CONFERENCE_ATTENDANT = exports.CONFERENCE_ATTENDANT = void 0,
  SPONSORS = exports.SPONSORS = void 0,
  EVENT_SPONSORS = exports.EVENT_SPONSORS = void 0,
  PARTICIPATIONS = exports.PARTICIPATIONS = void 0,
  USER_CONFERENCES = exports.USER_CONFERENCES = void 0;
const ds_conn = () => {
  exports.gds = gds = new _generalisedDatastore.default("canada").sync();
  exports.REVIEWS = REVIEWS = gds.folder("reviews");
  exports.VIDEO_REVIEWS = VIDEO_REVIEWS = gds.folder("video_reviews");
  exports.ARTICLES = ARTICLES = gds.folder("articles", null, "categories");
  exports.CONFERENCES = CONFERENCES = gds.folder("conferences");
  exports.ARTICLE_CATEGORIES = ARTICLE_CATEGORIES = gds.folder("article_categories");
  exports.TRENDING_ARTICLES = TRENDING_ARTICLES = gds.folder("trending_articles", null, "article");
  exports.ADMINSTRATORS = ADMINSTRATORS = gds.folder("adminstrators");
  exports.USERS = USERS = gds.folder("users");
  exports.SPONSORS = SPONSORS = gds.folder("sponsors");
  exports.EVENT_SPONSORS = EVENT_SPONSORS = gds.folder("event_sponsors", "event");
  exports.PENDING_TALKS = PENDING_TALKS = gds.folder("pending_talks", null, "user");
  exports.TEAM_MEMBER = TEAM_MEMBER = gds.folder("team_members");
  exports.SPEAKERS = SPEAKERS = gds.folder("speakers");
  exports.PARTICIPATIONS = PARTICIPATIONS = gds.folder("participations");
  exports.PAGES = PAGES = gds.folder("pages");
  exports.ASSOCIATES = ASSOCIATES = gds.folder("associates");
  exports.COMMENTS = COMMENTS = gds.folder("comments", "item");
  exports.REPLIES = REPLIES = gds.folder("replies", "comment");
  exports.ADMIN_HASH = ADMIN_HASH = gds.folder("admin_hash", "admin");
  exports.SECTORS = SECTORS = gds.folder("sectors", null, "page");
  exports.GLOBALS = GLOBALS = gds.folder("globals", "global");
  exports.USER_SEMINARS = USER_SEMINARS = gds.folder("user_seminars", "user", "seminar");
  exports.USER_CONFERENCES = USER_CONFERENCES = gds.folder("user_conferecnes", "user", "conference");
  exports.SEMINARS = SEMINARS = gds.folder("seminars");
  exports.ATTENDANT = ATTENDANT = gds.folder("attendant", "seminar", "user");
  exports.CONFERENCE_ATTENDANT = CONFERENCE_ATTENDANT = gds.folder("conference_attendant", "conference", "user");
  exports.USERS_HASH = USERS_HASH = gds.folder("user_hash", "user");
};
var _default = exports.default = ds_conn;