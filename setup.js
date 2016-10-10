"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

// write your code here
var file = "address_book.db";
var db = new sqlite.Database(file);

let createTableContacts = () =>{
  db.serialize(() =>{
    db.run("CREATE TABLE contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT, phone TEXT, address TEXT);", (err) =>{
        if(err){
            console.log(err);
        }else{
          console.log("Table Contacts Created");
          // seedData()
        }
    })
  })
}

let createTableContactsGroups = () =>{
  db.serialize(() =>{
    db.run("CREATE TABLE contacts_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, contacts_id INTEGER, groups_id INTEGER, FOREIGN KEY(contacts_id) REFERENCES contacts(id), FOREIGN KEY(groups_id) REFERENCES groups(id));", (err) =>{
        if(err){
            console.log(err);
        }else{
          console.log("Table ContactsGroups Created");
          // seedData()
        }
    })
  })
}

let createTableGroups = () =>{
  db.serialize(() =>{
    db.run("CREATE TABLE groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);", (err) =>{
        if(err){
            console.log(err);
        }else{
          console.log("Table Groups Created");
          // seedData()
        }
    })
  })
}

// let seedData = ()=>{
//   db.run("INSERT INTO student (firstname, lastname, gender, birthday, email, phone)VALUES('andi','pratama','laki-laki','1990-05-05','andi@gmail.com','085808580858');", (err)=>{
//     if(err){
//       console.log(err);
//     }else{
//       console.log("Insert Success");
//     }
//   })
// }

// createTableContacts();
// createTableContactsGroups()
//createTableGroups()
