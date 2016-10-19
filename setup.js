//write your code here
"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();

// write your code here
var file = 'addressbook.db';
var db = new sqlite.Database(file);

//SQL statements
var CREATE_TABLE_GROUP = "CREATE TABLE IF NOT EXISTS 'group' (id INTEGER PRIMARY KEY AUTOINCREMENT, groupname TEXT NOT NULL, create_at DATE)"

var CREATE_TABLE_KONTAK = "CREATE TABLE IF NOT EXISTS kontak (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT,email TEXT, phone TEXT,birthdate DATE);";

var CREATE_TABLE_KONTAK_GROUP ="CREATE TABLE IF NOT EXISTS kontak_group (id INTEGER PRIMARY KEY AUTOINCREMENT,kontak_id INTEGER DEFAULT 0 REFERENCES kontak(id) ON UPDATE CASCADE ON DELETE SET DEFAULT,group_id INTEGER DEFAULT 0 REFERENCES 'group'(id) ON UPDATE CASCADE ON DELETE SET DEFAULT);";

var SEED_DATA_GROUP = "INSERT INTO 'group' (groupname,create_at) VALUES ('blandford', '1992-12-02');";

var SEED_DATA_KONTAK = "INSERT INTO kontak (firstname,lastname,email, phone,birthdate) VALUES ('alexander', 'HT', 'alexander@hackti8.com','14045-911','1992-12-02');"

var SEED_DATA_KONTAK_GROUP = "INSERT INTO kontak_group ( id,group_id, kontak_id) VALUES (1, 1 , 1);"

// create table
let createTableGroup = () => {
  db.serialize(function(){

    db.run(CREATE_TABLE_GROUP, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Succes! create table group");
      }
    });

  });
}

 let createTableKontak = () => {
  db.serialize(function(){

    db.run(CREATE_TABLE_KONTAK, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Succes! create table kontak");
      }
    });

  });
}

let createTableKontakGroup = () => {
  db.serialize(function(){

    db.run(CREATE_TABLE_KONTAK_GROUP, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Succes! create table kontak group");
      }
    });

  });
}

// loop Database
// var dataGroup = [{"groupname": "lol1", "create_at": "DATE()"}, {"groupname": "lil2", "create_at": "DATE()"}]
// function inputKontak(){
//   for(let i = 0; i < dataGroup.length; i++){
//     var SEED_DATA_GROUP = `INSERT INTO 'group' (groupname,create_at) VALUES ('${dataGroup[i].groupname}', '${dataGroup[i].create_at}');`;
//   }
//

//console.log(SEED_DATA_GROUP);

// seed data
let seedDatagroup = () => {
  db.serialize(function(){

    db.run(SEED_DATA_GROUP, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Succes! insert grup");
      }
    });

  });
}


let seedDataKontak = () => {
  db.serialize(function(){

    db.run(SEED_DATA_KONTAK, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Succes! insert 1 kontak");
      }
    });

  });
}

let seedDataKontakGroup = () => {
  db.serialize(function(){

    db.run(SEED_DATA_KONTAK_GROUP, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Succes! insert 1 kontak grup");
      }
    });

  });
}

//
createTableGroup()
createTableKontak()
createTableKontakGroup()

seedDatagroup()
seedDataKontak()
seedDataKontakGroup()
