
import { Component, OnInit} from '@angular/core';
import { forkJoin } from 'rxjs';
import { AdminService } from 'src/app/services//admin.service';


@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css'],
  providers: [AdminService]
})
export class DonationComponent implements OnInit {
  donations: any[] = [];
 
  constructor( private adminService: AdminService ) {

  }
  ngOnInit(): void {
    this.GetAllDonations();
   
  }




  GetAllDonations() {
    this.adminService.GetAllDonations().subscribe((donations ) => {
      
      this.donations = donations;


    });

  }



  
}








  

