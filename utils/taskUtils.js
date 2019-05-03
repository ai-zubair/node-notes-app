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
            created: Date.now(),
            status:[],
            completionTime : null
    }
}

const saveTasks = (newTasks) => {
    fs.writeFileSync('task-data.json',JSON.stringify(newTasks,undefined,2));
}

const displayDateTime = ( timestamp )=>{
    const date = new Date(timestamp);
    return date.toString();
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
    console.log(`\nTitle: ${task.title}\nInfo: ${task.info}\nCurrent Status: ${currentStatus(task)+taskEntrySuffix(currentStatus(task))}\nCreated: ${displayDateTime(task.created)}\n`);
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

const showAllTasks = ( savedTasks ) => {
    savedTasks.forEach((task)=>showTask(task));
}

const findCompletedTasks = ( savedTasks ) => {
    const completedTasks = savedTasks.filter((task)=>{
        return ( currentStatus(task) === 'Done' ) || ( currentStatus(task) === 100 );
    })
    return completedTasks;
}

const showCompletedTasks = ( savedTasks ) => {
    const completedTasks = findCompletedTasks( savedTasks );
    if(completedTasks.length>0){
        showAllTasks(completedTasks);
    }else{
        console.log(`Uh! Oh! ${userName} you haven't completed any tasks yet.`)
    }
}

const findPendingTasks = ( savedTasks ) => {
    const pendingTasks = savedTasks.filter((task)=>{
        return !( currentStatus(task) === 'Done' ) && !( currentStatus(task) === 100 );
    })
    return pendingTasks;
}

const showPendingTasks = ( savedTasks ) => {
    const pendingTasks = findPendingTasks( savedTasks );
    if(pendingTasks.length>0){
        showAllTasks(pendingTasks);
    }else{
        console.log(`My! My! ${userName} you have completed all the tasks.`)
    }
}

const calculateTime = (timeDifference)=>{
    const days = Math.floor(timeDifference/1000/60/60/24);
    timeDifference -= days*1000*60*60*24;
    const hours = Math.floor(timeDifference/1000/60/60);
    timeDifference -= hours*1000*60*60;
    const minutes = Math.floor(timeDifference/1000/60);
    return {
        days,
        hours,
        minutes
    }
}

const getCompletedTaskMessage = (task)=>{
    const completionTime = calculateTime(task.completionTime);
    const minuteString = completionTime.minutes ? ` ${completionTime.minutes} minutes` : ''; 
    const hourString = completionTime.hours ? ` ${completionTime.hours} hours` : ''; 
    const dayString = completionTime.days ? ` ${completionTime.days} days` : '';
    if(minuteString === '' && hourString === '' && dayString === ''){
        return `Congrats ${userName}! You've successfully completed ${task.title}!`;
    }
    return `Congrats ${userName}! You've successfully completed ${task.title} in${dayString}${hourString}${minuteString}!`; 
}
//task utilities end

//status utilites begin
const newStatusEntry = ( taskEntry ) => {
    return {
        value : taskEntry,
        time : Date.now()
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
        console.log(`\nStatus: ${statusEntry.value+taskEntrySuffix(statusEntry.value)}\nTime: ${displayDateTime(statusEntry.time)}\n`);
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
        if(taskStatusEntry === 100 || taskStatusEntry === "Done"){
            task.completionTime = Date.now()-task.status[0].time;
            console.log(getCompletedTaskMessage(task));
        }
        showTask(task);
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
    isTaskTitleValid,
    removeSavedTask,
    showAllTasks,
    findCompletedTasks,
    showCompletedTasks,
    findPendingTasks,
    showPendingTasks,
    taskExists,
    showStatus,
    isIntialStatusValid,
    appendStatusEntry,
    userName
}