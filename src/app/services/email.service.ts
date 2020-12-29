import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const urlApi = `http://localhost:3000/api`;
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {}

  enviarFormulario( campos ){
    return this.http.post(`${ urlApi }/email`, campos);
  }

}
