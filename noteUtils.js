const fs=require('fs');
module.exports.addNote = (username) =>{
    fs.appendFile('firstNote.txt',`Hello! ${username} ! How are you this fine morning?`,(err)=>{
        if(err) throw err;
        console.log('File was successfully written!')
    })
}