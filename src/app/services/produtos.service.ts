import { Observable, EMPTY, map, catchError } from 'rxjs';
import { Produto } from './../models/Produto.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  url ='http://localhost:3000/produtos'

  constructor(private http: HttpClient) { }



  create(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.url,produto).pipe(
      map(retorno => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  getAll(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.url).pipe(
      map(retorno => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  getOne(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.url}/${id}`).pipe(
      map(retorno => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  update(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>(`${this.url}/${produto.id}`,produto).pipe (
      map(retorno => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  exibirErro(erro: any): Observable<any> {
    alert('Deu erro no produto !!!')
    console.log(erro);
    return EMPTY;
  }
}

