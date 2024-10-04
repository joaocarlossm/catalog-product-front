import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7084/api/Products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, product);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, product);
  }
}
