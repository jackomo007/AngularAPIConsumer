import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.sass']
})
export class ContactEditComponent implements OnInit {

  contactForm: FormGroup;
  _id:string='';
  name:string='';
  email:string='';
  skill:string='';
  phone:number=null;
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getContact(this.route.snapshot.params['id']);
    this.contactForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'skill' : [null, Validators.required],
      'phone' : [null, Validators.required]
    });
  }

  getContact(id) {
    this.api.getContact(id).subscribe(res => {
      let data = res.data;
      this._id = data._id;
      this.contactForm.setValue({
        name: data.name,
        email: data.email,
        skill: data.skill,
        phone: data.phone,
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.updateContact(this._id, form)
      .subscribe(res => {
          let id = res['_id'];
          this.isLoadingResults = false;
          this.router.navigate(['/contact-detail', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  contactDetails() {
    this.router.navigate(['/contact-detail', this._id]);
  }

}
