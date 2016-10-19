'use stict'

import {Adress_Book} from './models/address_book.js';
import {User} from './models/users.js';
import {Groups} from './models/groups.js';

let app = Adress_Book;

let mangku = {
  first_name: "Mangku",
  last_name: "Widodo",
  user_email: "ghanjing",
  user_address: "namasaya mangku jalan mangku"
}

let mangkuDua = {
  first_name: "Mangku Dua",
  last_name: "Widodo",
  user_email: "ghanjing",
  user_address: "namasaya mangku jalan mangku"
}
//app.add_user(new User(mangku));
app.add_user(mangku);
app.add_group({
  name: "Blanford"
});
