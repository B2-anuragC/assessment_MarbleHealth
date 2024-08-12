const noteService = require("../service/note.service");
const { sendSuccess, sendError } = require("../config/utils");
const {
  createNoteSchema,
  updateNoteSchema,
} = require("../validation/note.validate");
const logger = require("../config/logger");

const createNote = async (req, res) => {
  try {
    const { error } = createNoteSchema.validate(req.body);
    if (error) return sendError(res, error, "Invalid data");

    const note = await noteService.createNote(req.body);

    logger.info("Note created successfully");
    sendSuccess(res, note, "Note created successfully", 201);
  } catch (err) {
    logger.error(`Failed to fetch note: ${err.message}`);
    sendError(res, err, "Failed to create note");
  }
};

const fetchNoteById = async (req, res) => {
  try {
    const note = await noteService.fetchNoteById(req.params.id);
    if (!note) return sendError(res, "Note not found", "Note not found", 404);

    logger.info("Note responded by id");
    sendSuccess(res, note);
  } catch (err) {
    logger.error(`Failed to fetch note: ${err.message}`);
    sendError(res, err, "Failed to fetch note");
  }
};

const queryNotesByTitle = async (req, res) => {
  try {
    if (!req.query.title) {
      return sendError(
        res,
        "Title query parameter is required",
        "Title query parameter is required",
        400
      );
    }

    const notes = await noteService.queryNotesByTitle(req.query.title);

    logger.info("Note responded by title");

    sendSuccess(res, notes);
  } catch (err) {
    logger.error(`Failed to query notes: ${err.message}`);
    sendError(res, err, "Failed to query notes");
  }
};

const updateNote = async (req, res) => {
  try {
    const { error } = updateNoteSchema.validate(req.body);
    if (error) return sendError(res, error, "Invalid data");

    const note = await noteService.updateNote(req.params.id, req.body);
    if (!note) return sendError(res, "Note not found", "Note not found", 404);
    sendSuccess(res, note, "Note updated successfully");
  } catch (err) {
    logger.error(`Failed to update note: ${err.message}`);
    sendError(res, err, "Failed to update note");
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await noteService.deleteNoteById(id);

    if (!deletedNote) {
      const message = `Note with ID ${id} not found`;
      logger.warn(message);
      return sendError(res, message, message, 404);
    }

    logger.info(`Note with ID ${id} deleted`);
    sendSuccess(res, true, `Note with ID ${id} deleted`);
  } catch (err) {
    logger.error(`Error deleting note: ${err.message}`);
    sendError(res, err, "Failed to delete note");
  }
};

module.exports = {
  createNote,
  fetchNoteById,
  queryNotesByTitle,
  updateNote,
  deleteNote,
};
