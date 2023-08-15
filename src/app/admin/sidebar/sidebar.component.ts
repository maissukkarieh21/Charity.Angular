import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent implements OnInit {

  notifications: any[] = [];
  NumberOffNotifications: number =0;
shortTime: any;

  constructor(private adminService: AdminService,private spinner: NgxSpinnerService, private router: Router) {}
  sidebar : boolean = true
  ngOnInit(): void {
  
    this.GetAllNotifications();
    this.GetNumberOfNotifications();
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  }

  GetAllNotifications() {
    this.adminService.GetAllNotifications().subscribe(
      (notifications) => {
        this.notifications = notifications;
     
      },
      (error) => {
        console.error('Error while fetching notifications:', error);
      }
      
    ); 
    
   }
   logout(): void {
    localStorage.clear();
    this.router.navigate([' ']);
  }
   GetNumberOfNotifications() {
    this.adminService.GetNumberOfNotifications().subscribe(
      (NumberOffNotifications) => {
        this.NumberOffNotifications = NumberOffNotifications;
      },
      (error) => {
        console.error('Error while fetching number of notifications:', error);
      }
    );
  }
}