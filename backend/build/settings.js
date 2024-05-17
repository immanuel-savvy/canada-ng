"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_vision = exports.update_sponsors = exports.update_speakers = exports.update_sectors = exports.update_sector = exports.update_page = exports.update_mission = exports.update_mentorship = exports.update_live_training = exports.update_internship = exports.update_event_highlight = exports.update_donation_section = exports.update_banner = exports.update_associate = exports.update_about_statement = exports.upcoming_event = exports.sponsors_page = exports.speakers_page = exports.sectors = exports.remove_sector = exports.remove_banner = exports.remove_associate = exports.pages = exports.page = exports.mission_vision_statement = exports.mentorship = exports.logo_update = exports.live_training = exports.internship = exports.handle_flier_stuff = exports.get_sectors = exports.flier_stuff = exports.entry = exports.donation_section = exports.banners_et_logo = exports.associates = exports.add_sector = exports.add_banner = exports.add_associate = exports.about_statement = exports.GLOBAL_upcoming_event = exports.GLOBAL_sponsors = exports.GLOBAL_speakers = exports.GLOBAL_mentorship = exports.GLOBAL_logo = exports.GLOBAL_live_training = exports.GLOBAL_internship = exports.GLOBAL_flier_stuff = exports.GLOBAL_donation_section = exports.GLOBAL_banner_stuff = exports.GLOBALS_vision_statement = exports.GLOBALS_sectors = exports.GLOBALS_mission_statement = exports.GLOBALS_about_statement = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
const GLOBALS_mission_statement = exports.GLOBALS_mission_statement = "mission_statement",
  GLOBALS_vision_statement = exports.GLOBALS_vision_statement = "vision_statement",
  GLOBALS_about_statement = exports.GLOBALS_about_statement = "about_statement";
const mission_vision_statement = (req, res) => {
  let vision = _conn.GLOBALS.readone({
      global: GLOBALS_vision_statement
    }),
    mission = _conn.GLOBALS.readone({
      global: GLOBALS_mission_statement
    });
  res.json({
    ok: true,
    data: {
      vision,
      mission
    }
  });
};
exports.mission_vision_statement = mission_vision_statement;
const update_mission = (req, res) => {
  let {
    mission_statement,
    mission_title,
    mission,
    mission_file_hash
  } = req.body;
  if (!mission || !mission_file_hash || !mission_statement) return res.end();
  mission = (0, _utils.save_image)(mission);
  _conn.GLOBALS.update({
    global: GLOBALS_mission_statement
  }, {
    mission_statement,
    mission_title,
    mission,
    mission_file_hash
  });
  res.json({
    ok: true,
    data: {
      mission
    }
  });
};
exports.update_mission = update_mission;
const add_associate = (req, res) => {
  let data = req.body;
  data.logo = (0, _utils.save_image)(data.logo);
  let result = _conn.ASSOCIATES.write(data);
  res.json({
    ok: true,
    data: {
      _id: result._id,
      logo: data.logo,
      created: result.created
    }
  });
};
exports.add_associate = add_associate;
const update_associate = (req, res) => {
  let data = req.body;
  data.logo = (0, _utils.save_image)(data.logo);
  let result = _conn.ASSOCIATES.update(data._id, {
    ...data
  });
  res.json({
    ok: true,
    data: {
      _id: result._id,
      logo: data.logo,
      created: result.created
    }
  });
};
exports.update_associate = update_associate;
const associates = (req, res) => {
  res.json({
    ok: true,
    data: _conn.ASSOCIATES.read()
  });
};
exports.associates = associates;
const remove_associate = (req, res) => {
  let {
    associate
  } = req.params;
  let result = _conn.ASSOCIATES.remove(associate);
  result && (0, _utils.remove_image)(result.logo);
  res.end();
};
exports.remove_associate = remove_associate;
let GLOBALS_sectors = exports.GLOBALS_sectors = "sectors";
const add_sector = (req, res) => {
  let data = req.body;
  data.image = (0, _utils.save_image)(data.image);
  let result = _conn.SECTORS.write(data);
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created
    }
  });
};
exports.add_sector = add_sector;
const update_sector = (req, res) => {
  let data = req.body;
  data.image = (0, _utils.save_image)(data.image);
  let result = _conn.SECTORS.update(data._id, {
    ...data
  });
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created
    }
  });
};
exports.update_sector = update_sector;
const sectors = (req, res) => {
  res.json({
    ok: true,
    data: _conn.SECTORS.read()
  });
};
exports.sectors = sectors;
const remove_sector = (req, res) => {
  let {
    sector
  } = req.params;
  let result = _conn.SECTORS.remove(sector);
  result && (0, _utils.remove_image)(result.image);
  res.end();
};
exports.remove_sector = remove_sector;
const get_sectors = (req, res) => {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBALS_sectors
    })
  });
};
exports.get_sectors = get_sectors;
const update_sectors = (req, res) => {
  let {
    sub_title,
    sectors
  } = req.body;
  if (!sectors) return res.end();
  _conn.GLOBALS.update({
    global: GLOBALS_sectors
  }, {
    sub_title,
    sectors
  });
  res.json({
    ok: true,
    data: {
      sectors
    }
  });
};
exports.update_sectors = update_sectors;
const update_vision = (req, res) => {
  let {
    vision_statement,
    vision_title,
    vision,
    vision_file_hash
  } = req.body;
  if (!vision || !vision_file_hash || !vision_statement) return res.end();
  vision = (0, _utils.save_image)(vision);
  _conn.GLOBALS.update({
    global: GLOBALS_vision_statement
  }, {
    vision_statement,
    vision_title,
    vision,
    vision_file_hash
  });
  res.json({
    ok: true,
    data: {
      vision
    }
  });
};
exports.update_vision = update_vision;
const update_about_statement = (req, res) => {
  let {
    about_statement,
    bullets,
    more_details,
    image,
    image_file_hash
  } = req.body;
  if (!image || !image_file_hash || !about_statement) return res.end();
  image = (0, _utils.save_image)(image);
  _conn.GLOBALS.update({
    global: GLOBALS_about_statement
  }, {
    about_statement,
    image,
    bullets,
    more_details,
    image_file_hash
  });
  res.json({
    ok: true,
    data: {
      image
    }
  });
};
exports.update_about_statement = update_about_statement;
const about_statement = (req, res) => {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBALS_about_statement
    })
  });
};
exports.about_statement = about_statement;
const entry = (req, res) => {
  res.json({
    ok: true,
    data: {
      about: _conn.GLOBALS.readone({
        global: GLOBALS_about_statement
      }),
      vision: _conn.GLOBALS.readone({
        global: GLOBALS_vision_statement
      }),
      mission: _conn.GLOBALS.readone({
        global: GLOBALS_mission_statement
      }),
      banners: _conn.GLOBALS.read({
        global: GLOBAL_banner_stuff
      }),
      logo: _conn.GLOBALS.readone({
        global: GLOBAL_logo
      }),
      flier_stuff: _conn.GLOBALS.readone({
        global: GLOBAL_flier_stuff
      }),
      timestamp: _conn.GLOBALS.readone({
        global: GLOBAL_upcoming_event
      }),
      sectors: _conn.SECTORS.read(),
      sponsors: _conn.SPONSORS.read()
    }
  });
};
exports.entry = entry;
const update_event_highlight = (req, res) => {
  let {
    event,
    images,
    video
  } = req.body;
  images = images.map(img => {
    img.url = (0, _utils.save_image)(img.url);
    return img;
  });
  let Folder = event.startsWith("seminar") ? _conn.SEMINARS : _conn.CONFERENCES;
  Folder.update(event, {
    highlights: {
      images,
      video
    }
  });
  res.json({
    ok: true,
    data: {
      _id: event,
      images
    }
  });
};
exports.update_event_highlight = update_event_highlight;
const GLOBAL_live_training = exports.GLOBAL_live_training = "live_training";
const update_live_training = (req, res) => {
  let {
    title,
    description,
    video,
    thumbnail,
    thumbnail_hash
  } = req.body;
  video = (0, _utils.save_video)(video);
  thumbnail = (0, _utils.save_image)(thumbnail);
  _conn.GLOBALS.update({
    global: GLOBAL_live_training
  }, {
    title,
    description,
    video,
    thumbnail,
    thumbnail_hash
  });
  res.json({
    ok: true,
    data: {
      video,
      thumbnail
    }
  });
};
exports.update_live_training = update_live_training;
const GLOBAL_flier_stuff = exports.GLOBAL_flier_stuff = "flier_stuffs";
const flier_stuff = (req, res) => {
  let flier_stuff_ = _conn.GLOBALS.readone({
    global: GLOBAL_flier_stuff
  });
  res.json({
    ok: true,
    message: "flier stuffs",
    data: flier_stuff_
  });
};
exports.flier_stuff = flier_stuff;
const handle_flier_stuff = (req, res) => {
  let {
    bullets,
    heading,
    text,
    image,
    video,
    image_hash
  } = req.body;
  let prior = _conn.GLOBALS.readone({
    global: GLOBAL_flier_stuff
  });
  if (!!prior) {
    if (prior.image && image && image.startsWith("data")) (0, _utils.remove_image)(prior.image);
    if (prior.video && video && video.startsWith("data")) remove_video(prior.video);
    image = (0, _utils.save_image)(image);
    video = (0, _utils.save_image)(video);
    _conn.GLOBALS.update({
      global: GLOBAL_flier_stuff
    }, {
      image,
      heading,
      text,
      image_hash,
      bullets
    });
  } else _conn.GLOBALS.write({
    image: (0, _utils.save_image)(image),
    video: (0, _utils.save_video)(video),
    image_hash,
    bullets,
    heading,
    text,
    global: GLOBAL_flier_stuff
  });
  res.json({
    ok: true,
    message: "flier stuffs",
    data: {
      image
    }
  });
};
exports.handle_flier_stuff = handle_flier_stuff;
const live_training = (req, res) => {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBAL_live_training
    })
  });
};
exports.live_training = live_training;
const GLOBAL_donation_section = exports.GLOBAL_donation_section = "donation_section";
const donation_section = (req, res) => {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBAL_donation_section
    })
  });
};
exports.donation_section = donation_section;
const update_donation_section = (req, res) => {
  let {
    title,
    text,
    image,
    image_file_hash
  } = req.body;
  image = (0, _utils.save_image)(image);
  _conn.GLOBALS.update({
    global: GLOBAL_donation_section
  }, {
    title,
    text,
    image,
    image_file_hash
  });
  res.json({
    ok: true,
    data: {
      image
    }
  });
};
exports.update_donation_section = update_donation_section;
const GLOBAL_mentorship = exports.GLOBAL_mentorship = "mentorship";
const mentorship = (req, res) => {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBAL_mentorship
    })
  });
};
exports.mentorship = mentorship;
const update_mentorship = (req, res) => {
  let {
    sections,
    title,
    image,
    image_file_hash
  } = req.body;
  image = (0, _utils.save_image)(image);
  let result = _conn.GLOBALS.update({
    global: GLOBAL_mentorship
  }, {
    title,
    sections,
    image,
    image_file_hash
  });
  res.json({
    ok: true,
    data: {
      image,
      message: !result ? "Something went wrong!" : null
    }
  });
};
exports.update_mentorship = update_mentorship;
const GLOBAL_internship = exports.GLOBAL_internship = "internship";
const internship = (req, res) => {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBAL_internship
    })
  });
};
exports.internship = internship;
const update_internship = (req, res) => {
  let {
    sections,
    title,
    image,
    image_file_hash
  } = req.body;
  image = (0, _utils.save_image)(image);
  let result = _conn.GLOBALS.update({
    global: GLOBAL_internship
  }, {
    title,
    sections,
    image,
    image_file_hash
  });
  res.json({
    ok: true,
    data: {
      image,
      message: !result ? "Something went wrong!" : null
    }
  });
};
exports.update_internship = update_internship;
const GLOBAL_sponsors = exports.GLOBAL_sponsors = "sponsors";
const sponsors_page = (req, res) => {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBAL_sponsors
    })
  });
};
exports.sponsors_page = sponsors_page;
const update_sponsors = (req, res) => {
  let {
    sections,
    title,
    image,
    image_file_hash
  } = req.body;
  image = (0, _utils.save_image)(image);
  let result = _conn.GLOBALS.update({
    global: GLOBAL_sponsors
  }, {
    title,
    sections,
    image,
    image_file_hash
  });
  res.json({
    ok: true,
    data: {
      image,
      message: !result ? "Something went wrong!" : null
    }
  });
};
exports.update_sponsors = update_sponsors;
const GLOBAL_speakers = exports.GLOBAL_speakers = "speakers";
const speakers_page = (req, res) => {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBAL_speakers
    })
  });
};
exports.speakers_page = speakers_page;
const update_speakers = (req, res) => {
  let {
    sections,
    title,
    image,
    image_file_hash
  } = req.body;
  image = (0, _utils.save_image)(image);
  let result = _conn.GLOBALS.update({
    global: GLOBAL_speakers
  }, {
    title,
    sections,
    image,
    image_file_hash
  });
  res.json({
    ok: true,
    data: {
      image,
      message: !result ? "Something went wrong!" : null
    }
  });
};
exports.update_speakers = update_speakers;
const GLOBAL_banner_stuff = exports.GLOBAL_banner_stuff = "banner_stuff";
const add_banner = (req, res) => {
  let {
    image,
    title,
    sub_text
  } = req.body;
  image = (0, _utils.save_image)(image);
  let result = _conn.GLOBALS.write({
    global: GLOBAL_banner_stuff,
    image,
    title,
    sub_text
  });
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image,
      created: result.created
    }
  });
};
exports.add_banner = add_banner;
const update_banner = (req, res) => {
  let {
    image,
    title,
    _id,
    sub_text
  } = req.body;
  image = (0, _utils.save_image)(image);
  let result = _conn.GLOBALS.update({
    _id,
    global: GLOBAL_banner_stuff
  }, {
    image,
    title,
    sub_text
  });
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image,
      created: result.created
    }
  });
};
exports.update_banner = update_banner;
const remove_banner = (req, res) => {
  let {
    banner
  } = req.params;
  console.log(banner);
  _conn.GLOBALS.remove({
    global: GLOBAL_banner_stuff,
    _id: banner
  });
  res.end();
};
exports.remove_banner = remove_banner;
const GLOBAL_logo = exports.GLOBAL_logo = "logo";
const logo_update = (req, res) => {
  let {
    logo
  } = req.body;
  if (logo && logo.startsWith("data")) {
    let prev_logo = _conn.GLOBALS.readone({
      global: GLOBAL_logo
    });
    (0, _utils.remove_image)(prev_logo.logo);
  }
  logo = (0, _utils.save_image)(logo);
  _conn.GLOBALS.update({
    global: GLOBAL_logo
  }, {
    logo
  });
  res.json({
    ok: true,
    data: {
      logo
    }
  });
};
exports.logo_update = logo_update;
const GLOBAL_upcoming_event = exports.GLOBAL_upcoming_event = "upcoming_event";
const upcoming_event = (req, res) => {
  let {
    timestamp
  } = req.body;
  _conn.GLOBALS.update({
    global: GLOBAL_upcoming_event
  }, {
    timestamp
  });
  res.json({
    ok: true
  });
};
exports.upcoming_event = upcoming_event;
const banners_et_logo = (req, res) => {
  res.json({
    ok: true,
    data: {
      banners: _conn.GLOBALS.read({
        global: GLOBAL_banner_stuff
      }),
      logo: _conn.GLOBALS.readone({
        global: GLOBAL_logo
      }),
      timestamp: _conn.GLOBALS.readone({
        global: GLOBAL_upcoming_event
      })
    }
  });
};
exports.banners_et_logo = banners_et_logo;
const update_page = (req, res) => {
  let page = req.body;
  let item = page.item;
  page.image = (0, _utils.save_image)(page.image);
  if (page._id) page = _conn.PAGES.update(page._id, page);else page = _conn.PAGES.write(page);
  _conn.gds.get_folder_by_id(item).update(item, {
    page: page._id
  });
  res.json({
    ok: true,
    data: {
      _id: page._id,
      created: page.created
    }
  });
};
exports.update_page = update_page;
const page = (req, res) => {
  let {
    item,
    page
  } = req.body;
  res.json({
    ok: true,
    data: _conn.PAGES.readone(page || {
      item
    })
  });
};
exports.page = page;
const pages = (req, res) => {
  console.log(pages);
  res.json({
    ok: true,
    data: _conn.PAGES.read(req.body)
  });
};
exports.pages = pages;