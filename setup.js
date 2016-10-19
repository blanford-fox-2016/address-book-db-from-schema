"use strict"

///////////////////////////////////
//////// Module called
///////////////////////////////////

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = './db/contact.db';
let db = new sqlite.Database(file);

///////////////////////////////////
//////// SQL Statement
///////////////////////////////////
let GROUPS = "CREATE TABLE IF NOT EXISTS `group` (group_id INTEGER PRIMARY KEY, group_name TEXT NOT NULL);";

let ADDRESS_BOOKS = "CREATE TABLE IF NOT EXISTS `contact` (contact_id INTEGER PRIMARY KEY AUTOINCREMENT, trackusers INTEGER, trackgroup INTEGER,FOREIGN KEY(trackusers) REFERENCES user(user_id), FOREIGN KEY(trackgroup) REFERENCES `group`(group_id));";

let USERS = "CREATE TABLE IF NOT EXISTS `user` (user_id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, user_email TEXT, user_address TEXT, trackgroup INTEGER, FOREIGN KEY(trackgroup) REFERENCES `group`(group_id));";

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
