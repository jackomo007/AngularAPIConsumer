import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Contact } from './../contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.sass']
})
export class ContactDetailComponent implements OnInit {

  contact: Contact = { _id: '', name: '', email: '', skill: null, phone: null, create_date: null, data: {} };
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.getContactDetails(this.route.snapshot.params['id']);
  }

  getContactDetails(id) {
    this.api.getContact(id)
      .subscribe(data => {
        this.contact = data.data;
        console.log(this.contact);
        this.isLoadingResults = false;
      });
  }

  deleteContact(id) {
    this.isLoadingResults = true;
    this.api.deleteContact(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/contacts']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
