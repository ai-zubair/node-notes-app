console.log('Starting the app now!')
const os=require('os');
const userData=os.userInfo()
const noteUtils=require('./noteUtils');
noteUtils.addNote(userData.username);