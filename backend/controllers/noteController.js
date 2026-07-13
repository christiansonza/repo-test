import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });

  res.json(notes);
};

export const getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  res.json(note);
};

export const createNote = async (req, res) => {
  const { title } = req.body;

  const note = await Note.create({
    title,
  });

  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  note.title = req.body.title;

  await note.save();

  res.json(note);
};

export const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  await note.deleteOne();

  res.json({
    message: "Note deleted",
  });
};