const taskUtils = require('./taskUtils');

const savedTasks = taskUtils.fetchSavedTasks();

const addTask = (taskTitle,taskInfo,initialStatus) => {
    if( (typeof taskTitle !== 'string' && typeof taskTitle !== 'number') || typeof taskInfo !== 'string' || (typeof initialStatus !== 'string' && typeof initialStatus !== 'number') ){
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

const deleteTask = (taskTitle) => {
    const taskIndex = taskUtils.taskExists(savedTasks,taskTitle);
    if( taskIndex > -1 ){
        const deletedTask = savedTasks.splice(taskIndex,1)[0];
        taskUtils.saveTasks(savedTasks);
        console.log('Task deleted successfully');
        taskUtils.showTask(deletedTask)
    } else {
        console.log(`Ooops! Task ${taskTitle} was not found!`)
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