import { PARTICIPATIONS } from "../ds/conn";

const add_participate = (req, res) => {
  let result = PARTICIPATIONS.write(req.body);

  res.json({ ok: true, data: { _id: result._id, created: result.created } });
};

const update_participate = (req, res) => {
  let details = req.body;

  PARTICIPATIONS.update(details._id, { ...details });

  res.json({ ok: true, data: details });
};

const participations = (req, res) => {
  res.json({ ok: true, data: PARTICIPATIONS.read() });
};

export { add_participate, participations, update_participate };
