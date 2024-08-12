const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app"); // Assuming this exports the Express app
const Note = require("../model/note.model");
const { mongoUri } = require("../config/config");

describe("Note API", () => {
  beforeAll(async () => {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Note.deleteMany(); // Clear the Note collection before running tests
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("POST /api/notes", () => {
    it("should create a new note", async () => {
      const res = await request(app)
        .post("/api/notes")
        .send({ title: "Test Note", body: "This is a test note." });

      expect(res.status).toBe(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body.data).toHaveProperty("title", "Test Note");
      expect(res.body.data).toHaveProperty("body", "This is a test note.");
    });

    it("should return validation error for missing fields", async () => {
      const res = await request(app).post("/api/notes").send({ title: "" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("GET /api/notes/:id", () => {
    let noteId;

    beforeAll(async () => {
      const note = new Note({ title: "Sample Note", body: "Sample body" });
      await note.save();
      noteId = note._id.toString();
    });

    it("should fetch a note by id", async () => {
      const res = await request(app).get(`/api/notes/${noteId}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body.data).toHaveProperty("title", "Sample Note");
      expect(res.body.data).toHaveProperty("body", "Sample body");
    });

    it("should return 404 if note not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/notes/${fakeId}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "Note not found");
    });
  });

  describe("GET /api/notes", () => {
    let noteId1, noteId2;

    beforeAll(async () => {
      // Create sample notes for testing
      const note1 = new Note({ title: "Test Note 1", body: "Test body 1" });
      const note2 = new Note({ title: "Test Note 2", body: "Test body 2" });
      await note1.save();
      await note2.save();
      noteId1 = note1._id.toString();
      noteId2 = note2._id.toString();
    });

    it("should fetch notes by title", async () => {
      const res = await request(app)
        .get("/api/notes")
        .query({ title: "Test Note 1" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data[0]).toHaveProperty("title", "Test Note 1");
      expect(res.body.data[0]).toHaveProperty("body", "Test body 1");
    });

    it("should return an empty array if no notes match the title", async () => {
      const res = await request(app)
        .get("/api/notes")
        .query({ title: "Non-existent Note Title" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data).toHaveLength(0);
    });

    it("should return 400 if title query parameter is missing", async () => {
      const res = await request(app).get("/api/notes");

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty(
        "message",
        "Title query parameter is required"
      );
    });
  });

  describe("PUT /api/notes/:id", () => {
    let noteId;

    beforeAll(async () => {
      const note = new Note({
        title: "Note to Update",
        body: "Body to Update",
      });
      await note.save();
      noteId = note._id.toString();
    });

    it("should update an existing note", async () => {
      const res = await request(app)
        .put(`/api/notes/${noteId}`)
        .send({ title: "Updated Title", body: "Updated Body" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body.data).toHaveProperty("title", "Updated Title");
      expect(res.body.data).toHaveProperty("body", "Updated Body");
    });

    it("should return validation error for invalid data", async () => {
      const res = await request(app)
        .put(`/api/notes/${noteId}`)
        .send({ title: "" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 404 if note not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/api/notes/${fakeId}`)
        .send({ title: "Updated Title", body: "Updated Body" });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "Note not found");
    });
  });

  describe("DELETE /api/notes/:id", () => {
    let note;

    beforeAll(async () => {
      note = new Note({
        title: "Test Note",
        body: "This is a test note for deletion.",
      });
      await note.save();
    });

    afterAll(async () => {
      await Note.deleteMany(); // Clean up after tests
    });

    it("should delete a note by ID", async () => {
      const res = await request(app).delete(`/api/notes/${note._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty(
        "message",
        `Note with ID ${note._id} deleted`
      );

      const deletedNote = await Note.findById(note._id);
      expect(deletedNote).toBeNull();
    });

    it("should return 404 if the note does not exist", async () => {
      const fakeId = "000000000000000000000000"; // Invalid ObjectID
      const res = await request(app).delete(`/api/notes/${fakeId}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty(
        "error",
        `Note with ID ${fakeId} not found`
      );
    });
  });
});
