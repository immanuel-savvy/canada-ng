import { GALLERY } from "../ds/conn";
import { save_video, remove_image, remove_video, save_image } from "./utils";

const new_media = (req, res) => {
  let { image, video, description, title, image_hash } = req.body;

  if (video) video = save_video(video);

  image = save_image(image);

  let result = GALLERY.write({ video, image, image_hash, title, description });

  res.json({
    ok: true,
    data: { video, image, _id: result._id, created: result.created },
  });
};

const remove_media = (req, res) => {
  let { media } = req.params;

  GALLERY.remove(media);

  res.end();
};

const fetch_media = (req, res) => {
  let { skip, limit, total_media } = req.body;

  let media = GALLERY.read(null, { limit, skip });

  if (total_media)
    media = { gallery: media, total_media: GALLERY.config.total_entries };

  res.json({ ok: true, message: "media fetched", data: media });
};

const update_media = (req, res) => {
  let { _id, title, description, image, video, image_hash } = req.body;

  let media = GALLERY.readone(_id);
  if (image.startsWith("data")) remove_image(media.image);
  if (video && video.startsWith("data")) remove_video(media.video);

  image = save_image(image);
  video = save_image(video);

  GALLERY.update(_id, { title, description, image, video, image_hash });

  res.json({
    ok: true,
    message: "media updated",
    data: { _id, image, title, description, video, created: media.created },
  });
};

export { new_media, remove_media, fetch_media, update_media };
