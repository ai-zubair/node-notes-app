const addDesc = 'Adds a task.';
const listDesc = 'Lists all the saved tasks.';
const statusDesc = 'Status of a saved task.';
const deleteDesc = 'Deletes a saved task.';
const setDesc = 'Sets the status entry for a task.'

const taskTitleDesc = {
    describe:'Title of the Task',
    demand:true,
    alias:'t',
    string:true
}

const taskInfoDesc = {
    describe:'Content of the Task.',
    demand:true,
    alias:'i',
    string:true
}

const taskStatusDesc = {
    describe:"Current status of the task.\nCan be a percentage(0-100) \n(or)\n['To-do','Just begun','In progress','Halfway','Nearly Done','Done']",
    demand:true,
    alias:'s'
}
const deleteTaskDesc ={
    describe :"Title of the task to delete",
    demand : false,
    alias:'t',
    string:true
}
const allTaskDesc = {
    describe:"Delete all the saved tasks.",
    demand: false,
    alias:'d',
    boolean:true
}
const listTypeDesc ={
    describe:'List specific tasks only.["all","done","pending"]',
    demand:true,
    alias:'t',
    string:true
}

const addOptions = {
    title:taskTitleDesc,
    info:taskInfoDesc,
    status:taskStatusDesc
}

const listOptions = {
   type : listTypeDesc
}

const commonOption ={
    title:taskTitleDesc,
}

const deleteOptions = {
    title : deleteTaskDesc,
    all : allTaskDesc
}

const setOptions = {
    title : taskTitleDesc,
    status : taskStatusDesc
}

module.exports = {
    addOptions,
    listOptions,
    commonOption,
    setOptions,
    deleteOptions,
    addDesc, 
    listDesc,
    statusDesc,
    deleteDesc,
    setDesc
}