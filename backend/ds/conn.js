import GDS from "generalised-datastore";

let gds;

let USERS,
  ADMINSTRATORS,
  ADMIN_HASH,
  USERS_HASH,
  USER_SEMINARS,
  GLOBALS,
  TEAM_MEMBER,
  SPEAKERS,
  ATTENDANT,
  PENDING_TALKS,
  ASSOCIATES,
  PAGES,
  SEMINARS,
  ARTICLES,
  ARTICLE_CATEGORIES,
  COMMENTS,
  REVIEWS,
  SECTORS,
  VIDEO_REVIEWS,
  REPLIES,
  GALLERY,
  CONFERENCES,
  TRENDING_ARTICLES,
  CONFERENCE_ATTENDANT,
  SPONSORS,
  EVENT_SPONSORS,
  PARTICIPATIONS,
  USER_CONFERENCES;

const ds_conn = () => {
  gds = new GDS("canada").sync();

  REVIEWS = gds.folder("reviews");
  VIDEO_REVIEWS = gds.folder("video_reviews");
  ARTICLES = gds.folder("articles", null, "categories");
  CONFERENCES = gds.folder("conferences");
  ARTICLE_CATEGORIES = gds.folder("article_categories");
  TRENDING_ARTICLES = gds.folder("trending_articles", null, "article");
  ADMINSTRATORS = gds.folder("adminstrators");
  USERS = gds.folder("users");
  SPONSORS = gds.folder("sponsors");
  EVENT_SPONSORS = gds.folder("event_sponsors", "event");
  PENDING_TALKS = gds.folder("pending_talks", null, "user");
  TEAM_MEMBER = gds.folder("team_members");
  SPEAKERS = gds.folder("speakers");
  PARTICIPATIONS = gds.folder("participations");
  PAGES = gds.folder("pages");
  ASSOCIATES = gds.folder("associates");
  COMMENTS = gds.folder("comments", "item");
  REPLIES = gds.folder("replies", "comment");
  ADMIN_HASH = gds.folder("admin_hash", "admin");
  SECTORS = gds.folder("sectors", null, "page");
  GLOBALS = gds.folder("globals", "global");
  USER_SEMINARS = gds.folder("user_seminars", "user", "seminar");
  USER_CONFERENCES = gds.folder("user_conferecnes", "user", "conference");
  SEMINARS = gds.folder("seminars");
  ATTENDANT = gds.folder("attendant", "seminar", "user");
  CONFERENCE_ATTENDANT = gds.folder(
    "conference_attendant",
    "conference",
    "user"
  );
  USERS_HASH = gds.folder("user_hash", "user");
  GALLERY = gds.folder("gallery");
};

export {
  gds,
  USERS,
  ADMIN_HASH,
  SECTORS,
  ADMINSTRATORS,
  GLOBALS,
  PARTICIPATIONS,
  CONFERENCES,
  USER_SEMINARS,
  USERS_HASH,
  GALLERY,
  PAGES,
  PENDING_TALKS,
  TEAM_MEMBER,
  VIDEO_REVIEWS,
  SPEAKERS,
  ASSOCIATES,
  REVIEWS,
  SEMINARS,
  ARTICLES,
  ARTICLE_CATEGORIES,
  COMMENTS,
  REPLIES,
  TRENDING_ARTICLES,
  CONFERENCE_ATTENDANT,
  USER_CONFERENCES,
  SPONSORS,
  EVENT_SPONSORS,
  ATTENDANT,
};
export default ds_conn;
