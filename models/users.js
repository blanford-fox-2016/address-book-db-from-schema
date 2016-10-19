'use strict'

export class User {
  constructor(component) {
    this.user_id = component['user_id'];
    this.first_name = component['first_name'];
    this.last_name = component['last_name'];
    this.user_email = component['user_email'];
    this.user_address = component['user_address'];
  }


}

let GROUPS = "CREATE TABLE IF NOT EXISTS `group` (group_id INTEGER PRIMARY KEY, user TEXT , group_name TEXT NOT NULL);";

let ADDRESS_BOOKS = "CREATE TABLE IF NOT EXISTS `contact` (contact_id INTEGER PRIMARY KEY AUTOINCREMENT, trackusers INTEGER, trackgroup INTEGER,FOREIGN KEY(trackusers) REFERENCES user(user_id), FOREIGN KEY(trackgroup) REFERENCES `group`(group_id));";

let USERS = "CREATE TABLE IF NOT EXISTS `user` (user_id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, user_email TEXT, user_address TEXT, trackgroup INTEGER, FOREIGN KEY(trackgroup) REFERENCES group(group_id));";
