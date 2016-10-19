'use strict'

import {Group} from './groups.js';

export class User {
  constructor(component) {
    this.user_id = component['user_id'];
    this.first_name = component['first_name'];
    this.last_name = component['last_name'];
    this.user_email = component['user_email'];
    this.user_address = component['user_address'];
    this.group = component['group'] || null;
  }
}
