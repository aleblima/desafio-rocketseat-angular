import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthSucessResponse } from '../interfaces/auth-sucess-response';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root' //99% dos services usam providedIn root para serem singleton e acessiveis em toda a aplicacao
})
export class UserService { //foi alterado para UserService para facilitar entendimento, poderia ser so User
  private readonly _httpClient = inject(HttpClient);
//  o _httpClient é uma propriedade que esta armazenando
//  a instancia do HttpClient e o inject faz a injeção de dependencia, ambos tem q ser importados
validateUser(): Observable<IAuthSucessResponse> {
  // O observable foi inserido aqui só para visualização, mesmo que não estivesse a vista,
  // ele ainda seria utilizado, já que foi definido no metodo get do HttpClient
  return this._httpClient.get<IAuthSucessResponse>('http://localhost:3000/api/protected')
  //importar o IAuthSucessResponse da interface criada,
  // baseada na resposta da API via insomnia para receber o tipo de dado correto.
  //Você chama o metodo e se inscreve no retorno(observable), para que a chamada http seja disparada
}
}
