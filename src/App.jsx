// importing files

import { useState, useEffect } from 'react';
// Axios ek js library hai jo browser aur Node.js environment mein HTTP requests ko bhejne aur responses ko handle karne mein use hoti hai.
//Axios primarily client-side (browser) mein kaam karta hai jabki Express server-side (Node.js) environment me
//Axios se aap server se data retrieve kar sakte hain client-side par, 
//jabki Express se aap server-side logic execute kar sakte hain jaise ki database se data retrieve karna, usko process karna, aur client ko response bhejna.


import axios from 'axios';
import './App.css';
import Note from './Note';

//API_url for getting data from server.js
const API_URL = 'http://localhost:5000/notes';


//main App() function
function App() {
  //useStates for different functionalities
  const [count, setCount] = useState(0); //store count of notes
  const [title, setTitle] = useState(""); //title entered
  const [note, setNote] = useState(""); //note description entered
  const [color, setColor] = useState("#ffffff"); //color selected
  const [editingIndex, setEditingIndex] = useState(null);  //which note is editing 
  const [filterColor, setFilterColor] = useState(""); //setting filter based on color
  const [listobj, setListobj] = useState([]); //list of notes

  // useEffect for reloading for first time []
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setListobj(response.data); //adding data in list
        setCount(response.data.length); //updating count
      })
      .catch(error => console.error("Error fetching notes:", error));
  }, []);

  // function for adding Note

  function handleAddNote() {
    //checking if title and note is not empty
    if (title.trim() === "" || note.trim() === "") {
      alert("Please enter both a title and a note.");
      return;
    }
     // create a newNote
    const newNote = { title, description: note, color };

    if (editingIndex !== null) {
      axios.put(`${API_URL}/${editingIndex}`, newNote)
        .then(response => {
          const updatedList = listobj.map((item) =>
            item._id === editingIndex ? response.data : item
          );
          setListobj(updatedList);
          setEditingIndex(null);
        })
        .catch(error => console.error("Error updating note:", error));
    } else {
      axios.post(API_URL, newNote)
        .then(response => {
          setListobj([...listobj, response.data]);
        })
        .catch(error => console.error("Error adding note:", error));
    }

    setCount(listobj.length + 1);
    setTitle("");
    setNote("");
    setColor("#ffffff");
  }

  function handleDeleteNote(id) {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        const updatedList = listobj.filter(item => item._id !== id);
        setListobj(updatedList);
        setCount(updatedList.length);
      })
      .catch(error => console.error("Error deleting note:", error));
  }
  //for editing and updating note
  //_id MongoDB mein har document ka unique identifier hota hai jo React application mein har note ko uniquely identify karne ke liye use hota hai.
  function handleEditNote(id) {
    const noteToEdit = listobj.find(item => item._id === id);
    setTitle(noteToEdit.title);
    setNote(noteToEdit.description);
    setColor(noteToEdit.color);
    setEditingIndex(id);
  }
   //filtered notes based on color
  const filteredNotes = filterColor
    ? listobj.filter((note) => note.color === filterColor)
    : listobj;
  //Color Options 
  const colorOptions = [
    "#cfbaf0", "#90dbf4", "#8eecf5", "#b9fbc0", "#fdffb6", "#ffcfd2", "#FFCFE4"
  ];
   // returning html 
  return (
    <>
      <h1>React-based Notes Application</h1> 
      <h4>You have currently, {count} notes</h4>
      <div id='container'>
        <div className='ip'>
          <label htmlFor="title"><h3>Title:</h3></label>
          <input
            type='text'
            id="title"
            placeholder='Add Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='ip'>
          <label htmlFor="note"><h3>Note:</h3></label>
          <input
            type='textarea'
            id="note"
            placeholder='Add Description'
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className='ip'>
          <div className="color-options">
            {colorOptions.map((colorOption) => (
              <label key={colorOption} style={{ backgroundColor: colorOption }} className="color-circle"
              id={color === colorOption ? "selected" : ""}>
                <input
                  type="radio"
                  name="color"
                  value={colorOption}
                  checked={color === colorOption}
                  onChange={() => setColor(colorOption)}
                />
                <span  style={{ backgroundColor: colorOption }}></span>
              </label>
            ))}
          </div>
        </div>
        <button className='button' onClick={handleAddNote}>
          {editingIndex !== null ? "Update Note" : "Create New"}
        </button>
      </div>
      <div className='filter'>
        <h3>Filter by color:</h3>
        <div className="color-options">
          <label>
            <input
              type="radio"
              name="filterColor"
              value=""
              checked={filterColor === ""}
              onChange={() => setFilterColor("")}
            />
            <span className="color-circle"  style={{ backgroundColor: '#ffffff' }} id={filterColor === "" ? "selectall" : "all"}>All</span>
          </label>
          {colorOptions.map((colorOption) => (
            <label key={colorOption} style={{ backgroundColor: colorOption }} className="color-circle" id={filterColor === colorOption ? "selected" : ""}>
              <input
                type="radio"
                name="filterColor"
                value={colorOption}
                checked={filterColor === colorOption}
                onChange={() => setFilterColor(colorOption)}
              />
              <span  style={{ backgroundColor: colorOption }}></span>
            </label>
          ))}
        </div>
      </div>
      <div className='cardcontainer'>
        {filteredNotes.map((item, index) => (
          <Note
            key={index}
            title={item.title}
            description={item.description}
            color={item.color}
            onDelete={() => handleDeleteNote(item._id)}
            onEdit={() => handleEditNote(item._id)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
