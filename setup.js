"use strict"

//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = 'address_book.db';
let db = new sqlite.Database(file); // SQL Statement

let CREATE_TABLE_CONTACTS = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT, perusahaan TEXT, no_telp TEXT, email TEXT)" ;
let CREATE_TABLE_GROUPS = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT)";
let CREATE_TABLE_GC = "CREATE TABLE IF NOT EXISTS group_contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER, contact_id INTEGER, FOREIGN KEY(group_id) REFERENCES groups(id), FOREIGN KEY(contact_id) REFERENCES contacts(id))";

// CREATE_TABLE
let createTable = () => {
  // Run SQL one at a time
  db.serialize(function() {
    // Create table
    db.run(CREATE_TABLE_CONTACTS, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('TABLE contacts CREATED');
        // seedData();
      }
    });
    db.run(CREATE_TABLE_GROUPS, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('TABLE groups CREATED');
        // seedData();
      }
    });
    db.run(CREATE_TABLE_GC, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('TABLE group_contacts CREATED');
        // seedData();
      }
    });
  });
}
// SEED_DATA
// let seedData = () => {
//   // Your code here
//   db.run(SEED_DATA, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('DATA INSERTED');
//     }
//   })
// }

createTable();
