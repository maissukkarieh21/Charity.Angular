import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IssuesService } from 'src/app/services/issues.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})

export class IssuesComponent implements OnInit {
  issues: any[] = [];
  form!: FormGroup;
  edit!: FormGroup;
  selectedIssue: any | null = null;
  selectedEditIssue: any | null = null;
  response: any;
  id: any;
  Responded:string = 'Responded'
  constructor(
    private issuesService: IssuesService,
    private toastr: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.getIssues();
 
    this.edit = new FormGroup({
      id: new FormControl(''),
      status: new FormControl('Responded'),

      response: new FormControl('', [Validators.required])

    });

  }
  
  getIssues() {
    this.issuesService.getIssues().subscribe((issues) => {
      this.issues = issues;
    });

  }

  detailModal(_action: string, user: any) {
    this.selectedIssue = user;
    
  }
  
  editModal(user: any): void {
    this.selectedEditIssue = user;

  }
  

 
  
  closeModal() {
    this.selectedIssue = null;
    this.selectedEditIssue = null;

    this.form = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')

    });

     this.edit = new FormGroup({
      id: new FormControl('', [Validators.required]),

      response: new FormControl('', [Validators.required])

    });
  }

  deleteIssue(id: number) {
    console.log('Deleting user with ID:', id);
  
    this.issuesService.deleteIssue(id).subscribe(
      () => {
        this.issues = this.issues.filter((issue) => issue.id !== id);
        console.log('Issue deleted successfully.');
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



  updateIssue() {
    this.issuesService.updateIssue(this.edit.value).subscribe(
      (responsee) => {
        console.log( this.edit.value);

        console.log('Replyed successfully:', responsee);
        this.toastr.success('Replyed successfully.', 'Success');
        this.getIssues(); 

        this.closeModal();   
      
      },
      (error) => {
        console.log( this.edit.value);

        console.log('Error while reply issue:', error);
          this.toastr.error('Error while reply issue.', 'Error'); 

      }
    );
  }

}