//write your code here
"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();

// write your code here
var file = 'addressbook.db';
var db = new sqlite.Database(file);

class Kontak {
  constructor(person) {
    this.id = null
    this.firstname  = person['firstname']
    this.lastname = person['lastname']
    this.email = person["email"]
    this.phone = person["phone"]
    this.birthdate = person["birthdate"]
  }

  // setter
  // set id(){
  //   // this
  // }

  set setFirstname(nama){
    db.serialize(function(){

      db.run(`UPDATE kontak SET firstname = '${nama}' WHERE id = '${this.id}'`, function(err){
        if(err){
          console.log(err);
        }else{
         this.firstname = nama
        }
      });

    });
  }

  set setEmail(email){
    db.serialize(function(){

      db.run(`UPDATE kontak SET email = '${email}' WHERE id = '${this.id}'`, function(err){
        if(err){
          console.log(err);
        }else{
          this.email = email
        }
      });

    });
  }

  set setPhone(phone){
    db.serialize(function(){

      db.run(`UPDATE kontak SET phone = '${phone}' WHERE id = '${this.id}'`, function(err){
        if(err){
          console.log(err);
        }else{
          this.phone = phone;
        }
      });

    });
  }

  // getter
  // get id(){
  //   return this.id;
  // }

  get getFirstname(){
    return this.firstname;
  }

  // method
  save(){
    // db.serialize(function(){
      db.run(`INSERT INTO kontak (firstname,lastname,email, phone,birthdate) VALUES ('${this.firstname}', '${this.lastname}', '${this.email}','${this.phone}','${this.birthdate}');`, function(err){
        if(err){
          console.log(err);
        }else{
          // select
          db.each(`SELECT id FROM kontak where phone = '${this.phone}' LIMIT 1;`, function(err, row) {
             this.id = row.id;
             console.log(this.id);
          });

        }
      });
    // });
  // end addKontak
  }
}

var person = {
  firstname : "dharmadi",
  lastname : "tanamas",
  email : "dharmaditanamas",
  phone : "123123190",
  birthdate : "1998-05-01"
}

var person1 = new Kontak(person)
console.log(person1.id); // null
person1.save()
console.log(person1.id); // 1
person1.firstname = "hallo world"
console.log(person1.firstname);
// console.log("asdasdasd");

// class Grup {
//   constructor() {
//
//   }
// }
//
// class Kontak_Grup {
//   constructor() {
//
//   }
// }
