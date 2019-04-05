const addDesc = 'Adds a task.';
const listDesc = 'Lists all the saved tasks.';
const statusDesc = 'Status of a saved task.';
const deleteDesc = 'Deletes a saved task.';
const setDesc = 'Sets the status entry for a task.'

const taskTitleDesc = {
    describe:'Title of the Task',
    demand:true,
    alias:'t'
}

const taskInfoDesc = {
    describe:'Content of the Task.',
    demand:true,
    alias:'i'
}

const taskStatusDesc = {
    describe:"Current status of the task.\nCan be a percentage(0-100) \n(or)\n['To-do','Just begun','In progress','Halfway','Nearly Done','Done']",
    demand:true,
    alias:'s'
}

const addOptions = {
    title:taskTitleDesc,
    info:taskInfoDesc,
    status:taskStatusDesc
}

const commonOption ={
    title:taskTitleDesc,
}

const setOptions = {
    title : taskTitleDesc,
    status : taskStatusDesc
}

module.exports = {
    addOptions,
    commonOption,
    setOptions,
    addDesc, 
    listDesc,
    statusDesc,
    deleteDesc,
    setDesc
}