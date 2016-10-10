"use strict"
import {Group} from './groups.js';
import {User} from './users.js';

// Inserting module
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

//file that wanted to be modified
let file = 'contact.db';
let db = new sqlite.Database(file);


class Adress_Book {
  constructor(component) {
    this.book_id = component['book_id'];
    this.group_id = component['group_id'];
    this.user_id = component['user_id'];
  }

  

}
