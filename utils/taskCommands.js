const taskUtils = require('./taskUtils');

const savedTasks = taskUtils.fetchSavedTasks();

const addTask = (taskTitle,taskInfo,initialStatus) => {
    if( taskTitle.length === 0 || taskInfo.length === 0 || (typeof initialStatus !== 'string' && typeof initialStatus !== 'number') ){
        console.log('Invalid option values. Please retry.')
        return;
    }
    if( taskUtils.taskExists(savedTasks,taskTitle) < 0 ){
        const newTask = taskUtils.createNewTask(taskTitle,taskInfo);
        const isInitialStatusValid = taskUtils.isIntialStatusValid(newTask,initialStatus);
        if( !isInitialStatusValid ) {
            console.log('Invalid initial status of the task. Please retry or check the documentation @ https://github.com/ai-zubair/todo-app ');
            return;
        }
        savedTasks.push(newTask);
        taskUtils.appendStatusEntry(newTask,initialStatus); 
        taskUtils.saveTasks(savedTasks);
        console.log('Task added successfully');
        taskUtils.showTask(newTask);
    } else{
        console.log(`A task with the title ${taskTitle} already exists. Please Try With A Different Title.`)
    }
}

const getAllTasks = () => {
    if( savedTasks.length === 0 ){
        console.log('Ooops no tasks found!');
        return ;
    }
    savedTasks.forEach( task => taskUtils.showTask(task));
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
    }else if(typeof taskTitle !== 'undefined' ){
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