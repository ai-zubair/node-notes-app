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

const taskStatusOptions = {
    describe:'Current status of the task',
    demand:true,
    alias:'s'
}

const taskAddOptions = {
    title:taskTitleOptions,
    info:taskInfoOptions,
    currStatus:taskStatusOptions
}

const commonTaskOption ={
    title:taskTitleOptions,
}

const setStatusOptions = {
    title : taskTitleOptions,
    status : taskStatusOptions
}

const argv = yargs.command('<add>','Adds a task.',taskAddOptions)
    .command('<list>','Lists all the saved tasks.')
    .command('<status>','Status of a saved task.',commonTaskOption)
    .command('<delete>','Deletes a saved task.',commonTaskOption)
    .command('<setStatus>','Sets the status entry for a task',setStatusOptions)
    .help()
    .argv ;

const userInput = argv._[0];
switch(userInput){
    case 'add' :
        taskUtils.addTask(argv.title,argv.info,argv.currStatus)
        break;
    case 'list' :
        taskUtils.getAllTasks();
        break;
    case 'status':
        taskUtils.getStatus(argv.title);
        break;
    case 'delete' :
        taskUtils.deleteTask(argv.title);
        break;
    case 'setStatus' :
        taskUtils.setStatus(argv.title,argv.status);
        break;
    default :
        console.log('App Command not recognized!');
        break;
}