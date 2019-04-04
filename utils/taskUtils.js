const fs=require('fs');

const savedTasks = fetchSavedTasks();

function fetchSavedTasks(){
    var tasks=[];
    try{
        tasks=JSON.parse(fs.readFileSync('task-data.json'));
    } catch(err){
        return tasks; 
    }
    return tasks;  
}

const saveTasks = (newTasks) => {
    fs.writeFileSync('task-data.json',JSON.stringify(newTasks));
}

const taskExists = (taskTitle) => {
    for(let savedTask of savedTasks){
        if( savedTask.title === taskTitle){
            return savedTasks.indexOf(savedTask);
        }
    }
    return -1;
}

const showTask = ( task ) => {
    console.log(`\nTitle: ${task.title}\nInfo: ${task.info}\nCreated: ${task.created}\n`)
} 

const newStatusEntry = ( taskEntry ) => {
    if( taskEntry ){
        return {
            value : taskEntry,
            time : Date()
        }
    }
}

const getAllTasks = () => {
    if( savedTasks.length === 0 ){
        console.log('Ooops no tasks found!');
        return ;
    }
    savedTasks.forEach( task => showTask(task));
}

const showStatus = ( task ) => {
    for( let statusEntry of task.status ){
        console.log(`\nStatus: ${statusEntry.value}\nTime:${statusEntry.time}`);
    }
} 
const getStatus = (taskTitle) => {
    const taskIndex = taskExists(taskTitle)
    if( taskIndex > -1 ){
        showStatus(savedTasks[taskIndex]);
    } else {
        console.log(`Ooops! Task ${taskTitle} was not found!`)
    }
}

const deleteTask = (taskTitle) => {
    const taskIndex = taskExists(taskTitle);
    if( taskIndex > -1 ){
        const deletedTask = savedTasks.splice(taskIndex,1)[0];
        saveTasks(savedTasks);
        console.log('Task deleted successfully');
        showTask(deletedTask)
    } else {
        console.log(`Ooops! Task ${taskTitle} was not found!`)
    }
}

const isValidStringStatusEntry = ( task , stringEntry) => {
    const statusPhraseValidation = ['To-do','Just begun','In progress','Halfway','Nearly Done','Done'];
    const stringEntryIndex = statusPhraseValidation.indexOf(stringEntry);
    if ( stringEntryIndex < 0 ){
        return false;
    }
    for( let statusEntry of task.status ){
        if( typeof statusEntry.value === 'string' || statusPhraseValidation.indexOf(statusEntry.value) >= stringEntryIndex ){
            return false;
        }
    }
    return true;
}

const isValidNumericStatusEntry = ( task , currNumericEntry ) => {
    for( let statusEntry of task.status ) {
        if( typeof statusEntry.value === 'string'|| statusEntry.value >= currNumericEntry || ( currNumericEntry < 0 && currNumericEntry > 100)){
            return false;
        }
    }
    return true;
}

const validateTaskStatus = (task,taskStatusEntry) => {
    let validationStatus;
    const isNumericEntry = Number(taskStatusEntry);
    if ( isNumericEntry ){
        validationStatus = isValidNumericStatusEntry(task,isNumericEntry);
    } else {
        validationStatus = isValidStringStatusEntry(task,taskStatusEntry)
    }
    return validationStatus;
}

const appendStatusEntry = ( task , taskStatusEntry) => {
    const isTaskStatusValid = validateTaskStatus(task,taskStatusEntry);
    if( isTaskStatusValid ) {
        const statusEntry = newStatusEntry(taskStatusEntry);
        task.status.push(statusEntry);
    } else {
        console.log('Invalid Status Entry!')
    }
}

const setStatus = ( taskTitle , taskStatus ) => {
    const taskIndex = taskExists(taskTitle);
    if( taskIndex > -1 ){
        appendStatusEntry(savedTasks[taskIndex],taskStatus);
        saveTasks(savedTasks);
    } else {
        console.log(`Ooops! Task ${taskTitle} does not exist!`)
    }
}

const addTask = (taskTitle,taskInfo,initialStatus) => {
    const newTask = {
        title:taskTitle,
        info:taskInfo,
        created: Date(),
        status:[]
    }
    const isInitialStatusValid = validateTaskStatus(newTask,initialStatus);
    if( !isInitialStatusValid ) {
        console.log('Invalid initial status of the task');
        return;
    }
    if(taskExists(taskTitle) < 0){
        savedTasks.push(newTask);
        appendStatusEntry(newTask,initialStatus); 
        saveTasks(savedTasks);
        console.log('Task added successfully');
        showTask(newTask);
    } else{
        console.log(`A task with the title ${newTask.title} already exists. Please Try With A Different Title.`)
    }
}

module.exports = {
    addTask,
    getAllTasks,
    getStatus,
    deleteTask,
    setStatus
}