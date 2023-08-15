import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  numberOfUsers: number = 0;
  numberOfCharities: number = 0;
  maxCharityCategories: any[] = [];
  reports: any[] = [];


 

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getNumberOfUsers();
    this.getNumberOfCharities();
    this.getMaxCharityCategories();
    this.getReports();

  }

  getNumberOfUsers() {
    this.adminService.getNumberOfUsers().subscribe(
      (numberOfUsers) => {
        this.numberOfUsers = numberOfUsers;
      },
      (error) => {
        console.error('Error while fetching number of users:', error);
      }
    );
  }
  getNumberOfCharities() {
    this.adminService.getNumberOfCharities().subscribe(
      (numberOfCharities) => {
        this.numberOfCharities = numberOfCharities;
      },
      (error) => {
        console.error('Error while fetching number of Charities:', error);
      }
    );
  }
  
  getMaxCharityCategories() {
    this.adminService.getMaxCharityCategory().subscribe(
      (categories) => {
        this.maxCharityCategories = categories;
      },
      (error) => {
        console.error('Error while fetching max charity categories:', error);
      }
    );
  }

  getReports() {
    this.adminService.getReports().subscribe(
      (reports) => {
        this.reports = reports;
      },
      (error) => {
        console.error('Error while fetching reports:', error);
      }
    );
  }
  

}


