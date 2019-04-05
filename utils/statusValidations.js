const isValidStringStatusEntry = ( task , stringEntry) => {
    const statusPhraseValidation = ['To-do','Just begun','In progress','Halfway','Nearly Done','Done'];
    debugger;
    const stringEntryIndex = statusPhraseValidation.indexOf(stringEntry);
    if ( stringEntryIndex < 0 ){
        return false;
    }
    for( let statusEntry of task.status ){
        if( typeof statusEntry.value === 'number' || statusPhraseValidation.indexOf(statusEntry.value) >= stringEntryIndex ){
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
    return !( currNumericEntry < 0 || currNumericEntry > 100);
}

const validateTaskStatus = (task,taskStatusEntry) => {
    let validationStatus=false;
    if ( typeof taskStatusEntry === 'number' ){
        validationStatus = isValidNumericStatusEntry(task,taskStatusEntry);
    } else if(typeof taskStatusEntry === 'string') {
        validationStatus = isValidStringStatusEntry(task,taskStatusEntry)
    }
    return validationStatus;
}

module.exports = {
    validateTaskStatus
}