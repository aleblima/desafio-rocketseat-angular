import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { UserService } from "../services/user";
import { UserAuthService } from "../services/user-auth";

export const authGuard: CanActivateFn = async(route, state) => {
  //requisição para o endpoint "protected", pegar o token do usuário e verificar se existe
  //se existir, fazer a requisição pro protected, se não, redireciona para a tela de login.
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  //não possui token
  const Has_token = _userAuthService.getUserToken();
  if (!Has_token) {
    return _router.navigate(['/login']);
  }

  try {
    //tranformar o observable em uma promise para usar async/await
    // tenta valida o token fazendo a requisição para o backend
    await firstValueFrom(_userService.validateUser());

    //se o token for valido e a rota for diferente de login, deixa passar
    return true;

  } catch (error) {
    //se o token for invalido, redireciona para a tela de login
    return _router.navigate(['/login']);
  }

};

