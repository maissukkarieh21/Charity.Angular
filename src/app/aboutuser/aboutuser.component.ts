import { Component, OnInit } from '@angular/core';
import { AboutService } from '../services/about.service';

@Component({
  selector: 'app-aboutuser',
  templateUrl: './aboutuser.component.html',
  styleUrls: ['./aboutuser.component.css']
})

export class AboutuserComponent implements OnInit {
  abouts: any[] = [];

    constructor(   private aboutsService: AboutService) {}
   
 
  ngOnInit(): void {
    this.getAbouts();

  }
  getAbouts() {
    this.aboutsService.getAbouts().subscribe((abouts) => {
      this.abouts = abouts;
    });

  }

 
  
  
  
  

}
