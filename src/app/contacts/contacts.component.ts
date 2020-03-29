import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Contact } from './../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email'];
  data: Contact[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getContacts()
      .subscribe(res => {
        this.data = res.data;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
