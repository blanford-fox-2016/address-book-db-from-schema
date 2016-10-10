"use strict"

//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = 'address_book.db';
let db = new sqlite.Database(file); // SQL Statement

let CREATE_TABLE_CONTACTS = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT, perusahaan TEXT, no_telp TEXT, email TEXT)" ;
let CREATE_TABLE_GROUPS = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT)";
let CREATE_TABLE_GC = "CREATE TABLE IF NOT EXISTS group_contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER, contact_id INTEGER, FOREIGN KEY(group_id) REFERENCES groups(id), FOREIGN KEY(contact_id) REFERENCES contacts(id))";
let SEED_CONTACTS = "INSERT INTO contacts VALUES (null, 'susan', 'MNC', '0211234567', 'google@yahoo.com' )"
let SEED_GROUPS = "INSERT INTO groups VALUES (null, 'nama group doank')"
let SEED_GC = "INSERT INTO group_contacts VALUES (null, 1, 1)"
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
        seedContacts();
      }
    });
    db.run(CREATE_TABLE_GROUPS, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('TABLE groups CREATED');
        seedGroups();
      }
    });
    db.run(CREATE_TABLE_GC, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('TABLE group_contacts CREATED');
        seedGC();
      }
    });
  });
}
// SEED_DATA
let seedContacts = () => {
  // Your code here
  db.run(SEED_CONTACTS, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('DATA INSERTED');
    }
  })
}
let seedGroups = () => {
  // Your code here
  db.run(SEED_GROUPS, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('DATA INSERTED');
    }
  })
}
let seedGC = () => {
  // Your code here
  db.run(SEED_GC, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('DATA INSERTED');
    }
  })
}

createTable();
