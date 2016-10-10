let sqlite3 = require('sqlite3')

let db = new sqlite3.Database('address_book.db')

class contacts {
    constructor(param) {
        this.id = null
        this.nama = param['nama']
        this.email = param['email']
        this.phone = param['phone']
        this.address = param['address']
    }




    tambahKontak(){
      db.get(`SELECT * FROM contacts`, (err, row)=>{
              if(err){
                console.log(err);
              }else{
                if(typeof row =="undefined"){
                  if(this.phone.length < 11 || this.phone.length > 12){
                    console.log("Input Telp Harus 11 Atau 12 Digit");
                  }else if(/^\w+@[a-zA-Z]+?\.[a-sA-Z]{2,3}$/.test(this.email)===false){
                    console.log("Format Email Salah");
                  }else if(/prov/g.test(this.address.toLowerCase())===false){
                    console.log("Masukkan Nama kata");
                  }else{
                  db.run(`INSERT INTO contacts (name, email, phone, address)VALUES('${this.nama}','${this.email}','${this.phone}','${this.address}');`, (err)=>{
                    if(err){
                      console.log(err);
                    }else{
                      db.run(`INSERT INTO contacts_groups (contacts_id) values (last_insert_rowid())`, (err) =>{
                        if(err){
                          console.log(err);
                        }else{
                          console.log("Tambah Data ke contacts_groups Success");
                        }
                      })
                      console.log("Tambah Data ke contacts Success");
                    }
                  })
                }

                }
              }
            })
        }

    save() {
        db.run(`UPDATE contacts SET name='Bob'`, (err)=>{
        if(err){
          console.log(err);
        }else{
          console.log("Ubah Data Success");
        }
      })
    }


    updateAlamat(changeAddress,setIdAddress){
      db.run(`UPDATE contacts SET address='${changeAddress}' WHERE id=${setIdAddress}`, (err)=>{
        if(err){
          console.log(err);
        }else{
          console.log("Ubah Data Success");
        }
      })
    }

    deleteKontak(setIdDelete){
      db.run(`DELETE FROM contacts WHERE id=${setIdDelete}`, (err)=>{
        if(err){
          console.log(err);
        }else{
          console.log("delete Success");
        }
      })
    }


}

class group {
  constructor(param){
    this.name=param['nama'];
  }

  tambahGroup(){
    db.run(`INSERT INTO groups (name)VALUES('${this.name}');`, (err)=>{
      if(err){
        console.log(err);
      }else{
        db.run(`UPDATE INTO contacts(groups_id) values (last_insert_rowid())`, (err) =>{
          if(err){
            console.log(err);
          }else{
            console.log("Tambah Data ke contacts_groups Success");
          }
        })
      }
    })
  }

  deleteGroup(setIdDeleteGroup){
    db.run(`DELETE FROM groups WHERE id=${setIdDeleteGroup}`, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("delete Success");
      }
    })
  }


}


let data2 ={
  nama:"contoh",
}

let data = {
  nama: "mangku",
  email: "mangku@yahoo.com",
  phone: "12345678910",
  address: "jalan kemanggisan Provinsi utama 1 no. 69"
}

let kontak = new contacts(data)
//kontak.tambahKontak();
kontak.save();
//kontak.tambahGroup()
// console.log(kontak.id)
driver()



let regu = new group(data2)
// regu.tambahGroup()
