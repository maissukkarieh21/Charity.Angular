

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class CharitiesService {
  upload_Image: any;

  constructor(private http: HttpClient) { }

  getCharities(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7031/api/Charity');
  }

  getCharity(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:7031/api/Charity/'+id);
  }


  addCharity(Charity: any): Observable<any>{
    Charity.image = this.upload_Image;

    return  this.http.post('https://localhost:7084/api/Charity',Charity);
 
  }
  updateCharity(Charity: any): Observable<any> {
    Charity.image = this.upload_Image;

    return this.http.put('https://localhost:7084/api/Charity/',Charity);

  }

  deleteCharity(id:number): Observable<any> {
    return this.http.delete('https://localhost:7084/api/Charity/Delete/'+id);
  }

  uploadAttachment(file:FormData){
    this.http.post('https://localhost:7084/api/Charity/uploadImage' ,file).subscribe((resp:any)=>{
    this.upload_Image = resp.image; 
    },err=>{
      console.log('Something went wrong !!');
    })
  
  }

  getAcceptedCharities(): Observable<any[]> {
    return this.getCharities().pipe(
      map(Charities => Charities.filter(Charities => Charities.status === 'Paid'))
    );
  }

  donateForCharity(charityid:any,userid:any,donation:any){
    return  this.http.post('https://localhost:7031/api/User/DonateForCharity/'+charityid+userid,donation);
  }
  
}
