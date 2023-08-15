
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CharitiesService } from 'src/app/services/charities.service';

@Component({
  selector: 'app-charities',
  templateUrl: './charities.component.html',
  styleUrls: ['./charities.component.css']
})
export class CharitiesComponent implements OnInit {
    charities: any[] = [];
    edit!: FormGroup;
    selectedCharity: any | null = null;
    selectedEditCharity: any | null = null;
    showAddCharityModal: boolean = false;
    response: any;
    id: any;
    selectedFile: File | null = null;
  image: string | null = null;
  selectedFileName: string | null = null;
  display_image: any;
  upload_Image: any;
    constructor(   private charitiesService: CharitiesService,  private toastr: ToastrService) {
 }
    form :FormGroup = new FormGroup({
      charityname: new FormControl(''),
      image: new FormControl()
    });
 
    ngOnInit(): void {
      this.getcharities();
   
      this.edit = new FormGroup({
        id: new FormControl(''),
        charityname: new FormControl(''),
        image: new FormControl()
  
      });
  
    }
    acceptCharity(charity: any) {
      charity.status = 'Accepted';
      this.updateCharity(charity);
    }
    
    rejectCharity(charity: any) {
      charity.status = 'Rejected';
      this.updateCharity(charity);
    }
    getcharities() {
      this.charitiesService.getCharities().subscribe((charities) => {
        this.charities = charities;
      });
  
    }
    
    addCharity() {

      this.charitiesService.addCharity(this.form.value).subscribe((resp:any)=>{

        this.toastr.success('Charity Added successfully.', 'Success');
        this.getcharities();
        this.closeModal();  
      },err=>{
        
        this.toastr.error('Something went wrong !!', 'error');
  
      });
    }
   
    
   

    UploadImage(file:any)
    {
    if(file.length==0)
    return ; 
    let fileToUpload=<File>file[0];
    const formDate=new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name);
    this.charitiesService.uploadAttachment(formDate);
    }
    detailModal(_action: string, Charity: any) {
      this.selectedCharity = Charity;
      
    }
    
    editModal(Charity: any): void {
      this.selectedEditCharity = Charity;
  
    }
    addModal() {
      this.showAddCharityModal = true;
    }
  
   
    
    closeModal() {
      this.selectedCharity = null;
      this.selectedEditCharity = null;
      this.showAddCharityModal = false;
  
      this.form = new FormGroup({
        Charityname: new FormControl(''),
        image: new FormControl(),
  
      });
  
       this.edit = new FormGroup({
        id: new FormControl(''),
        Charityname: new FormControl(''),
        image: new FormControl(),

      });
    }
  
    deleteCharity(id: number) {
      console.log('Deleting Charity with ID:', id);
    
      this.charitiesService.deleteCharity(id).subscribe(
        () => {
          this.charities = this.charities.filter((Charity) => Charity.id !== id);
          console.log('Charity deleted successfully.');
          this.closeModal();  
  
        },
        (error) => {
          console.log('Error while deleting Charity:', error);
        }
      );
    }
    get f(){
      return this.form.controls;
    }
  
  
  
    updateCharity(Charity:any) {
      this.charitiesService.updateCharity(Charity).subscribe(
        (response) => {
          console.log( this.edit.value);
  
          console.log('Charityname updated successfully:', response);
          this.toastr.success('Charity updated successfully.', 'Success');
          this.getcharities(); 
  
          this.closeModal();   
        
        },
        (error) => {
          console.log( this.edit.value);
  
          console.log('Error while update Charity:', error);
            this.toastr.error('Error while update Charity.', 'Error'); 
  
        }
      );
    }
  
  }
  

