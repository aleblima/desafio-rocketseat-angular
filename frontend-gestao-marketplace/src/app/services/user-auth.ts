import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// Vamos injetar esse serviço no interceptor para pegar o token do usuário
export class UserAuthService {
  getUserToken() {
    //implementar a lógica para pegar o token do usuário de onde ele estiver salvo,
    // neste caso no localStorage
    return '';
  }
}
