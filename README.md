# Notes Application

A full-stack notes application that works offline on a local machine using MongoDB and Express.js for the backend and React for the frontend.

## Features

- **Add Notes**: Create new notes with a title, description, and color.
- **Edit Notes**: Update existing notes.
- **Delete Notes**: Remove notes.
- **Filter Notes**: Filter notes by color.
- **Offline Functionality**: The application works offline when running locally.

## Functionality

- **Backend**: Built with Express.js and MongoDB, the backend handles CRUD operations for notes.
- **Frontend**: Built with React, the frontend allows users to interact with notes, including adding, editing, deleting, and filtering notes.
- **Local Storage**: Data is stored in a MongoDB database running locally.

## Specifications

- **Backend**:
  - **Framework**: Express.js
  - **Database**: MongoDB
  - **API Endpoints**:
    - `GET /notes`: Fetch all notes.
    - `POST /notes`: Create a new note.
    - `PUT /notes/:id`: Update an existing note.
    - `DELETE /notes/:id`: Delete a note.
- **Frontend**:
  - **Library**: React
  - **State Management**: useState, useEffect
  - **HTTP Client**: Axios

## Installation and Usage

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **MongoDB**: Ensure you have MongoDB installed and running on your local machine. You can download it from [here](https://www.mongodb.com/try/download/community).

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Asthanaji05/NotesFullStack.git
   cd NotesFullStack/notes-backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Start the MongoDB server:
   ```bash
   mongod
   ```

4. Start the backend server:
   ```bash
   node server.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../src
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Accessing the Application

1. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

2. You should now see the Notes Application running locally.

## Usage

- **Add a Note**: Fill in the title, description, select a color, and click "Create New".
- **Edit a Note**: Click the edit button on an existing note, modify the fields, and click "Update Note".
- **Delete a Note**: Click the delete button on an existing note.
- **Filter Notes**: Use the color filter to view notes by color.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.


