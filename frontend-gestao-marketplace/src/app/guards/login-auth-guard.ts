import { CanActivateFn, Router } from "@angular/router";
import { UserAuthService } from "../services/user-auth";
import { inject } from "@angular/core";
import { UserService } from "../services/user";
import { firstValueFrom } from "rxjs";

export const loginAuthGuard: CanActivateFn = async (route, state) => {
  const _userAuthService = inject(UserAuthService);
  const _userService = inject(UserService);
  const _router = inject(Router);

  //se não possuir token, deixa passar para a tela de login
  const HAS_TOKEN = _userAuthService.getUserToken();
  if (!HAS_TOKEN) return true;

  try{
    await firstValueFrom(_userService.validateUser());
    //token valido, redireciona para a tela de produtos
    return _router.navigate(['/products']);
  } catch(error){
    //token invalido, deixa passar para a tela de login
    return true;
  }
};
