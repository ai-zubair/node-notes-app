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
const addTask = (taskTitle,taskInfo) => {
    const newTask = {
        title:taskTitle,
        info:taskInfo,
        created: Date()
    } 
    if(taskExists(taskTitle) < 0){
        savedTasks.push(newTask);
        saveTasks(savedTasks);
        console.log('Task added successfully');
        showTask(newTask);
    } else{
        console.log(`A task with the title ${newTask.title} already exists. Please Try With A Different Title.`)
    }
}

const getAllTasks = () => {
    if( savedTasks.length === 0 ){
        console.log('Ooops no tasks found!');
        return ;
    }
    savedTasks.forEach( task => showTask(task));
}

const getTask = (taskTitle) => {
    const taskIndex = taskExists(taskTitle)
    if( taskIndex > -1 ){
        showTask(savedTasks[taskIndex]);
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

module.exports = {
    addTask,
    getAllTasks,
    getTask,
    deleteTask
}