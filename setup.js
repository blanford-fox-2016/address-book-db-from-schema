"use strict"

//write your code here
const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
var file = 'address_book.db'
var db = new sqlite.Database(file)

var CREATE_KONTAK = "CREATE TABLE IF NOT EXISTS kontak(id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT NOT NULL, alamat TEXT NOT NULL, nomor_telepon TEXT NOT NULL, email TEXT NOT NULL);";
var CREATE_KONTAK_GRUP = "CREATE TABLE IF NOT EXISTS kontak_grup(kontak_id INTEGER, grup_id INTEGER, FOREIGN KEY(kontak_id) REFERENCES kontak(id), FOREIGN KEY(grup_id) REFERENCES grup(id));";
var CREATE_GRUP = "CREATE TABLE IF NOT EXISTS grup(id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT NOT NULL);";

var SEED_KONTAK = "INSERT INTO kontak VALUES(null, 'Mangku','jalan perancis','08123456789', 'mangkuwi26@gmail.com');";
var SEED_GRUP = "INSERT INTO grup VALUES(null,'Bobo Grup');";
var SEED_KONTAK_GRUP ="INSERT INTO kontak_grup VALUES(1,1);"

let createKontak = () => {
  db.serialize(function(){
    db.run(CREATE_KONTAK,function(err){
        if(err){
          console.log(err);
        }else{
          console.log('CREATE TABLE');
          seedKontak()
        }
      });
    });
  }
let createKontakGrup = () =>{
  db.serialize(function(){
    db.run(CREATE_KONTAK_GRUP,function(err){
      if(err){
        console.log(err);
      }else{
        console.log('CREATE CONTAK TABLE');
        seedKontakGrup()
      }
    });
  });
}

let createGroup = () => {
  db.serialize(function(){
    db.run(CREATE_GRUP,function(err){
      if(err){
        console.log(err);
      }else{
        console.log('CREATE GRUP');
        seedGrup()
      }
    });
  });
}

let seedKontak = () =>{
  db.run(SEED_KONTAK, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('INSERT kontak');
    }
  })
}

let seedGrup = () =>{
  db.run(SEED_GRUP, function(err){
    if(err){
      console.log(err);
    }else{
      console.log('INSERT GRUP');
    }
  })
}

let seedKontakGrup = () =>{
  db.run(SEED_KONTAK_GRUP, function(err){
    if(err){
      console.log(err);
    }else{
      console.log('INSERT KONTAK GRUP');
    }
  })
}

  createKontak()
  createGroup()
  createKontakGrup()
