console.log('Starting the app now!')

const fs = require('fs');
const _ = require('lodash');

const noteUtils = require('./noteUtils');

const inputCommand = process.argv[2];
switch(inputCommand){
    case 'add' :
        console.log('Adding a new note');
        break;
    case 'list' :
        console.log('Listing all notes');
        break;
    case 'edit' :
        console.log('Editing the note');
        break;
    case 'read':
        console.log('Reading the note');
        break;
    case 'delete' :
        console.log('Deleting the note');
        break;
    default :
        console.log('Command not recognized');
        break;
}