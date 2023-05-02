import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/Cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url ='http://localhost:3000/clientes'

  constructor(private http: HttpClient) { }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.url, cliente).pipe(
      map(retorno => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  getAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url).pipe(
      map(retorno => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  getOne(id: number){
    return this.http.get(`${this.url} / ${id}}`);
  }

  update(cliente: Cliente){
    return this.http.put(`${this.url} / ${cliente.id}`, cliente);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  login(){}

  loggout(){}


  exibirErro(erro: any): Observable<any>{
    alert('Deu Erro!!!!!');
    console.log(erro);
    return EMPTY;
  }
}
