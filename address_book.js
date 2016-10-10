let sqlite3 = require('sqlite3')

let db = new sqlite3.Database('address_book.db')

class contacts {
    constructor(param) {
        this.id = db.get(`select id from contacts where id = (select MAX(id) from contacts);`, (err, row) => {
            if (err) {
                console.log(err);
            }
            if (typeof row === "undefined"){
              // console.log(row.id);
              // return row.id
              // this.id = id
              return null
            }else{
              return row.id
            }
        })
        this.nama = param['nama']
        this.email = param['email']
        this.phone = param['phone']
        this.address = param['address']
    }

    // set id(value){
    //   this.id = value
    // }
    //
    // get id(){
    //
    //   return this.id
    // }

    save() {
        db.run(`INSERT INTO contacts (name, email, phone, address)VALUES('${this.nama}','${this.email}','${this.phone}','${this.address}');`, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Insert Success");
            }
        })
    }
}


// class groups {
//     constructor(param) {
//         this.nama = param['nama']
//     }
//
// }

let data = {
  nama: "nama1",
  email: "nama1@yahoo.com",
  phone: "0899891123123",
  address: "jalan kemanggisan utama 1 no. 69"
}
let kontak = new contacts(data)

console.log(kontak.id)
