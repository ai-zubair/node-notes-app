const yargs = require('yargs');
const cmdValidation = require('./utils/commandValidations');
const taskCommands = require('./utils/taskCommands');

const argv = yargs.command( '<add>' , cmdValidation.addDesc , cmdValidation.addOptions )
    .command( '<list>' , cmdValidation.listDesc, cmdValidation.listOptions )
    .command( '<status>' , cmdValidation.statusDesc , cmdValidation.commonOption )
    .command( '<delete>' , cmdValidation.deleteDesc , cmdValidation.deleteOptions )
    .command( '<set>' , cmdValidation.setDesc , cmdValidation.setOptions )
    .command( '<stats>' , cmdValidation.statDesc )
    .help()
    .argv ;

const userInput = argv._[0];
switch(userInput){
    case 'add' :
        taskCommands.addTask(argv.title,argv.info,argv.status)
        break;
    case 'list' :
        taskCommands.getAllTasks(argv.type);
        break;
    case 'status':
        taskCommands.getStatus(argv.title);
        break;
    case 'delete' :
        taskCommands.deleteTask(argv.title,argv.all);
        break;
    case 'set' :
        taskCommands.setStatus(argv.title,argv.status);
        break;
    case 'stats' :
        taskCommands.showStats();
        break;
    default :
        console.log('App Command not recognized!');
        break;
}