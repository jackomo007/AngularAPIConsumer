import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';


const routes: Routes = [
  {
    path: 'contacts',
    component: ContactsComponent,
    data: { title: 'List of Contacts' }
  },
  {
    path: 'contact-detail/:id',
    component: ContactDetailComponent,
    data: { title: 'Contact Details' }
  },
  {
    path: 'contact-add',
    component: ContactAddComponent,
    data: { title: 'Add Contact' }
  },
  {
    path: 'contact-edit/:id',
    component: ContactEditComponent,
    data: { title: 'Edit Contact' }
  },
  { path: '',
    redirectTo: '/contacts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
