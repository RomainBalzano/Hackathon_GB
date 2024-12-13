import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Vérifiez bien que le service est enregistré ici
})
export class PathService {
  private apiUrl = 'http://127.0.0.1:5000/find_similar'; // URL de votre backend Flask

  constructor(private http: HttpClient) {}

  sendPrefilledPaths(paths: string[]): Observable<any> {
    return this.http.post(this.apiUrl, { mobbin_names: paths });
  }
}
