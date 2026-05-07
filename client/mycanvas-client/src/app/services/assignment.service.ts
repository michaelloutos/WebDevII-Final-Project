import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment } from '../interfaces/assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private apiUrl = 'https://mycanvas-api.onrender.com/api/assignments';

  constructor(private http: HttpClient) {}

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.apiUrl);
  }

  createAssignment(assignment: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(this.apiUrl, assignment);
  }

  updateAssignment(id: string, assignment: Partial<Assignment>): Observable<Assignment> {
    return this.http.put<Assignment>(`${this.apiUrl}/${id}`, assignment);
  }

  deleteAssignment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}