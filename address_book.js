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
  // get getnama() {
  //   return this.nama;
  // }
  // set setnama(nama) {
  //   this.nama = nama
  // }
  // get getperusahaan() {
  //   return this.perusahaan;
  // }
  // set setperusahaan(perusahaan) {
  //   this.perusahaan = perusahaan;
  // }
  // get getno_telp() {
  //   return this.no_telp;
  // }
  // set setno_telp(telp){
  //   this.no_telp = telp;
  // }
  // get getemail() {
  //   return this.email;
  // }
  // set setemail(email) {
  //   this.email = email;
  // }
  //
  validasi(){
    if (this.no_telp.length < 13 && this.no_telp.length > 10 && /\w+@\w+.\w{2,5}/.test(this.email) ){
      return true
    } else {
      return "data tidak valid"
    }
  }
  create() {
    if (this.validasi() == true){
      let INSERT_DATA = db.prepare(`INSERT INTO contacts VALUES (null, ?, ?, ?, ?)`);
      INSERT_DATA.run(this.nama, this.perusahaan, this.no_telp, this.email, (err) => {
        if (err){
          console.log(err);
        } else {
          console.log(`Data inserted`);
        }
      });
      INSERT_DATA.finalize();
    } else {
      console.log(this.validasi())
  }
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
    if (this.validasi() == true ){
      let UPDATE = db.prepare(`UPDATE contacts SET '${col}' = ? WHERE id = ?`);
      UPDATE.run(val, id, (err) => {
        if (err){
          console.log(err);
        } else {
          console.log(`Data updated`);
        }
      });
      UPDATE.finalize();
    } else {
      console.log(this.validasi())
    }
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
    let x = db.lastInsertRowId;
    console.log(db);
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
  update(name,id) {
    let UPDATE = db.prepare(`UPDATE groups SET 'nama' = ? WHERE id = ?`);
    UPDATE.run(name, id, (err) => {
        if (err){
          console.log(err);
        } else {
          console.log(`Data updated`);
        }
      });
    UPDATE.finalize();
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
  join_group(group_id, contact_id) {
    let GROUPINGCONTACT = db.prepare(`INSERT INTO group_contacts VALUES (null, ?, ?);`)
    GROUPINGCONTACT.run(group_id, contact_id, (err) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Grouping success!`);
      }
    });
    GROUPINGCONTACT.finalize();
  }

  show_group() {
    let JOINGROUP = `SELECT contacts.id, contacts.nama AS con_nama, contacts.perusahaan, contacts.email, contacts.no_telp, groups.nama AS group_nama FROM groups JOIN group_contacts ON group_contacts.group_id = groups.id JOIN contacts ON group_contacts.contact_id = contacts.id`;
    db.each(JOINGROUP, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} | ${row.con_nama} | ${row.perusahaan} | ${row.email} | ${row.no_telp} | Join on group: ${row.group_nama}`);
      }
    });
  }
}

// let contacts = new Contacts({nama: "tessi", perusahaan : "tessa", email: "tissu@tessa.com", no_telp: "081234567891"});
// let contacts = new Contacts();
let gc = new GroupContacts();
gc.show_group()
// gc.join_group(2, 2)
// gc.show_group(2)
// gc.join_group(2, 3)
// contacts.create()
// contacts.update("nama", "susantiana", 1)
// contacts.save();
// contacts.read();
// contacts.delete(8)
// let groups = new Groups()
// groups.update('Blandford Fox', 2)
// groups.create();
// groups.read()
