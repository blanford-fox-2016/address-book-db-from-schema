"use strict"
const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
let validator = require('validator');

let file = 'address_book.db'
let db = new sqlite.Database(file)

class Contacts {
  static addContact(name,strees_address,city,state,phone,email) {
    if (validator.isEmail(email)) {
      if (validator.isNumeric(phone) && phone.length <= 12 && phone.length >=10) {
        let DISPLAY_TABLE = `SELECT * FROM addressbook`
        db.all(DISPLAY_TABLE, function(err, data) {
          if (err) {
            console.log(err)
          } else {
            for (let i = 0; i < data.length; i++) {
              if (data[i].email == email) {
                console.log("Email not unique")
                return
              }
            }
            let ADD_CONTACT = `INSERT INTO addressbook (name, strees_address, city, state, phone,email) VALUES ('${name}', '${strees_address}', '${city}', '${state}', '${phone}','${email}')`
            Contacts.execute_command(ADD_CONTACT)
          }
        })
      } else {
        console.log("Wrong phone format.")
      }
    } else {
      console.log("Wrong email format")
    }
  }

  static deleteContact(id) {
    let DELETE_CONTACT = `DELETE FROM addressbook WHERE id = ${id}`
    Contacts.execute_command(DELETE_CONTACT)
  }

  static displayTable(table_name) {
    let DISPLAY_TABLE = `SELECT * FROM ${table_name}`
    db.all(DISPLAY_TABLE, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
  }

  static displayContactByName(name) {
    let DISPLAY_CONTACT_BY_NAME = `SELECT * FROM addressbook WHERE firstname LIKE '${name}'`
    db.all(DISPLAY_CONTACT_BY_NAME, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
  }

  static updateAddress(id, newAddress){
    let EDIT_ADDRESS = `UPDATE addressbook SET strees_address = '${newAddress}' WHERE id = '${id}'`
    db.all(EDIT_ADDRESS, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
        return data
      }
    })
  }

  static addGroup(groupName){
    let ADD_GROUP = `INSERT INTO groups (groupname) VALUES ('${groupName}')`
    Contacts.execute_command(ADD_GROUP)
  }

  static removeGroup(groupName){
    let REMOVE_GROUP_MEMBERS = `DELETE FROM group_members WHERE group_id IN ( SELECT id FROM groups WHERE groupname = '${groupName}' )`
    let REMOVE_GROUP = `DELETE FROM groups WHERE groupname = '${groupName}'`

    Contacts.execute_command(REMOVE_GROUP_MEMBERS)
    Contacts.execute_command(REMOVE_GROUP)
  }

  static addToGroup(group_id, member_id){
    let ADD_TO_GROUP = `INSERT INTO group_members (group_id, member_id) VALUES ('${group_id}', '${member_id}')`
    Contacts.execute_command(ADD_TO_GROUP)
  }

  static displayGroupMembers(){
    let DISPLAY_GROUP_MEMBERS = `SELECT groups.groupname, contacts.firstname, contacts.lastname FROM group_members INNER JOIN groups ON group_members.group_id = groups.id INNER JOIN contacts ON contacts.id = group_members.member_id`
    db.all(DISPLAY_GROUP_MEMBERS, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
  }

  static execute_command(command){
    db.serialize(function() {
      // Create table
      db.run(command, function(err,data) {
        if (err) {
          console.log(err)
        } else {
          console.log("Successful")
        }
      })
    })
  }
}

Contacts.addContact('toni','kebon mangga','kebayoran','indonesia','086793480934','tony_chen93@yahoo.com')
Contacts.displayTable('addressbook')
