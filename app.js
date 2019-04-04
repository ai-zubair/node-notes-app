console.log('Starting the app now!')

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const noteUtils = require('./utils/noteUtils');

const argv = yargs.argv ;

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
        console.log('Command not recognized');
        break;
}