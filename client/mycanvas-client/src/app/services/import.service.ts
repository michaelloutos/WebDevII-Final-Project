import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ImportRecord } from '../interfaces/import';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  private apiUrl = 'http://localhost:3000/api/imports';

  constructor(private http: HttpClient) {}

  getImports(): Observable<ImportRecord[]> {
    return this.http.get<ImportRecord[]>(this.apiUrl);
  }

  createImport(importRecord: ImportRecord): Observable<ImportRecord> {
    return this.http.post<ImportRecord>(this.apiUrl, importRecord);
  }
}