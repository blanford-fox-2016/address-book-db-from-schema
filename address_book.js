"use strict"

const sqlite = require('sqlite3').verbose();

var file = 'address.db'
var db = new sqlite.Database(file)

class Address{
  constructor(firstname, lastname, occupation, phone, email){
    this._firstname = firstname
    this._lastname = lastname
    this._occupation = occupation
    this._email = email
    this._phone = phone
  }
  id(){
    var SEARCH = `SELECT id FROM contacts WHERE firstname LIKE '${this._firstname}'`
    db.serialize(function(){
      db.run(SEARCH, function(err , data){
        if(err){
          console.log(err);
        }else{
          console.log(data);
        }
      })
    })
  }
  save(address[firstname], this._firstname){
    if(field == 'firstname' || field == 'lastname')
    var first = value.split('')[0]
    value = value.replace(first,first.toUpperCase())
    value = value.replace(value.substring(1,value.length), value.toLowerCase())

    var ADD_DATA = `INSERT INTO contacts (${field}) VALUES ('${value}');`
    db.serialize (function(){
      db.run(ADD_DATA, function(err){
        if(err){
          console.log(err);
        } else{
          console.log('Success!');
       }
     });
   });
  }
}

let address = new Address({firstname: "Alex"})
