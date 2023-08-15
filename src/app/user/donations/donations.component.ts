import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})

export class DonationsComponent implements OnInit {
  donations: any[] = [];
  userid = 101
  constructor( private userService: UserService ) {

  }
  ngOnInit(): void {
    this.GetAllDonations();
  }




  GetAllDonations() {
  //  let userid=JSON.parse(sessionStorage.getItem('userid')||'');
    this.userService.getDonationByUserId(this.userid).subscribe((donations ) => {

      this.donations = donations;


    });

  }



  
}