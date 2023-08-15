import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateCharity(charity: any): Observable<void> {
    return this.http.put<void>('https://localhost:7084/api/User', charity);
  }

  getCharityByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7084/api/User/getCharityByUserId/${userId}`);
  }

  deleteCharityByUserId(userId: number): Observable<void> {
    return this.http.delete<void>(`https://localhost:7084/api/User/deleteCharityByUserId/${userId}`);
  }

  createTestimonial(testimonial: any): Observable<void> {
    return this.http.post<void>('https://localhost:7084/api/User/CreateTestimonial', testimonial);
  }

  getTestimonialByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7084/api/User/GetTestimonialByUserId/${userId}`);
  }

  getIssueByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7084/api/User/GetIssueByUserId/${userId}`);
  }

  createIssue(issue: any): Observable<void> {
    return this.http.post<void>('https://localhost:7084/api/User/CreateIssue', issue);
  }

  getCharityByName(search: any): Observable<any[]> {
    return this.http.post<any[]>('https://localhost:7084/api/User/GetCharityByName', search);
  }

  createCharity(charity: any): Observable<void> {
    return this.http.post<void>('https://localhost:7084/api/User/CreateCharity', charity);
  }

  updateCharityDetails(charity: any): Observable<void> {
    return this.http.put<void>('https://localhost:7084/api/User/UpdateCharity', charity);
  }

  payForCharity(userId: number, payment: any): Observable<void> {
    return this.http.post<void>(`https://localhost:7084/api/User/PayForCharity/${userId}`, payment);
  }

  donateForCharity(userId: number, charityId: number, payment: any): Observable<void> {
    return this.http.post<void>(`https://localhost:7084/api/User/DonateForCharity/${userId}/${charityId}`, payment);
  }

  getDonationByUserId(userId: any): Observable<any>{
    return this.http.get('https://localhost:7084/api/User/GetDonationByUserId/' + userId);
  }

  uploadImage(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>('https://localhost:7084/api/User/uploadImage', formData);
  }
}
