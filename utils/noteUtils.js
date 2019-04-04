const fs=require('fs');

const fetchSavedNotes = () => {
    var notes=[];
    try{
        notes=JSON.parse(fs.readFileSync('note-data.json'));
    } catch(err){
        console.log('No previous notes found! Adding the first note!');
        return notes; 
    }
    return notes;  
}

const saveNotes = (notes) => {
    fs.writeFileSync('note-data.json',JSON.stringify(notes));
    console.log('Note added succesfully!')
}

const isDuplicateNote = (notes,newNote) => {
    for(let savedNote of notes){
        if( savedNote.title === newNote.title){
            return true;
        }
    }
    return false;
}

const showNote = ( note ) => {
    console.log(`\nTitle: ${note.title}\nBody: ${note.body}\n`)
} 
const addNote = (title,body) => {
    const newNote = {
        title,
        body
    }
    const savedNotes = fetchSavedNotes(); 
    if(!isDuplicateNote(savedNotes,newNote)){
        savedNotes.push(newNote);
        saveNotes(savedNotes);
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
    console.log('Deleting the note ',title);
}

module.exports = {
    addNote,
    getAllNotes,
    readNote,
    deleteNote
}