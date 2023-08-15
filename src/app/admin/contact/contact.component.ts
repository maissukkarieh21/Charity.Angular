import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ToastrService } from 'ngx-toastr'; 
import { FormGroup, FormControl,Validators } from '@angular/forms'; 

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers:[ContactService]
})
export class ContactComponent implements OnInit {
  contacts: any[] = [];
  form!: FormGroup;
  edit!: FormGroup;
  selectedContact: any | null = null;
  selectedEditContact: any | null = null;
  showAddContactModal: boolean = false;
  response: any;
  id: any;

  constructor(
    private contactService: ContactService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getContacts();
    this.form = new FormGroup({
      location: new FormControl('', [Validators.required]),
      content: new FormControl('',[Validators.required]),
      webmail: new FormControl('', [Validators.required]),
      webphone: new FormControl('', [Validators.required])
    });
    this.edit = new FormGroup({
      id: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      content: new FormControl('',[Validators.required]),
      webmail: new FormControl('', [Validators.required]),
      webphone: new FormControl('', [Validators.required])

    });
  }

  getContacts() {
    this.contactService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });

  }

  detailModal(_action: string, contact: any) {
    this.selectedContact = contact;
    
  }
  
  editModal(contact: any): void {
    this.selectedEditContact = contact;

  }
  addModal() {
    this.showAddContactModal = true;
  }

  closeModal() {
    this.selectedContact = null;
    this.selectedEditContact = null;
    this.showAddContactModal = false;

    this.form = new FormGroup({
      location: new FormControl('', [Validators.required]),
      content: new FormControl('',[Validators.required]),
      webmail: new FormControl('', [Validators.required]),
      webphone: new FormControl('', [Validators.required])

    });

     this.edit = new FormGroup({
      id: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      content: new FormControl('',[Validators.required]),
      webmail: new FormControl('', [Validators.required]),
      webphone: new FormControl('', [Validators.required])

    });
  }

    deleteContact(id: number) {
      console.log('Deleting contact with ID:', id);
    
      this.contactService.deleteContact(id).subscribe(
        () => {
          this.contacts = this.contacts.filter((contact) => contact.id !== id);
          console.log('User deleted successfully.');
          this.closeModal();  
  
        },
        (error) => {
          console.log('Error while deleting user:', error);
        }
      );
    }
    get f(){
      return this.form.controls;
    }
 
  addContact(){
    console.log(this.form.value);
    this.contactService.addContact(this.form.value).subscribe((_res:any) => {
         console.log('Contact created successfully!');
         this.toastr.success('Contact added successfully.', 'Success');
         this.getContacts(); 

         this.closeModal();  
          })
  }
  updateContact() {
    this.contactService.updateContact(this.edit.value).subscribe(
      (response) => {
        console.log( this.edit.value);

        console.log('Contact updated successfully:', response);
        this.toastr.success('Contact updated successfully.', 'Success');
        this.getContacts(); 

        this.closeModal();   
      
      },
      (error) => {
        console.log( this.edit.value);

        console.log('Error while update Contact:', error);
          this.toastr.error('Error while update contact.', 'Error'); 

      }
    );
  }
}
