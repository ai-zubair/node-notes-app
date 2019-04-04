const fs=require('fs');

const addNote = (title,body) => {
    const newNote = {
        title,
        body
    }
    var notes = [];
    try{
        notes=JSON.parse(fs.readFileSync('note-data.json'));
        for(let savedNote of notes){
            if( savedNote.title === title){
                console.log(`A note with the title ${newNote.title} already exists. Please Try With A Different Title.`)
                return false;
            }
        }
    } catch(err){
        console.log('Creating your first ever note!')
    }
    notes.push(newNote);
    fs.writeFileSync('note-data.json',JSON.stringify(notes));
    return true;
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