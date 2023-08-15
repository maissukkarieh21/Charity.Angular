import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    categories: any[] = [];
    edit!: FormGroup;
    selectedCategory: any | null = null;
    selectedEditCategory: any | null = null;
    showAddCategoryModal: boolean = false;
    response: any;
    id: any;
    selectedFile: File | null = null;
  image: string | null = null;
  selectedFileName: string | null = null;
  display_image: any;
  upload_Image: any;
    constructor(   private categoriesService: CategoriesService,  private toastr: ToastrService) {
 }
    form :FormGroup = new FormGroup({
      categoryname: new FormControl(''),
      image: new FormControl()
    });
 
    ngOnInit(): void {
      this.getCategories();
   
      this.edit = new FormGroup({
        id: new FormControl(''),
        categoryname: new FormControl(''),
        image: new FormControl()
  
      });
  
    }
    
    getCategories() {
      this.categoriesService.getCategories().subscribe((categories) => {
        this.categories = categories;
      });
  
    }
    
    addCategory() {

      this.categoriesService.addCategory(this.form.value).subscribe((resp:any)=>{

        this.toastr.success('Category Added successfully.', 'Success');
        this.getCategories();
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
    this.categoriesService.uploadAttachment(formDate);
    }
    detailModal(_action: string, Category: any) {
      this.selectedCategory = Category;
      
    }
    
    editModal(Category: any): void {
      this.selectedEditCategory = Category;
  
    }
    addModal() {
      this.showAddCategoryModal = true;
    }
  
   
    
    closeModal() {
      this.selectedCategory = null;
      this.selectedEditCategory = null;
      this.showAddCategoryModal = false;
  
      this.form = new FormGroup({
        Categoryname: new FormControl(''),
        image: new FormControl(),
  
      });
  
       this.edit = new FormGroup({
        id: new FormControl(''),
        Categoryname: new FormControl(''),
        image: new FormControl(),

      });
    }
  
    deleteCategory(id: number) {
      console.log('Deleting Category with ID:', id);
    
      this.categoriesService.deleteCategory(id).subscribe(
        () => {
          this.categories = this.categories.filter((Category) => Category.id !== id);
          console.log('Category deleted successfully.');
          this.closeModal();  
  
        },
        (error) => {
          console.log('Error while deleting Category:', error);
        }
      );
    }
    get f(){
      return this.form.controls;
    }
  
  
  
    updateCategory() {
      this.categoriesService.updateCategory(this.edit.value).subscribe(
        (response) => {
          console.log( this.edit.value);
  
          console.log('Categoryname updated successfully:', response);
          this.toastr.success('Category updated successfully.', 'Success');
          this.getCategories(); 
  
          this.closeModal();   
        
        },
        (error) => {
          console.log( this.edit.value);
  
          console.log('Error while update Category:', error);
            this.toastr.error('Error while update Category.', 'Error'); 
  
        }
      );
    }
  
  }
  

