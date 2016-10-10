"use strict"

const sqlite = require('sqlite3').verbose();

var file = 'address.db';
var db = new sqlite.Database(file);

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, occupation TEXT, phone TEXT, email TEXT);"
var CREATE_GROUPTABLE = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, groupname text)"
var CREATE_GROUPCONTACTTABLE = "CREATE TABLE IF NOT EXISTS groupcontact (id INTEGER PRIMARY KEY AUTOINCREMENT, groupid INTEGER, contactid INTEGER, FOREIGN KEY(groupid) REFERENCES groups(id), FOREIGN KEY (contactid) REFERENCES contacts(id))"
var SEED_DATA = "INSERT INTO contacts(firstname, lastname, occupation, phone, email) VALUES ('Alessandro', 'Christopher', 'Student', '08989899996','alessandro.christopher@gmail.com');"

let createTable = () =>{
  db.serialize (function(){
    db.run(CREATE_TABLE, function(err){
      if(err){
        console.log(err);
      } else{
        console.log('CREATE_TABLE');
     }
   });
 });
}
let creategroup = () =>{
  db.serialize (function(){
    db.run(CREATE_GROUPTABLE, function(err){
      if(err){
        console.log(err);
      } else{
        console.log('CREATE_GROUPTABLE');
     }
   });
 });
}
let creategroupcontact = () =>{
  db.serialize (function(){
    db.run(CREATE_GROUPCONTACTTABLE, function(err){
      if(err){
        console.log(err);
      } else{
        console.log('CREATE_GROUPCONTACTTABLE');
     }
   });
 });
}

// let seedData = () =>{
//   db.serialize(function(){
//     db.run(SEED_DATA, function(err){
//       if(err){
//         console.log(err);
//       } else{
//         console.log('SEED_DATA');
//       }
//     });
//   });
// }

createTable()
creategroup()
creategroupcontact()
// seedData()
