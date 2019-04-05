const yargs = require('yargs');
const cmdValidation = require('./utils/commandValidations');
const taskUtils = require('./utils/taskUtils');

const argv = yargs.command('<add>','Adds a task.',cmdValidation.taskAddOptions)
    .command('<list>','Lists all the saved tasks.')
    .command('<status>','Status of a saved task.',cmdValidation.commonOption)
    .command('<delete>','Deletes a saved task.',cmdValidation.commonOption)
    .command('<set>','Sets the status entry for a task.n',cmdValidation.setStatusOptions)
    .help()
    .argv ;

const userInput = argv._[0];
switch(userInput){
    case 'add' :
        taskUtils.addTask(argv.title,argv.info,argv.status)
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
    case 'set' :
        taskUtils.setStatus(argv.title,argv.status);
        break;
    default :
        console.log('App Command not recognized!');
        break;
}