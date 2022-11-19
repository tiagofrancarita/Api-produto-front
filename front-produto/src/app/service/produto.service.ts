import { Produto } from './../model/produto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private _URL = environment.url ='produtos'

  constructor(private http: HttpClient) { }

  buscarTodos(){

    return this.http.get<Produto[]>(this._URL);


  }

  salvar(produto: Produto){

    return this.http.post<Produto>(this._URL, produto);

  }

  remover(id: number){

    return this.http.delete(`${this._URL}/${id}`);

  }
}
