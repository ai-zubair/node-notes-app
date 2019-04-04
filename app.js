const yargs = require('yargs');
const taskUtils = require('./utils/taskUtils');

const titleOptions = {
    describe:'Title of the Task',
    demand:true,
    alias:'t'
}

const bodyOptions = {
    describe:'Content of the Task.',
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

const argv = yargs.command('<add>','Adds a task.',addOptions)
    .command('<list>','Lists all the saved tasks.')
    .command('<status>','Status of a saved task.',commonOption)
    .command('<delete>','Deletes a saved task.',commonOption)
    .help()
    .argv ;

const inputCommand = argv._[0];
switch(inputCommand){
    case 'add' :
        taskUtils.addTask(argv.title,argv.body)
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