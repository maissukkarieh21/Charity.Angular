import { Component , OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homes: any[] = [];
    edit!: FormGroup;
    selectedHome: any | null = null;
    selectedEditHome: any | null = null;
    showAddHomeModal: boolean = false;
    response: any;
    id: any;
    selectedFile: File | null = null;
    background: string | null = null;
    logo: string | null = null;
    selectedFileName: string | null = null;
    display_image: any;
    upload_Image: any;
    display_logo: any;
    upload_logo: any;

  constructor(   private homeService: HomeService,  private toastr: ToastrService){}
  form :FormGroup = new FormGroup({
    content: new FormControl(''),
    background: new FormControl(),
    location: new FormControl(''),
    phone: new FormControl(''),
    logo: new FormControl(),
  });

  ngOnInit(): void {
    this.getHomes();
 
    this.edit = new FormGroup({
      id: new FormControl(''),
      content: new FormControl(''),
      background: new FormControl(''),
      location: new FormControl(''),
      phone: new FormControl(''),
      logo: new FormControl(''),


    });
    this.form = new FormGroup({
      content: new FormControl(''),
      background: new FormControl(''),
      location: new FormControl(''),
      phone: new FormControl(''),
      logo: new FormControl(''),


    });
  }

  getHomes() {
    this.homeService.getHomes().subscribe((homes) => {
      this.homes = homes;
    });

  }

  addHome() {
    console.log('Add Home Form Value:', this.form.value);
  
    this.homeService.addHome(this.form.value).subscribe(
      (resp: any) => {
        console.log('Response:', resp);
        this.toastr.success('Home Added successfully.', 'Success');
        this.getHomes();
        this.closeModal();
      },
      (err) => {
        console.error('Error:', err);
        this.toastr.error('Something went wrong !!', 'Error');
      }
    );
  }
  
  UploadImage(file:any)
    {
    if(file.length==0)
    return ; 
    let fileToUpload=<File>file[0];
    const formDate=new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name);
    this.homeService.uploadAttachment(formDate);
    }

    UploadLogo(logo:any)
    {
   
    let fileToUpload=<File>logo[0];
    const formDate=new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name);
    this.homeService.uploadLogo(formDate);
    }

    detailModal(_action: string, Home: any) {
      this.selectedHome = Home;
      
    }

    editModal(Home: any): void {
      this.selectedEditHome = Home;
      this.edit.setValue({
        id: Home.id,
        content: Home.content,
        background: Home.background,
        location: Home.location,
        phone: Home.phone,
        logo: Home.logo
      });
    }

    
    addModal() {
      this.showAddHomeModal = true;
    }

    closeModal() {
      this.selectedHome = null;
      this.selectedEditHome = null;
      this.showAddHomeModal = false;
  
      this.form = new FormGroup({
        content: new FormControl(''),
        background: new FormControl(''),
        location: new FormControl(''),
        phone: new FormControl(''),
        logo: new FormControl(''),
      });
  
       this.edit = new FormGroup({
        id: new FormControl(''),
        content: new FormControl(''),
        background: new FormControl(''),
        location: new FormControl(''),
        phone: new FormControl(''),
        logo: new FormControl('')

      });
    }

    deleteHome(id: number) {
      console.log('Deleting Home with ID:', id);
    
      this.homeService.deleteHome(id).subscribe(
        () => {
          this.homes = this.homes.filter((Home) => Home.id !== id);
          console.log('Home deleted successfully.');
          this.closeModal();  
  
        },
        (error) => {
          console.log('Error while deleting Home:', error);
        }
      );
    }
    get f(){
      return this.form.controls;
    }

    updateHome() {
      this.homeService.updateHome(this.edit.value).subscribe(
        (response) => {
          console.log( this.edit.value);
  
          console.log('Home updated successfully:', response);
          this.toastr.success('Home updated successfully.', 'Success');
          this.getHomes(); 
  
          this.closeModal();   
        
        },
        (error) => {
          console.log( this.edit.value);
  
          console.log('Error while update Home:', error);
            this.toastr.error('Error while update Home.', 'Error'); 
  
        }
      );
    }
}
