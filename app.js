const yargs = require('yargs');
const cmdValidation = require('./utils/commandValidations');
const taskUtils = require('./utils/taskUtils');

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