const fs=require('fs');
const statusValidation = require('./statusValidations');

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
    fs.writeFileSync('task-data.json',JSON.stringify(newTasks));
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
    console.log(`\nTitle: ${task.title}\nInfo: ${task.info}\nCurrent Status: ${task.status[task.status.length-1].value+taskEntrySuffix(task.status[task.status.length-1].value)}\nCreated: ${task.created}\n`)
}

const taskExists = (savedTasks,taskTitle) => {
    for(let savedTask of savedTasks){
        if( savedTask.title === taskTitle){
            return savedTasks.indexOf(savedTask);
        }
    }
    return -1;
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

const appendStatusEntry = ( task , taskStatusEntry) => {
    const isTaskStatusValid = statusValidation.validateTaskStatus(task,taskStatusEntry);
    if( isTaskStatusValid ) {
        const statusEntry = newStatusEntry(taskStatusEntry);
        task.status.push(statusEntry);
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
    taskExists,
    showStatus,
    isIntialStatusValid,
    appendStatusEntry
}