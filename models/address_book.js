"use strict"
import {Group} from './groups.js';
import {User} from './users.js';

// Inserting module
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

//file that wanted to be modified
let file = './db/contact.db';
let db = new sqlite.Database(file);


export class Adress_Book {
  constructor(component) {
    this.book_id = component['book_id'];
    this.group_id = component['group_id'];
    this.user_id = component['user_id'];
  }

  static add_user(user) {
    db.run (`INSERT INTO user (first_name, last_name, user_email, user_address) VALUES ('${user.first_name}', '${user.last_name}', '${user.user_email}', '${user.user_address}');`, (error) => {
      (error) ? console.error(error) : console.log("masuk nyet");;
    });
  }

  static add_group(group) {
    db.run (`INSERT INTO group (name) VALUES ('${group.group_name}');`, (error) => {
      (error) ? console.error(error) : console.log("ini masuk");;
    });
  }

  static update_user(user) {

  }

  static update_group(group) {

  }

  static delete_user(user) {

  }

  static delete_group(group) {

  }
}
