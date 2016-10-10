"use strict"

const sqlite = require('sqlite3').verbose()
var file = 'address_book.db'
var db = new sqlite.Database(file)


class Contacts {
    constructor(property) {
        this._id = property['id'] || null
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
      db.run(`UPDATE contacts SET firstname = ${value} WHERE id = ${this.id}`, function(err, callback){
        if(err){
          console.log(err);
        }else{
          console.log(`firstname on id : ${this.id} UPDATED`);
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
       db.serialize(function(){
      db.run(`INSERT INTO contacts (firstname,lastname,birthdate,phone,email,company) VALUES ('${this.firstname}','${this.lastname}','${this.birthdate}','${this.phone}','${this.email}','${this.company}');`, function(err, callback){
        if(err){
          console.log(err);
        }else{
          console.log(`New contact saved !`);
          this.id = callback.id
          console.log(this.id);
        }
      })
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

    delete(){
      db.run(`DELETE FROM contacts WHERE id = ${this.id};`, function(err, callback){
        if(err){
          console.log(err);
        }else{
          var time = function(){console.log(`Contact ID : ${this.id} has deleted`);}
          setTimeout(time, 1000)
        }
      })
    }

    update(){

    }




}

var contact = new Contacts({
    firstname: "Sahbana",
    lastname:"Gold",
    birthdate: "1983-06-29",
    phone: "0856437789",
    email: "sahbanagold@gmail.com",
    company: "PT. Hacktivate"
})
var showId = function(){console.log(contact.id);}

console.log(contact.id);
contact.save()
// contact.delete()

// contact.delete(10)
// contact.read()
