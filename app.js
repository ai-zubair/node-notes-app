const yargs = require('yargs');
const cmdValidation = require('./utils/commandValidations');
const taskCommands = require('./utils/taskCommands');

const argv = yargs.command( '<add>' , cmdValidation.addDesc , cmdValidation.addOptions )
    .command( '<list>' , cmdValidation.listDesc )
    .command( '<status>' , cmdValidation.statusDesc , cmdValidation.commonOption )
    .command( '<delete>' , cmdValidation.deleteDesc , cmdValidation.commonOption )
    .command( '<set>' , cmdValidation.setDesc , cmdValidation.setOptions )
    .help()
    .argv ;

const userInput = argv._[0];
switch(userInput){
    case 'add' :
        taskCommands.addTask(argv.title,argv.info,argv.status)
        break;
    case 'list' :
        taskCommands.getAllTasks();
        break;
    case 'status':
        taskCommands.getStatus(argv.title);
        break;
    case 'delete' :
        taskCommands.deleteTask(argv.title);
        break;
    case 'set' :
        taskCommands.setStatus(argv.title,argv.status);
        break;
    default :
        console.log('App Command not recognized!');
        break;
}