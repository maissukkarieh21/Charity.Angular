import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CharitiesService } from '../services/charities.service';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-charity',
  templateUrl: './charity.component.html',
  styleUrls: ['./charity.component.css']
})
export class CharityComponent implements OnInit  {
  @ViewChild('callUpdateDialog') callUpdateDialog! :TemplateRef<any>
  
  donationForm: FormGroup | undefined;

  charities: any[] = [];
  categories: any[] = [];
  acceptedCharities: any[] =[];
  isDonationModalOpen = false;

  selectedCharity: any | null = null;
  charityid: any;
  donation :any[]=[];

  userid=2;


  constructor( private charitiesService:CharitiesService ,private formBuilder: FormBuilder,private categoriesService:CategoriesService, public dialog: MatDialog) { 

    this.donationForm = this.formBuilder.group({
      cardholdernumber: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      cardnumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expirationdate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/[0-9]{2}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    });
  }

  
  ngOnInit(): void {
    this.loadAcceptedCharities();
    this.getCategories();
    this.initDonationForm();
  }

  initDonationForm() {
    this.donationForm = this.formBuilder.group({
      cardholdernumber: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]], 
      cardnumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]], 
      expirationdate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/[0-9]{2}$')]], 
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]] 
    });
  }
 
  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

  }
  OpenDonationDialog(charityid: number): void {
    const dialogRef = this.dialog.open(this.callUpdateDialog, {
      width: '400px' 
    });
  }

  loadAcceptedCharities() {
    this.charitiesService.getAcceptedCharities().subscribe(
      (charities) => {
        this.acceptedCharities = charities;
      },
      (error) => {
        console.error('Error loading accepted charities:', error);
      }
    );
  }

  openDonationModal() {
    this.isDonationModalOpen = true;
  }

  closeDonationModal() {
    this.isDonationModalOpen = false;
  }
  get displayedCharities() {
 
    return this.acceptedCharities;
  }


}

