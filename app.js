console.log('Starting the app now!')
const os = require('os');
const _ = require('lodash');
// const noteUtils=require('./noteUtils');
// const userData=os.userInfo()
// noteUtils.addNote(userData.username);
console.log(_.isString('abc'));
console.log(_.isString(123));
console.log(_.uniq([1,2,1,3,4,5,1]))