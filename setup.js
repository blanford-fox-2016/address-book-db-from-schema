"use strict"

//write your code here
const sqlite = require('sqlite3').verbose()
var fs = require("fs");
var content = fs.readFileSync("address_book.json");
var data = JSON.parse(content)
var file = 'address_book.db'
var db = new sqlite.Database(file)

var CREATE_TABLE_CONTACTS = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE, email TEXT, phone TEXT, company TEXT);"
var CREATE_TABLE_GROUPS = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, groupname TEXT NOT NULL, tag TEXT);"
var CREATE_TABLE_RELATION = "CREATE TABLE IF NOT EXISTS relation_contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, contacts_id INTEGER, groups_id INTEGER, FOREIGN KEY(contacts_id) REFERENCES contacts(id), FOREIGN KEY(groups_id) REFERENCES groups(id));"
var SEED_DATA_1 = `INSERT INTO contacts (firstname,lastname,birthdate,email,phone,company) VALUES ('${data[0].firstname}','${data[0].lastname}','${data[0].birthdate}','${data[0].email}','${data[0].phone}','${data[0].company}')`
var SEED_DATA_2 = `INSERT INTO contacts (firstname,lastname,birthdate,email,phone,company) VALUES ('${data[1].firstname}','${data[1].lastname}','${data[1].birthdate}','${data[1].email}','${data[1].phone}','${data[1].company}')`



let createTableContacts =()=> {
  db.serialize(function(){
    db.run(CREATE_TABLE_CONTACTS, function(err){
      if(err){
        console.log(err);
      }else{
        console.log('TABLE CONTACTS CREATED');
      }
    })
  })
}
let createTableGroups =()=> {
  db.serialize(function(){
    db.run(CREATE_TABLE_GROUPS, function(err){
      if(err){
        console.log(err);
      }else{
        console.log('TABLE GROUPS CREATED');
      }
    })
  })
}

let createTableRelation =()=> {
  db.serialize(function(){
    db.run(CREATE_TABLE_RELATION, function(err){
      if(err){
        console.log(err);
      }else{
        console.log('TABLE RELATION CREATED');
      }
    })
  })
}



let seedData =(values)=> {
  db.run(values, function(err){
    if(err){
      console.log(err);
    }else{
      console.log('DATA ADDED');
    }
  })
}

createTableContacts()
createTableGroups()
createTableRelation()
seedData(SEED_DATA_1)
seedData(SEED_DATA_2)
