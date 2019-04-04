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

const noteExists = (noteTitle) => {
    for(let savedNote of savedNotes){
        if( savedNote.title === noteTitle){
            return savedNotes.indexOf(savedNote);
        }
    }
    return -1;
}

const showNote = ( note ) => {
    console.log(`\nTitle: ${note.title}\nContent: ${note.body}\nCreated: ${note.created}\n`)
} 
const addNote = (noteTitle,noteBody) => {
    const newNote = {
        title:noteTitle,
        body:noteBody,
        created: Date()
    } 
    if(noteExists(noteTitle) < 0){
        savedNotes.push(newNote);
        saveNotes(savedNotes);
        console.log('Note added successfully');
        showNote(newNote);
    } else{
        console.log(`A note with the title ${newNote.title} already exists. Please Try With A Different Title.`)
    }
}

const getAllNotes = () => {
    if( savedNotes.length === 0 ){
        console.log('Ooops no notes found!');
        return ;
    }
    savedNotes.forEach( note => showNote(note));
}

const readNote = (noteTitle) => {
    const noteIndex = noteExists(noteTitle)
    if( noteIndex > -1 ){
        showNote(savedNotes[noteIndex]);
    } else {
        console.log(`Ooops! Note ${noteTitle} was not found!`)
    }
}

const deleteNote = (noteTitle) => {
    const noteIndex = noteExists(noteTitle);
    if( noteIndex > -1 ){
        const deletedNote = savedNotes.splice(noteIndex,1)[0];
        saveNotes(savedNotes);
        console.log('Note deleted successfully');
        showNote(deletedNote)
    } else {
        console.log(`Ooops! Note ${noteTitle} was not found!`)
    }
}

module.exports = {
    addNote,
    getAllNotes,
    readNote,
    deleteNote
}