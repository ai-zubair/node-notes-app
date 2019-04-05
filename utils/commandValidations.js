const taskTitleOptions = {
    describe:'Title of the Task',
    demand:true,
    alias:'t'
}

const taskInfoOptions = {
    describe:'Content of the Task.',
    demand:true,
    alias:'i'
}

const taskStatusOptions = {
    describe:'Current status of the task',
    demand:true,
    alias:'s'
}

const taskAddOptions = {
    title:taskTitleOptions,
    info:taskInfoOptions,
    status:taskStatusOptions
}

const commonOption ={
    title:taskTitleOptions,
}

const setStatusOptions = {
    title : taskTitleOptions,
    status : taskStatusOptions
}

module.exports = {
    taskAddOptions,
    commonOption,
    setStatusOptions
}