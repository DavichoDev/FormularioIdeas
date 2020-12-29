import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
const urlApi = `http://localhost:3000/api`;
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  

  constructor(private http: HttpClient) {}

  enviarFormulario( campos ){
    return this.http.post(`${ urlApi }/email`, campos);
  }

  enviarImg( img ){

    let formData = new FormData();
    formData.append('img', img);

    return this.http.post(`${ urlApi }/uploads/img`, formData).pipe(
      map( (response: any) => response.img )
    );
  }

}
