const addNote = (title,body) => {
    console.log('Adding the note',title,body);
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
module.exports={
    addNote,
    getAllNotes,
    readNote,
    deleteNote
}