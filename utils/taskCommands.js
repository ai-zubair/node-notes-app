const taskUtils = require('./taskUtils');

const savedTasks = taskUtils.fetchSavedTasks();

const addTask = (taskTitle,taskInfo,initialStatus) => {
    const newTask = taskUtils.createNewTask(taskTitle,taskInfo);
    if( !taskUtils.isTaskTitleValid(taskTitle) || taskInfo.length === 0 || !taskUtils.isIntialStatusValid(newTask,initialStatus) ){
        console.log('Invalid option values. Please retry.')
        return;
    }
    if( taskUtils.taskExists(savedTasks,taskTitle) < 0 ){
        savedTasks.push(newTask);
        taskUtils.appendStatusEntry(newTask,initialStatus); 
        taskUtils.saveTasks(savedTasks);
        console.log('Task added successfully');
        taskUtils.showTask(newTask);
    } else{
        console.log(`A task with the title ${taskTitle} already exists. Please Try With A Different Title.`)
    }
}

const getAllTasks = ( taskType ) => {
    if( savedTasks.length === 0 ){
        console.log('Ooops no tasks found!');
        return ;
    }
    switch( taskType ){
        case 'all':
            taskUtils.showAllTasks( savedTasks );
            break;
        case 'done':
            taskUtils.showCompletedTasks( savedTasks );
            break;
        case 'pending':
            taskUtils.showPendingTasks( savedTasks );
            break;
        default:
            console.log('Invalid options.')
    }
}

const getStatus = (taskTitle) => {
    const taskIndex = taskUtils.taskExists(savedTasks,taskTitle)
    if( taskIndex > -1 ){
        taskUtils.showStatus(savedTasks[taskIndex]);
    } else {
        console.log(`Ooops! Task ${taskTitle} was not found!`)
    }
}

const deleteTask = (taskTitle,allOption) => {
    if(allOption === true ){
        if(savedTasks.length>0){
            taskUtils.removeSavedTask( savedTasks ,0,savedTasks.length);
        }else{
            console.log(`Ooops! Looks like you have no saved tasks!`)
        }
    }else if( taskUtils.isTaskTitleValid( taskTitle)){
        const taskIndex = taskUtils.taskExists(savedTasks,taskTitle);
        if( taskIndex > -1 ){
            taskUtils.removeSavedTask( savedTasks ,taskIndex,1);
        } else {
            console.log(`Ooops! Task ${taskTitle} was not found!`);
        }
    }else{
        console.log(`Invalid command options. Please refer to the documentation @  https://github.com/ai-zubair/todo-app `)
    }
}

const setStatus = ( taskTitle , taskStatus ) => {
    const taskIndex = taskUtils.taskExists(savedTasks,taskTitle);
    if( taskIndex > -1 ){
        taskUtils.appendStatusEntry(savedTasks[taskIndex],taskStatus);
        taskUtils.saveTasks(savedTasks);
    } else {
        console.log(`Ooops! Task ${taskTitle} does not exist!`)
    }
}

module.exports = {
    addTask,
    getAllTasks,
    getStatus,
    deleteTask,
    setStatus
}