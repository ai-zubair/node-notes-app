const yargs = require('yargs');
const taskUtils = require('./utils/taskUtils');

const taskTitleOptions = {
    describe:'Title of the Task',
    demand:true,
    alias:'t'
}

const taskInfoOptions = {
    describe:'Content of the Task.',
    demand:true,
    alias:'i'
}

const taskAddOptions = {
    title:taskTitleOptions,
    info:taskInfoOptions
}

const commonTaskOption ={
    title:taskTitleOptions
}

const argv = yargs.command('<add>','Adds a task.',taskAddOptions)
    .command('<list>','Lists all the saved tasks.')
    .command('<status>','Status of a saved task.',commonTaskOption)
    .command('<delete>','Deletes a saved task.',commonTaskOption)
    .help()
    .argv ;

const userInput = argv._[0];
switch(userInput){
    case 'add' :
        taskUtils.addTask(argv.title,argv.info)
        break;
    case 'list' :
        taskUtils.getAllTasks();
        break;
    case 'status':
        taskUtils.getTask(argv.title);
        break;
    case 'delete' :
        taskUtils.deleteTask(argv.title);
        break;
    default :
        console.log('App Command not recognized!');
        break;
}