import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Vérifiez bien que le service est enregistré ici
})
export class PathService {
  private apiUrl = 'http://localhost:5000/Image'; // URL de votre backend Flask

  constructor(private http: HttpClient) {}

  sendPaths(paths: string[]): Observable<any> {
    return this.http.post(this.apiUrl, { paths });
  }
}
