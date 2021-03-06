import { Injectable } from '@angular/core';
import { FormControl , FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

//constructing the customer service class with properties for the form
  constructor(public firebase: AngularFireDatabase) { }
  customerList: AngularFireList<any>;
  form = new FormGroup({
  $key: new FormControl(null),
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
  email: new FormControl('', Validators.email),
  address: new FormControl('')
  });

  //get customers data function
  getCustomers(){
  	this.customerList = this.firebase.list('customers');
  	return this.customerList.snapshotChanges();
  }

  //insert customer function, pushes customer in the customerList array
  insertCustomer(customer){
  	this.customerList.push({
  		firstName: customer.firstName,
  		lastName: customer.lastName,
  		mobile: customer.mobile,
  		email: customer.email,
  		address: customer.address
  	});
  }

  // populate takes the value from this customer obj into the form group
  populateForm(customer){
    this.form.setValue(customer);
  }

  // update data for customer

  updateCustomer(customer){
      this.customerList.update(customer.$key,{
        firstName: customer.firstName,
        lastName: customer.lastName,
        mobile: customer.mobile,
        email: customer.email,
        address: customer.address
      });
    }

   // delete customer

  deleteCustomer($key: string){
      this.customerList.remove($key);
    }

}
