# Note Management API

## Project Overview

The Note Management API is a RESTful service designed to manage notes with CRUD (Create, Read, Update, Delete) operations. This API allows users to create, retrieve, update, and delete notes. It is built using Node.js and Express, and it connects to a MongoDB database for data storage.

## Prerequisites

- Node.js (v18 or higher)
- npm (v6 or higher)
- MongoDB instance

## Installation

1.  **Clone the Repository**

        git clone <repository-url>
        cd <project-directory>

2.  **Install Dependencies**

    Install the necessary dependencies using npm:

        npm install

## Environment Setup

1.  **Create a \`.env\` File**

    In the root directory of your project, create a file named \`.env\` with the following content:

        MONGODB_URL=mongodb://localhost:27017/notes

    Replace `mongodb://localhost:27017/notes` with your MongoDB connection string if it's different.

## Running the Server

To start the server, use the following command:

    npm start

The server will start and listen on the port specified in your application configuration (default is `3000`).

## Running Tests

To run the tests, use the following command:

    npm test

This will execute the test suite using Jest and Supertest to ensure that the API endpoints are functioning correctly.

## API Endpoints

### POST `/api/notes`

**Description:** Creates a new note.

**Request Body:**

    {
        "title": "Note Title",
        "body": "Note body content."
    }

**Responses:**

- `201 Created` – Successfully created a note.
- `400 Bad Request` – Validation error for missing or invalid fields.

### GET `/api/notes/:id`

**Description:** Fetches a note by its ID.

**Responses:**

- `200 OK` – Successfully retrieved the note.
- `404 Not Found` – Note with the specified ID does not exist.

### GET `/api/notes`

**Description:** Fetches notes by title or retrieves all notes if no title is provided.

**Query Parameters:**

- `title` (optional) – Title of the notes to filter by.

**Responses:**

- `200 OK` – Successfully retrieved the notes.
- `400 Bad Request` – Missing `title` query parameter when required.

### PUT `/api/notes/:id`

**Description:** Updates an existing note by ID.

**Request Body:**

    {
        "title": "Updated Title",
        "body": "Updated body content."
    }

**Responses:**

- `200 OK` – Successfully updated the note.
- `400 Bad Request` – Validation error for invalid data.
- `404 Not Found` – Note with the specified ID does not exist.

### DELETE `/api/notes/:id`

**Description:** Deletes a note by its ID.

**Responses:**

- `200 OK` – Successfully deleted the note.
- `404 Not Found` – Note with the specified ID does not exist.
