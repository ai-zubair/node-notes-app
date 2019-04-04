const fs=require('fs');

const savedNotes = fetchSavedNotes();

function fetchSavedNotes(){
    var notes=[];
    try{
        notes=JSON.parse(fs.readFileSync('note-data.json'));
    } catch(err){
        return notes; 
    }
    return notes;  
}

const saveNotes = (newNotes) => {
    fs.writeFileSync('note-data.json',JSON.stringify(newNotes));
}

const noteExists = (savedNotes,newNoteTitle) => {
    for(let savedNote of savedNotes){
        if( savedNote.title === newNoteTitle){
            return savedNotes.indexOf(savedNote);
        }
    }
    return -1;
}

const showNote = ( note ) => {
    console.log(`\nTitle: ${note.title}\nBody: ${note.body}\n`)
} 
const addNote = (noteTitle,noteBody) => {
    const newNote = {
        title:noteTitle,
        body:noteBody
    } 
    if(noteExists(savedNotes,noteTitle) < 0){
        savedNotes.push(newNote);
        saveNotes(savedNotes);
        console.log('Note added successfully');
        showNote(newNote);
    } else{
        console.log(`A note with the title ${newNote.title} already exists. Please Try With A Different Title.`)
    }
}

const getAllNotes = () => {
    console.log('Getting all of the saved notes');
}

const readNote = (title) => {
    console.log('Reading the note ',title,' now');
}

const deleteNote = (title) => {
    const noteIndex = noteExists(savedNotes,title);
    if( noteIndex > -1 ){
        const deletedNote = savedNotes.splice(noteIndex,1)[0];
        saveNotes(savedNotes);
        console.log('Note deleted successfully');
        showNote(deletedNote)
    } else {
        console.log(`Ooops! Note ${title} was not found!`)
    }
}

module.exports = {
    addNote,
    getAllNotes,
    readNote,
    deleteNote
}