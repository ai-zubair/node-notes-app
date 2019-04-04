const yargs = require('yargs');
const noteUtils = require('./utils/noteUtils');

const titleOptions = {
    describe:'Title of the note',
    demand:true,
    alias:'t'
}

const bodyOptions = {
    describe:'Content of the note.',
        demand:true,
        alias:'b'
}

const addOptions = {
    title:titleOptions,
    body:bodyOptions
}

const commonOption ={
    title:titleOptions
}

const argv = yargs.command('<add>','Adds a note.',addOptions)
    .command('<list>','Lists all the saved notes.')
    .command('<read>','Reads a saved note.',commonOption)
    .command('<delete>','Deletes a saved note.',commonOption)
    .help()
    .argv ;

const inputCommand = argv._[0];
switch(inputCommand){
    case 'add' :
        noteUtils.addNote(argv.title,argv.body)
        break;
    case 'list' :
        noteUtils.getAllNotes();
        break;
    case 'read':
        noteUtils.readNote(argv.title);
        break;
    case 'delete' :
        noteUtils.deleteNote(argv.title);
        break;
    default :
        console.log('App Command not recognized!');
        break;
}