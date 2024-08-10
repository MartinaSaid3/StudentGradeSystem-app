import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Student from '../Types/Student';
import { HttpClient } from '@angular/common/http';
import Grade from '../Types/Grade';
import { ServiceResult } from '../Types/ServiceResult';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:5001/api';

  constructor(private client: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.client.get<Student[]>(`https://localhost:44323/api/Students`);
  }

  getStudent(id: number): Observable<Student> {
    return this.client.get<Student>(`https://localhost:44323/api/Students/${id}`);
  }

  addStudent(student: Student): Observable<ServiceResult<null>> {
    return this.client.post<ServiceResult<null>>(`https://localhost:44323/api/Students`, student);
  }


  updateStudent(id: number, student: Student): Observable<ServiceResult<null>> {
    return this.client.put<ServiceResult<null>>(`https://localhost:44323/api/Students/${id}`, student);
  }

  deleteStudent(id: number): Observable<Student> {
    return this.client.delete<Student>(`https://localhost:44323/api/Students/${id}`);
  }

  updateGrade(studentId: number, subject: string, grade: Grade): Observable<any> {
    return this.client.put(`https://localhost:44323/api/Grade/${studentId}`, grade);
  }
}

