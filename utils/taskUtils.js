const fs=require('fs');
const statusValidation = require('./statusValidations');

//constants section begins
const userName = process.env.USER ;
//constants sections ends

//task  utilities begin
const createNewTask = (taskTitle,taskInfo) => {
    return {
            title:taskTitle,
            info:taskInfo,
            created: Date(),
            status:[]
    }
}

const saveTasks = (newTasks) => {
    fs.writeFileSync('task-data.json',JSON.stringify(newTasks,undefined,2));
}

const fetchSavedTasks = () => {
    var tasks=[];
    try{
        tasks=JSON.parse(fs.readFileSync('task-data.json'));
    } catch(err){
        return tasks; 
    }
    return tasks;  
}

const showTask = ( task ) => {
    console.log(`\nTitle: ${task.title}\nInfo: ${task.info}\nCurrent Status: ${currentStatus(task)+taskEntrySuffix(currentStatus(task))}\nCreated: ${task.created}\n`)
}

const isTaskTitleValid = ( taskTitle ) => taskTitle && taskTitle.length > 0 ; 

const taskExists = (savedTasks,taskTitle) => {
    for(let savedTask of savedTasks){
        if( savedTask.title === taskTitle){
            return savedTasks.indexOf(savedTask);
        }
    }
    return -1;
}

const removeSavedTask = ( savedTasks, taskIndex ,count ) => {
    const deletedTask = savedTasks.splice(taskIndex,count);
    console.log('Task(s) deleted successfully.');
    deletedTask.forEach(( task )=>showTask( task ));
    saveTasks(savedTasks);
}
//task utilities end

//status utilites begin
const newStatusEntry = ( taskEntry ) => {
    return {
        value : taskEntry,
        time : Date()
    }
}

const taskEntrySuffix = ( statusEntryValue ) => {
    if(typeof(statusEntryValue)==='number'){
        return '%'
    }
    return '';
}

const showStatus = ( task ) => {
    for( let statusEntry of task.status ){
        console.log(`\nStatus: ${statusEntry.value+taskEntrySuffix(statusEntry.value)}\nTime: ${statusEntry.time}\n`);
    }
} 

const isIntialStatusValid = ( task,taskStatusEntry ) => {
    return statusValidation.validateTaskStatus(task,taskStatusEntry);
}

const currentStatus = ( task ) => {
    if(task.status.length >0){
        return task.status[task.status.length-1].value;
    }
}

const appendStatusEntry = ( task , taskStatusEntry) => {
    if( currentStatus(task) === "Done" || currentStatus(task) === 100 ){
        console.log(`The task ${task.title} has already been completed!`);
        return;
    }
    const isTaskStatusValid = statusValidation.validateTaskStatus(task,taskStatusEntry);
    if( isTaskStatusValid ) {
        const statusEntry = newStatusEntry(taskStatusEntry);
        task.status.push(statusEntry);
        if( taskStatusEntry === 100 || taskStatusEntry === "Done"){
            console.log(`Congrats ${userName}! You've successfully completed ${task.title}!`);
            showTask(task)
        }
    } else {
        console.log('Invalid Status Entry!')
    }
}
//status utilities end

module.exports = {
    createNewTask,
    saveTasks,
    fetchSavedTasks,
    showTask,
    removeSavedTask,
    isTaskTitleValid,
    taskExists,
    showStatus,
    isIntialStatusValid,
    appendStatusEntry
}