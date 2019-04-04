//  var obj={
//      name:'Zubair',
//      age:21,
//      subjects:['eng','hindi','maths','science','sst'],
//      marks:[10.2,31.2,23.3,23.4,12.2],
//      result:[true,false]

//  }

//  var stringObj=JSON.stringify(obj);
//  console.log(typeof stringObj,'*****************************\n',stringObj);
//  var jsObj=JSON.parse(stringObj);
//  console.log(typeof jsObj,'*****************************\n',jsObj);

const fs = require('fs');

var originalNote={
    title:'Some title',
    body: 'This is the note body of the Some title note'
}
var originalNoteString= JSON.stringify(originalNote);

fs.writeFileSync('note.json',originalNoteString);

var readNoteString=JSON.parse(fs.readFileSync('note.json'));
console.log('The title of the read note is ',readNoteString.title);