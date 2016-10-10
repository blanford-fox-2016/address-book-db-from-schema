"use strict"

///////////////////////////////////
//////// Module called
///////////////////////////////////

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = 'contact.db';
let db = new sqlite.Database(file);

///////////////////////////////////
//////// SQL Statement
///////////////////////////////////
let GROUPS = "CREATE TABLE contact (id INTEGER PRIMARY KEY, user TEXT , group_name TEXT NOT NULL);";

let ADDRESS_BOOKS = "CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER, user_id);";

let USERS = "CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, user_email TEXT, user_address TEXT);";

let table_array = [GROUPS, ADDRESS_BOOKS, USERS];

///////////////////////////////////
//////// Creating a table
///////////////////////////////////


let createTable = (arr) => {
  for (var key in arr) {
    db.run(arr[key], (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("create table");
      }
    });
  }
}


export let seedData = (arr) => {
  for (var key in arr) {
    db.run(arr[key], (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Data Inserted");
      }
    });
  }
}

createTable(table_array);
