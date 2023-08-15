import { Component,OnInit } from '@angular/core'; ;
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AboutService } from 'src/app/services/about.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  abouts: any[] = [];
    edit!: FormGroup;
    selectedAbout: any | null = null;
    selectedEditAbout: any | null = null;
    showAddAboutModal: boolean = false;
    response: any;
    id: any;
    selectedFile: File | null = null;
    background: string | null = null;
    selectedFileName: string | null = null;
    display_image: any;
    upload_Image: any;
    constructor(   private aboutsService: AboutService,  private toastr: ToastrService) {}
    form :FormGroup = new FormGroup({
      content: new FormControl(''),
      background: new FormControl()
  });
  ngOnInit(): void {
    this.getAbouts();
 
    this.edit = new FormGroup({
      id: new FormControl(''),
      content: new FormControl(''),
      background: new FormControl()

    });

  }
  getAbouts() {
    this.aboutsService.getAbouts().subscribe((abouts) => {
      this.abouts = abouts;
    });

  }
  addAbout() {

    this.aboutsService.addAbout(this.form.value).subscribe((resp:any)=>{

      this.toastr.success('About Added successfully.', 'Success');
      this.getAbouts();
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
    this.aboutsService.uploadAttachment(formDate);
    }
    detailModal(_action: string, About: any) {
      this.selectedAbout = About;
      
    }
    editModal(About: any): void {
      this.selectedEditAbout = About;
  
    }
    addModal() {
      this.showAddAboutModal = true;
    }
  
   
    
    closeModal() {
      this.selectedAbout = null;
      this.selectedEditAbout = null;
      this.showAddAboutModal = false;

      
      this.form = new FormGroup({
        content: new FormControl(''),
        background: new FormControl(),
  
      });
  
       this.edit = new FormGroup({
        id: new FormControl(''),
        content: new FormControl(''),
        background: new FormControl(),

      });
    }
    deleteAbout(id: number) {
      console.log('Deleting About with ID:', id);
    
      this.aboutsService.deleteAbout(id).subscribe(
        () => {
          this.abouts = this.abouts.filter((about) =>about.id !== id);
          console.log('About deleted successfully.');
          this.closeModal();  
  
        },
        (error) => {
          console.log('Error while deleting About:', error);
        }
      );
    }
    get f(){
      return this.form.controls;
    }
    updateAbout() {
      this.aboutsService.updateAbout(this.edit.value).subscribe(
        (response) => {
          console.log( this.edit.value);
  
          console.log('Aboutyname updated successfully:', response);
          this.toastr.success('About updated successfully.', 'Success');
          this.getAbouts(); 
  
          this.closeModal();   
        
        },
        (error) => {
          console.log( this.edit.value);
  
          console.log('Error while update About:', error);
            this.toastr.error('Error while update About.', 'Error'); 
  
        }
      );
    }
 
  
  
  
  

}
