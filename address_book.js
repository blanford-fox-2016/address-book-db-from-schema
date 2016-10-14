"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
let file = 'address_book.db';
let db = new sqlite.Database(file);

class Contacts{
  constructor(args={}){
    this.id = args['id'];
    this.nama = args['nama'];
    this.perusahaan = args['perusahaan'];
    this.no_telp = args['no_telp'];
    this.email = args['email'];
  }

  isPhone(no_telp) {
    let cek_telp  = `${no_telp}`
    if (cek_telp.length < 13 && cek_telp.length > 10){
      return true
    } else {
      return "No. telephone tidak valid"
    }
    // console.log(cek_telp);
  }

  isEmail(email) {
    if (/\w+@\w+.\w{2,5}/.test(email)){
      return true
    } else {
      return "Email tidak valid"
    }
  }


  create(nama, perusahaan, email, no_telp) {
    if (contacts.isEmail(email) == true && contacts.isPhone(no_telp) == true){
      let INSERT_DATA = db.prepare(`INSERT INTO contacts VALUES (null, ?, ?, ?, ?)`);
      INSERT_DATA.run(nama, perusahaan, `0${no_telp.toString()}`, email, (err) => {
        if (err){
          console.log(err);
        } else {
          console.log(`Data inserted`);
        }
      });
      INSERT_DATA.finalize();
    } else {
      console.log(contacts.isEmail(email));
      console.log(contacts.isPhone(no_telp));
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

}

class Groups {
  constructor(args={}) {
    this.nama = args['nama'];
  }
  create(name) {
    let INSERT_DATA = db.prepare(`INSERT INTO groups VALUES (null, ?)`);
    INSERT_DATA.run(name, (err) => {
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

  show_group(group_id) {
    let JOINGROUP = `SELECT contacts.id, contacts.nama AS con_nama, contacts.perusahaan, contacts.email, contacts.no_telp, groups.nama AS group_nama FROM groups JOIN group_contacts ON group_contacts.group_id = groups.id JOIN contacts ON group_contacts.contact_id = contacts.id WHERE group_contacts.group_id = ${group_id}`;
    db.each(JOINGROUP, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} | ${row.con_nama} | ${row.perusahaan} | ${row.email} | ${row.no_telp} | Join on group: ${row.group_nama}`);
      }
    });
  }
}


let contacts = new Contacts();
let gc = new GroupContacts();
let groups = new Groups();


var r = repl.start({prompt: '>'});
r.context.viewAllContacts = contacts.read
r.context.addNewContact = contacts.create //(nama, perusahaan, email, no_telp)
r.context.deleteContact = contacts.delete //(id)
r.context.editContact = contacts.update //(id)

r.context.viewAllGroups = groups.read
r.context.addNewGroup = groups.create // (namagrup)
r.context.deleteGroup = groups.delete // (id)
r.context.editGroup = groups.update // (id)

r.context.joinGroup = gc.join_group // (grup_id, contact_id)
r.context.showGroupMembers = gc.show_group // (group_id)
