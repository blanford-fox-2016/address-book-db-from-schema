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

  get getFirstname(){
    return this.firstname;
  }

  // method save
  save(){

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
  // end addKontak
  }

  deleting(idkontak){
    db.run(`PRAGMA foreign_keys = ON;`,
      function (err){
        if (err) {
          console.log(err);
        }else {
          db.run(` DELETE FROM 'kontak' where id='${idkontak}'`,function (error){
            if (error) {
              console.log(`id kontak ${idkontak} tidak teradaftar`);
            }else {
              console.log("deleting...");
            }
          });
        }
      });
  }
}

class Group{

  addGrup(groupname){
    db.run(`INSERT INTO 'group' (groupname, create_at) VALUES ('${groupname}', DATE());`, function(err){
      if(err){
        console.log(err);
      }
    });
  }// end add
  deleting(idgroup){
    db.run(`PRAGMA foreign_keys = ON;`,
      function (err){
        if (err) {
          console.log(err);
        }else {
          db.run(` DELETE FROM 'group' where id='${idgroup}';`,function (error){
            if (err) {
              console.log(`id group ${idgroup} tidak teradaftar`);
            }else {

            }
          });
        }
      });
  }
} // end Group

class Kontak_Group {

  addKontakGroup(kontakid, groupid){
    db.run(`INSERT INTO kontak_group (kontak_id,group_id) VALUES ('${kontakid}, ${groupid};`, function(err){
      if (err) {
        console.log(err);
      }
    })
  }

  delete_kg_kotak(kotakid,groupid){
    db.run(`PRAGMA foreign_keys = ON;`,
      function (err){
        if (err) {
          console.log(err);
        }else {
          db.run(` DELETE FROM 'kontak_group' where kontak_id='${kotakid} AND group_id= '${groupid}';`,function (error){
            if (err) {
              console.log(`id kontak ${kotakid} dalam group tidak teradaftar`);
            }else {

            }
          });
        }
      });
  }
} // end class Kontak_Group

// data objek yang nanti di masukan kedalam parameter class Kontaks
var person = {
  firstname : "ken",
  lastname : "chen",
  email : "ken chen",
  phone : "0838067811",
  birthdate : "1998-05-01"
}

// ka kalo mau masukin yang lain harus di comment, kalo mau delete juga sama yang add di comment dulu

// objek kontak
// data person ada di atas
var person1 = new Kontak(person)
// console.log(person1.id); // output null
// person1.save()
// console.log(person1.id); // output 1
person1.deleting(1);


// ganti nama yang ada di objek bukan di database, kalo mau yang di database pake yang person1.setFirstname = "nama depan"
// person1.firstname = "hallo world"
// console.log(person1.firstname); // cetak nama depan dari objek yang di buat

// objek group
// var group1 = new Group()
// group1.addGrup("dunia anak") // addGrup([nama grup yang akan dimasukan])

// objek Kontak_Group
// var kontak_group1 = new Kontak_Group()
// kontak_group1.addKontakGroup() // addKontakGroup([id kontak],[id group])
