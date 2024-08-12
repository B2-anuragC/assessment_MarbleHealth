const express = require("express");
const noteController = require("../controller/note.controller");
const router = express.Router();

// Routes

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     description: Creates a new note with a title and body.
 *     requestBody:
 *       description: Note object that needs to be created.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Test Note"
 *               body:
 *                 type: string
 *                 example: "This is a test note."
 *             required:
 *               - title
 *               - body
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Test Note"
 *                     body:
 *                       type: string
 *                       example: "This is a test note."
 *       400:
 *         description: Validation error for missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Title and body are required fields."
 */
router.post("/notes", noteController.createNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Fetch a note by ID
 *     description: Retrieves a note by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the note to fetch.
 *         required: true
 *         schema:
 *           type: string
 *           example: "605c72ef2f3f4f5b21a7d1b6"
 *     responses:
 *       200:
 *         description: Note fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Sample Note"
 *                     body:
 *                       type: string
 *                       example: "Sample body"
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Note not found"
 */
router.get("/notes/:id", noteController.fetchNoteById);

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Retrieve notes by title
 *     description: Fetches a list of notes that match the provided title query parameter.
 *     parameters:
 *       - name: title
 *         in: query
 *         description: The title of the notes to search for.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved notes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64a16b49b8f7f12aebf52e1e"
 *                       title:
 *                         type: string
 *                         example: "Test Note 1"
 *                       body:
 *                         type: string
 *                         example: "Test body 1"
 *       '400':
 *         description: Bad request, missing title query parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Title query parameter is required"
 *       '404':
 *         description: No notes found with the provided title
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64a16b49b8f7f12aebf52e1e"
 *                       title:
 *                         type: string
 *                         example: "Test Note 1"
 *                       body:
 *                         type: string
 *                         example: "Test body 1"
 */
router.get("/notes", noteController.queryNotesByTitle);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update an existing note
 *     description: Updates a note by its unique ID with new title and body.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the note to update.
 *         required: true
 *         schema:
 *           type: string
 *           example: "605c72ef2f3f4f5b21a7d1b6"
 *     requestBody:
 *       description: Note object with updated information.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Title"
 *               body:
 *                 type: string
 *                 example: "Updated Body"
 *             required:
 *               - title
 *               - body
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Updated Title"
 *                     body:
 *                       type: string
 *                       example: "Updated Body"
 *       400:
 *         description: Validation error for invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Title and body are required fields."
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Note not found"
 */
router.put("/notes/:id", noteController.updateNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     description: Deletes a specific note identified by the ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the note to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Note with ID 1234567890abcdef12345678 deleted
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Note with ID 000000000000000000000000 not found
 *     security:
 *       - BearerAuth: []
 */
router.delete("/notes/:id", noteController.deleteNote);

module.exports = router;
