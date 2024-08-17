import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []; // Initialize with an empty array
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    try {
      // API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'), // Corrected token retrieval
        },
      });
      const json = await response
        .json();
        
      if (Array.isArray(json)) {
        setNotes(json); // Set notes only if it's an array
      } else {
        setNotes([]); // Fallback to an empty array if the response is not an array
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    try {
      // API Call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'), // Corrected token retrieval
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json();
      setNotes([...notes, note]); // Use spread operator to add the new note
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      // API Call
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'), // Corrected token retrieval
        },
      });

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      // API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'), // Corrected token retrieval
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();

      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      );

      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
