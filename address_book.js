
"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
var file = 'address_book.db'
var db = new sqlite.Database(file)
var test = []

let lala = (val) => {
  return val
}

class Contact {
  constructor(arg){
    this.name = arg['name']
    this.address = arg['address']
    this.email = arg['email']
    this.phone = arg['phone']
  }

  get id (){

    db.get(`SELECT id FROM kontak WHERE nama = '${this.name}' ORDER BY id LIMIT 1`, function(err, row) {
      if (err) {
        console.log(err);
      } else {
        // console.log(row.id);
        if (typeof row == "undefined") {
          this.test = null
        }
        else {
          this.test = row.id
          console.log(this.test);
        }
      }

    });

  }

  set id (val) {
    this.test = val
  }

  name(){

  }
  save(){
    var that = this
    db.get(`SELECT id FROM kontak WHERE nama = '${this.name}' ORDER BY id LIMIT 1`, function(err, row) {
      if (err) {
        console.log(err);
      } else {
        // console.log(row.id);
        if (typeof row == "undefined") {
          db.run(`INSERT INTO kontak VALUES(null, '${that.name}','${that.address}','${that.phone}', '${that.email}')`, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log('INSERT kontak');
            }
          })
        }
        else {
          db.run(`UPDATE kontak SET alamat = '${that.address}', nomor_telepon = '${that.phone}', email = '${that.email}' WHERE id = '${row.id}'`, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log('UPDATE kontak');
            }
          })
        }
      }
    });
  }

  insertKontak() {
    var propinsi = new RegExp(/[p][r][o][v][i][n][s][i][ ]/).test(this.address);
    var cek = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/).test(this.email);
    if (propinsi == false) {
      console.log("alamat harus ada provinsi");
    }
    else if(String(this.phone.length) != 12 && String(this.phone.length) != 13) {
      console.log("nomor tidak valid");
    }
    else if (cek == false) {
      console.log("email tidak valid");
    }
    else {
      db.run(`INSERT INTO kontak VALUES(null, '${this.name}','${this.address}','${this.phone}', '${this.email}')`, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('INSERT kontak');
        }
      })
    }
  }

  insertGrup() {
    db.run(`INSERT INTO grup VALUES(null, '${this.name}')`, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('INSERT grup');
      }
    })
  }

  ubahAlamat(id,alamat) {
    db.run(`UPDATE kontak SET alamat = '${alamat}' WHERE id = '${id}'`, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Update grup');
      }
    })
  }

  hapusKontak(id) {
    db.run(`DELETE FROM kontak WHERE id = '${id}'`, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('DELETE KONTAK');
      }
    })
  }

  viewKontakGrup() {
    db.each("SELECT kontak.nama as nama_kontak, grup.nama as nama_grup, count(kontak_grup.kontak_id) as total FROM kontak JOIN kontak_grup ON kontak.id = kontak_grup.kontak_id join grup on grup.id = kontak_grup.grup_id GROUP BY kontak_grup.kontak_id", function(err, row){
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.nama_kontak} | ${row.nama_grup} | ${row.total}`);
      }
    })
  }

  tambahKontakKeGrup(idKontak, idGrup) {
    db.run(`INSERT INTO kontak_grup VALUES('${idKontak}', '${idGrup}')`, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('INSERT kontak grup');
      }
    })
  }

}

var contact = new Contact({name: "Mangkuh", address: "jalan apa provinsis dadap", phone:"123123456456", email:"mangkuwi26@gmail.co"})
// contact.insertKontak()
// contact.id
// contact.save()
// contact.insertGrup()
// contact.ubahAlamat(1,"jalan bogor")
// contact.hapusKontak(5)
contact.viewKontakGrup()
// contact.tambahKontakKeGrup(1,1)
