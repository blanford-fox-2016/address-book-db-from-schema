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
// Seed to Contacts table
let SEED_DATA = "INSERT INTO contacts (firstname, lastname, birthdate, email, phone, company) VALUES "

for (let i = 0; i < data.contacts.length; i++) {
  SEED_DATA += "('" + data.contacts[i].firstname + "', '" + data.contacts[i].lastname + "', '" + data.contacts[i].birthdate + "', '" + data.contacts[i].email + "', '" + data.contacts[i].phone + "', '" + data.contacts[i].company + "')"
  if (data.contacts.length - 1 > i) {
    SEED_DATA += ", "
  }
}

// Seed to Group table
let SEED_GROUP_DATA = "INSERT INTO groups (groupname, tag) VALUES "

for (let i = 0; i < data.groups.length; i++) {
  SEED_GROUP_DATA += "('" + data.groups[i].groupname + "', '" + data.groups[i].tag + "')"
  if (data.groups.length - 1 > i) {
    SEED_GROUP_DATA += ", "
  }
}

// Seed to Transactional table
let SEED_RELATION_TABLE = "INSERT INTO relation_contacts (contacts_id, groups_id) VALUES "

for (let i = 0; i < data.relation_contacts.length; i++) {
  SEED_RELATION_TABLE += "('" + data.relation_contacts[i].contacts_id + "', '" + data.relation_contacts[i].groups_id + "')"
  if (data.relation_contacts.length - 1 > i) {
    SEED_RELATION_TABLE += ", "
  }
}



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
seedData(SEED_DATA)
seedData(SEED_GROUP_DATA)
seedData(SEED_RELATION_TABLE)
