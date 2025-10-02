import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { UserAuthService } from "../services/user-auth";
//interceptor para adicionar o token em todas as requisições

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  //o req é uma cópia da requisição que for disparada e
  // o next vai repassar a requisição adiante para o proximo interceptor ou para o backend
  const _userAuthService =  inject(UserAuthService);

  const Has_token = _userAuthService.getUserToken();
  if (Has_token) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${Has_token}`)
      // esse req.headers.append cria um novo header baseado no que já existe
      // e adiciona o Authorization com o token
      //no insomnia, o token é verificado no console,
      // adicionado no header Authorization com o valor Bearer token
    });

    return next(newReq);
    //aqui o next repassa a requisição adiante, com os headers atualizados e o token
  }

  return next(req);
  //se não tiver token, repassa a requisição original
}
