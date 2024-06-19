//importing as Javascript ES modules
//Express ek minimalist web framework hai jo Node.js ke upar build kiya gaya hai
// aur HTTP requests ko handle karne ke liye use hota hai. Express aapko web applications
// aur APIs banane mein madad karta hai aur complex server-side applications ko manage karna asaan banata hai.
import express, { json } from 'express';
//Mongoose is a js library for MongoDb which allows to create Schema, Model and connect to it
import { connect, Schema, model } from 'mongoose';
import cors from 'cors';


//Creates an instance of an Express application
//Holds this instance for further use in defining routes, middleware, etc.
const app = express();
const port = 5000;


//Purpose: Yeh line Cross-Origin Resource Sharing (CORS) ko enable karti hai.
//Usage: Yeh dusre origins (domains) se aapke server pe aane wale requests ko allow karne ke liye hota hai.
//Library: cors ek middleware hai jo Express applications ke liye CORS ko enable karta hai.
app.use(cors());

// Purpose: Yeh line incoming JSON payloads ko automatically parse kar deti hai.
// Usage: Yeh middleware aapko incoming request bodies ko JSON format mein directly access karne ki suvidha deta hai.
// Library: express.json() ek built-in middleware function hai jo Express v4.16.0 ke baad available hai.
app.use(json());

//Purpose: Establishes a connection to the MongoDB database named notesApp on the local machine.
//Mongoose ek ODM (Object Data Modeling) library hai jo MongoDB ke liye use hoti hai.
connect('mongodb://localhost:27017/notesApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//chemas: Define karne ki suvidha deta hai jo collections ke structure ko enforce karte hain.
//Models: Schemas se models banakar database operations perform karne ki suvidha milti hai.

//Define Schema
const noteSchema = new Schema({
  title: String,
  description: String,
  color: String
});

//creating a model
const Note = model('Note', noteSchema);


//Route to get all notes or handle GET requests
//req --> request
//res --> response
app.get('/notes', async (req, res) => {
  try {
    //query to fetch all notes i.e. all of model Note
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).send(error);
  }
});


//Express mein ek route define karta hai jo client se POST request ke through aane wale data ko MongoDB database mein save karta ha
app.post('/notes', async (req, res) => {
  //Request body se title, description, aur color fields ko extract kiya gaya hai
  const { title, description, color } = req.body;
  //create a new instance of Note 
  const newNote = new Note({
    title,
    description,
    color
  });

  try {
    //save data
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).send(error);
  }
});
//update
app.put('/notes/:id', async (req, res) => {
  const { title, description, color } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id, //URL se note ID extract kiya jata hai
      { title, description, color }, //updated data
      { new: true } // Return updated document , false will give doc before updation
    );
    res.json(updatedNote);
  } catch (error) {
    res.status(500).send(error);
  }
});
//delete
app.delete('/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);  
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
