import { Component, OnInit} from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

import { ToastrService } from 'ngx-toastr'; 
import { FormGroup, FormControl,Validators } from '@angular/forms';   

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  form!: FormGroup;
  edit!: FormGroup;
  selectedUser: any | null = null;
  selectedEditUser: any | null = null;
  showAddUserModal: boolean = false;
  response: any;
  id: any;
  
  constructor(
    private usersService: UsersService,
    private toastr: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.getUsers();
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.edit = new FormGroup({
      id: new FormControl('', [Validators.required]),

      username: new FormControl('', [Validators.required])

    });

  }
  
  getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });

  }
  getRoleName(roleid: number): string {
    const roleMap: { [key: number]: string } = {
      1: 'Admin',
      2: 'User',
    };
    return roleMap[roleid] || 'Unknown'; 
  }
  displayPassword(password: string): string {
    return '*'.repeat(password.length); 
  }

  detailModal(_action: string, user: any) {
    this.selectedUser = user;
    
  }
  
  editModal(user: any): void {
    this.selectedEditUser = user;

  }
  addModal() {
    this.showAddUserModal = true;
  }

 
  
  closeModal() {
    this.selectedUser = null;
    this.selectedEditUser = null;
    this.showAddUserModal = false;

    this.form = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')

    });

     this.edit = new FormGroup({
      id: new FormControl('', [Validators.required]),

      username: new FormControl('', [Validators.required])

    });
  }

  deleteUser(id: number) {
    console.log('Deleting user with ID:', id);
  
    this.usersService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter((user) => user.id !== id);
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



  addUser(){
    console.log(this.form.value);
    this.usersService.addUser(this.form.value).subscribe((_res:any) => {
         console.log('User created successfully!');
         this.toastr.success('User added successfully.', 'Success');
         this.getUsers(); 

         this.closeModal();  
          })
  }
  updateUser() {
    this.usersService.updateUser(this.edit.value).subscribe(
      (response) => {
        console.log( this.edit.value);

        console.log('Username updated successfully:', response);
        this.toastr.success('User updated successfully.', 'Success');
        this.getUsers(); 

        this.closeModal();   
      
      },
      (error) => {
        console.log( this.edit.value);

        console.log('Error while update user:', error);
          this.toastr.error('Error while update user.', 'Error'); 

      }
    );
  }

}


  

