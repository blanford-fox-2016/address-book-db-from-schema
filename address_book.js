"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
let file = 'address_book.db';
let db = new sqlite.Database(file);

class Contacts{
  constructor(args={}){
    this.id = args['id'] || "";
    this.nama = args['nama'];
    this.perusahaan = args['perusahaan'];
    this.no_telp = args['no_telp'];
    this.email = args['email'];
  }
  get getnama() {
    return this.nama;
  }
  set setnama(nama) {
    this.nama = nama
  }
  get getperusahaan() {
    return this.perusahaan;
  }
  set setperusahaan(perusahaan) {
    this.perusahaan = perusahaan;
  }
  get getno_telp() {
    return this.no_telp;
  }
  set setno_telp(telp){
    this.no_telp = telp;
  }
  get getemail() {
    return this.email;
  }
  set setemail(email) {
    this.email = email;
  }

  create() {
    let INSERT_DATA = db.prepare(`INSERT INTO contacts VALUES (null, ?, ?, ?, ?)`);
    INSERT_DATA.run(this.nama, this.perusahaan, this.no_telp, this.email, (err) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Data inserted`);
      }
    });
    INSERT_DATA.finalize();
  }
  read() {
    let READ_ALL = `SELECT * FROM contacts`;
    db.each(READ_ALL, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} | ${row.nama} | ${row.perusahaan} | ${row.email} | ${row.no_telp}`);
      }
    });
  }
  update(col, val, id) {
    let UPDATE = db.prepare(`UPDATE contacts SET '${col}' = ? WHERE id = ?`);
    UPDATE.run(val, id, (err) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Data updated`);
      }
    });
    UPDATE.finalize();
  }

  delete(id) {
    let DELETE = `DELETE FROM contacts WHERE id = ${id};`
    db.run(DELETE, (err) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Data ${id} Deleted`);
      }
    })
  }
  save() {
    if (this.id === "") {
      let INSERT_DATA = db.prepare(`INSERT INTO contacts VALUES (null, ?, ?, ?, ?)`);
      INSERT_DATA.run(this.nama, this.perusahaan, this.no_telp, this.email, (err) => {
        if (err){
          console.log(err);
        } else {
          console.log(`Data inserted`);
        }
      });
      INSERT_DATA.finalize();
    }

  }

}

class Groups {
  constructor(args={}) {
    this.nama = args['nama'];
  }
  create() {
    let INSERT_DATA = db.prepare(`INSERT INTO groups VALUES (null, ?)`);
    INSERT_DATA.run(this.nama, (err) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Data inserted`);
      }
    });
    INSERT_DATA.finalize();
  }
  read() {
    let READ_ALL = `SELECT * FROM groups`;
    db.each(READ_ALL, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} | ${row.nama}`);
      }
    });
  }
  update(id) {

  }
  delete(id) {
    let DELETE = `DELETE FROM groups WHERE id = ${id};`
    db.run(DELETE, (err) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Data ${id} Deleted`);
      }
    })
  }
  save() {

  }
}

class GroupContacts {

}

// let contacts = new Contacts({nama: "Izhharuddin", perusahaan : "SyanCorp", email: "syanmil@yahoo.com", no_telp: "081280142486"});
let contacts = new Contacts();
contacts.update("nama", "susantiana", 1)
// contacts.save();
contacts.read();
// contacts.delete(4)
// let groups = new Groups({nama: "blandford"})
// groups.create();
// groups.read()
