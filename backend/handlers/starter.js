import {
  ADMINSTRATORS,
  ADMIN_HASH,
  GLOBALS,
  USERS,
  USERS_HASH,
} from "../ds/conn";
import { GLOBAL_trending_articles } from "./articles";
import { GLOBAL_alumni_overview } from "./reviews";
import {
  GLOBALS_about_statement,
  GLOBALS_mission_statement,
  GLOBALS_sectors,
  GLOBALS_vision_statement,
  GLOBAL_donation_section,
  GLOBAL_flier_stuff,
  GLOBAL_internship,
  GLOBAL_live_training,
  GLOBAL_logo,
  GLOBAL_mentorship,
  GLOBAL_speakers,
  GLOBAL_sponsors,
  GLOBAL_upcoming_event,
} from "./settings";
import { GLOBAL_pending_talks } from "./speakers";

let default_admin = "adminstrators~123seminar~1234567890123",
  default_user = "users~123seminar~1234567890123";

const create_default_admin = () => {
  if (!ADMINSTRATORS.readone(default_admin)) {
    ADMINSTRATORS.write({
      firstname: "Canada",
      lastname: "NG",
      image: "logo_single.png",
      email: "admin@canada.com".toLowerCase(),
      _id: default_admin,
    });
    ADMIN_HASH.write({ admin: default_admin, key: "adminstrator#1" });
  }

  let user_ = USERS.readone(default_user);
  if (!user_) {
    USERS.write({
      _id: default_user,
      firstname: "Canada",
      lastname: "NG",
      verified: true,
      email: "seminarafrica@gmail.com",
    });
    USERS_HASH.write({ user: default_user, key: "adminstrator#1" });
  }

  !GLOBALS.readone({ global: GLOBALS_mission_statement }) &&
    GLOBALS.write({ global: GLOBALS_mission_statement });

  !GLOBALS.readone({ global: GLOBALS_vision_statement }) &&
    GLOBALS.write({ global: GLOBALS_vision_statement });

  !GLOBALS.readone({ global: GLOBALS_about_statement }) &&
    GLOBALS.write({ global: GLOBALS_about_statement });

  !GLOBALS.readone({ global: GLOBAL_pending_talks }) &&
    GLOBALS.write({ global: GLOBAL_pending_talks, talks: new Array() });

  !GLOBALS.readone({ global: GLOBAL_trending_articles }) &&
    GLOBALS.write({ global: GLOBAL_trending_articles, articles: new Array() });

  !GLOBALS.readone({ global: GLOBAL_alumni_overview }) &&
    GLOBALS.write({ global: GLOBAL_alumni_overview });

  !GLOBALS.readone({ global: GLOBAL_live_training }) &&
    GLOBALS.write({ global: GLOBAL_live_training });

  !GLOBALS.readone({ global: GLOBAL_donation_section }) &&
    GLOBALS.write({ global: GLOBAL_donation_section });

  !GLOBALS.readone({ global: GLOBAL_mentorship }) &&
    GLOBALS.write({ global: GLOBAL_mentorship });

  !GLOBALS.readone({ global: GLOBAL_internship }) &&
    GLOBALS.write({ global: GLOBAL_internship });

  !GLOBALS.readone({ global: GLOBAL_sponsors }) &&
    GLOBALS.write({ global: GLOBAL_sponsors });

  !GLOBALS.readone({ global: GLOBAL_speakers }) &&
    GLOBALS.write({ global: GLOBAL_speakers });

  !GLOBALS.readone({ global: GLOBALS_sectors }) &&
    GLOBALS.write({ global: GLOBALS_sectors });

  !GLOBALS.readone({ global: GLOBAL_logo }) &&
    GLOBALS.write({ global: GLOBAL_logo });

  !GLOBALS.readone({ global: GLOBAL_flier_stuff }) &&
    GLOBALS.write({ global: GLOBAL_flier_stuff });

  !GLOBALS.readone({ global: GLOBAL_upcoming_event }) &&
    GLOBALS.write({ global: GLOBAL_upcoming_event });
};

export { create_default_admin, default_user };
