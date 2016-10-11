'use strict'


const repl = require('repl')//optional
const sqlite = require('sqlite3').verbose()
const fs = require('fs')
const json = require('jsonfile')
var file = 'address_book.db'
var db = new sqlite.Database(file)

var fileJson = 'data.json'
var data = JSON.parse(fs.readFileSync(fileJson))
var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS addressbook (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, strees_address TEXT, city TEXT, state TEXT,phone TEXT,email TEXT)";
let CREATE_GROUP_TABLE = "CREATE TABLE IF NOT EXISTS groups ( id INTEGER PRIMARY KEY AUTOINCREMENT, groupname TEXT NOT NULL)"
let CREATE_TRANSACTIONAL_TABLE = "CREATE TABLE IF NOT EXISTS group_contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id TEXT, member_id INTEGER, FOREIGN KEY(group_id) REFERENCES groups(id), FOREIGN KEY(member_id) REFERENCES contacts(id))"

var DISPLAY_MEMBERS = 'SELECT * FROM addressbook;'
//seed to contacts table
var SEED_DATA=`INSERT INTO addressbook (name,strees_address,city,state,phone,email) VALUES `
for(var i = 0;i<data.contacts.length;i++){
SEED_DATA += `('${data.contacts[i].name}','${data.contacts[i].strees_address}','${data.contacts[i].city}','${data.contacts[i].state}','${data.contacts[i].phone}','${data.contacts[i].email}')`
if(data.contacts.length - 1 > i){
  SEED_DATA += ','
}
}

//seed to group TABLE
let SEED_GROUP_DATA = `INSERT INTO groups (groupname) VALUES `

for(var i=0;i<data.groups.length;i++)
{
  SEED_GROUP_DATA += `('${data.groups[i].group_name}')`
  if(data.groups.length - 1 > i)
  SEED_GROUP_DATA += ','
}

//seed to transactional TABLE
var SEED_TRANSACTIONAL_DATA = `INSERT INTO group_contacts (group_id,member_id) VALUES `
for(var i=0;i<data.group_kontak.length;i++)
{
  SEED_TRANSACTIONAL_DATA += `('${data.group_kontak[i].group_id}','${data.group_kontak[i].member_id}')`
  if(data.group_kontak.length - 1 > i)
  {
    SEED_TRANSACTIONAL_DATA += ','
  }
}

var createTable = function(){
  db.serialize(function() {
    db.run(CREATE_TABLE, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('CREATE TABLE')
      }
    })
    db.run(CREATE_GROUP_TABLE, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('CREATE GROUP TABLE')
      }
    })
    db.run(CREATE_TRANSACTIONAL_TABLE, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('CREATE TRANSACTIONAL TABLE')
      }
    })
  })
}
var seedData = function(){
  db.serialize(function() {
    db.run(SEED_DATA, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('INSERT DATA')
      }
    })
    db.run(SEED_GROUP_DATA, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('INSERT GROUP DATA')
      }
    })

    db.run(SEED_TRANSACTIONAL_DATA, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('INSERT TRANSACTIONAL DATA')
      }
    })
  })
}


var display_result = function()
{
  db.serialize(function(){
    db.all(DISPLAY_MEMBERS,function(err,data){
      if(err)console.log(err);
      else console.log(data);
    })
  })
}

createTable()
seedData()
display_result()
