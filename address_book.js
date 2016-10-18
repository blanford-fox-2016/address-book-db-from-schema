"use strict"

const sqlite = require('sqlite3').verbose()
var fs = require("fs");
var content = fs.readFileSync("address_book.json");
var data = JSON.parse(content)
var file = 'address_book.db'
var db = new sqlite.Database(file)


class Contacts {
    constructor(property) {
        this._id = property['id']
        this._firstname = property['firstname']
        this._lastname = property['lastname']
        this._birthdate = property['birthdate']
        this._phone = property['phone']
        this._email = property['email']
        this._company = property['company']
    }

    set id(value) {
        this._id = value
    }
    get id() {
        return this._id
    }

    set firstname(value) {
      db.run(`UPDATE contacts SET firstname = ${value} WHERE id = ${this._id}`, function(err, callback){
        if(err){
          console.log(err);
        }else{
          console.log(`firstname on id : ${this._id} UPDATED`);
        }
      })
    }
    get firstname() {
        return this._firstname
    }
    set lastname(value) {
        this._lastname = value
    }
    get lastname() {
        return this._lastname
    }
    set birthdate(value) {
        this._birthdate = value
    }
    get birthdate() {
        return this._birthdate
    }
    set phone(value) {
        this._phone = value
    }
    get phone() {
        return this._phone
    }
    set email(value) {
        this._email = value
    }
    get email() {
        return this._email
    }
    set company(value) {
        this._company = value
    }
    get company() {
        return this._company
    }


     save(){
      db.run(`INSERT INTO contacts (firstname,lastname,birthdate,phone,email,company) VALUES ('${this._firstname}','${this._lastname}','${this._birthdate}','${this._phone}','${this._email}','${this._company}');`, function(err, callback){
        if(err){
          console.log(err);
        }else{
          console.log(`New contact saved !`);
          // this._id = data.length
          // console.log(`ID changed to : ${this._id}`);
        }
    })

    }
    static memory(){
      db.each(`SELECT * FROM contacts`, function(err, callback){
        if(err){
          console.log(err);
        }else{
          this.id = callback.id;
        }
      })
    }

     read(){
      db.each(`SELECT * FROM contacts;`, function(err, callback){
        if(err){
          console.log(err);
        }else{
          console.log(`ID : ${callback.id} | ${callback.firstname} | ${callback.lastname} | ${callback.birthdate} | ${callback.phone} | ${callback.email} | ${callback.company}`);
        }
      })
    }

    delete(id){
      db.serialize(function(){
        db.run(`DELETE FROM contacts WHERE id = ${id};`, function(err, callback){
          if(err){
            console.log(err);
          }else{
            console.log(`Contact ID : ${id} has deleted`)
          }
        })
      })
    }
    update(){
      db.serialize(function(){
        db.run(`UPDATE contacts SET '${column}'='${values}' WHERE id='${id}';`, function(err, callback){
          if(err){
            console.log(err);
          }else{
            console.log(`${column} at id : ${id} updated to ${values}`);
          }
        })
      })
    }




}

class Groups{
  constructor(property){
    this.groupname = property['groupname']
    this.tag = property['tag']
  }

  createGroup(){
      db.run(`INSERT INTO groups (groupname, tag) VALUES ('${this.groupname}','${this.tag}');`,function(err, callback){
        if(err){
          console.log(err);
        }else{
          console.log(`new group added`);
        }
      })
    }

  readGroup(){
      db.each(`SELECT * FROM groups;`, function(err, callback){
        if(err){
          console.log(err);
        }else{
          console.log(`Group ID : ${callback.id} | ${callback.groupname} | ${callback.tag} |`);
        }
      })
    }

  updateGroup(column, values, id){
    db.serialize(function(){
      db.run(`UPDATE groups SET '${column}'='${values}' WHERE id='${id}';`, function(err, callback){
        if(err){
          console.log(err);
        }else{
          console.log(`${column} at id : ${id} updated to ${values}`);
        }
      })
    })
  }

  deleteGroup(id){
    db.serialize(function(){
      db.run(`DELETE FROM groups WHERE id = '${id}';`, function(err, callback){
        if(err){
          console.log(err);
        }else{
          console.log(`Delete successfull`);
        }
      })
    })
  }
}

var contact = new Contacts({firstname:"Windy",lastname:"Kris",birthdate:"1983-06-29",phone:"0856437789",email:"windy@gmail.com",company:"PT. Hacktiv8"})

contact.save()
// console.log(contact.firstname);
// contact.delete(13)
// setTimeout(log, 1000)
// contact.delete(10)
// contact.read()
var fox = new Groups({groupname:'h8', tag:'study'})
// fox.createGroup()
// fox.deleteGroup(2)
// fox.updateGroup('tag','study & playing',7)
// fox.readGroup()
// console.log(data.contacts);
