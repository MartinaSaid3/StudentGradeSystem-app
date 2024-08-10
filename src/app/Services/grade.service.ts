import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Grade from '../Types/Grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private apiUrl = 'https://localhost:5001/api';

  constructor(private client: HttpClient) { }

  getGrades(): Observable<Grade[]> {
    return this.client.get<Grade[]>(`https://localhost:44323/api/Grade`);
  }
}
