import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.sass']
})
export class ContactAddComponent implements OnInit {

  contactForm: FormGroup;
  name:string='';
  email:string='';
  skill:string='';
  phone:number=null;
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'skill' : [null, Validators.required],
      'phone' : [null, Validators.required],
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.addContact(form)
      .subscribe(res => {
          let id = res.data._id;
          this.isLoadingResults = false;
          this.router.navigate(['/contact-detail', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
