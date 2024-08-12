const Note = require("../model/note.model");

const createNote = async (data) => {
  const note = new Note(data);
  return await note.save();
};

const fetchNoteById = async (id) => {
  return await Note.findById(id);
};

const queryNotesByTitle = async (title) => {
  return await Note.find({ title: { $regex: title, $options: "i" } });
};

const updateNote = async (id, data) => {
  return await Note.findByIdAndUpdate(
    id,
    {
      title: data.title,
      body: data.body,
      updated_at: Date.now(),
    },
    { new: true }
  );
};

const deleteNoteById = async (id) => {
  return await Note.findByIdAndDelete(id);
};

module.exports = {
  createNote,
  fetchNoteById,
  queryNotesByTitle,
  updateNote,
  deleteNoteById,
};
