import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user';
import { UserAuthService } from '../../services/user-auth';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  //para usar o form group no html tem que importar o reactive forms module
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  //os parenteses são os construtores e as chaves são o objeto
  loginErrorMessage = '';
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    //colocando validadores, required é para verificar se o campo está vazio
    password: new FormControl('', [Validators.required])
  });

  //injetando o userService, geralmente o service(injeção) vem após as propriedades da classe
  private readonly _userService = inject(UserService);
  private readonly _userAuthService = inject(UserAuthService);
  private readonly _router = inject(Router);

  login() {
    if(this.userForm.invalid) return;

    //fazer a invocação do método de login
    //depois tem que se inscrever no observable
    this._userService.login(
    this.userForm.get('email')?.value as string,
    this.userForm.get('password')?.value as string).pipe(take(1)).subscribe({
    //nos parametros ele precisou acessar o formulário para pegar as propriedades de email e senha
      next: (response) => {
        this.loginErrorMessage = '';
        //salvar o token no localstorage
        this._userAuthService.setUserToken(response.data.token);


        //redirecionamento para tela de produtos
        this._router.navigate(['/products']);

      },
      error: (error) => {
        this.loginErrorMessage = error.error.message;
      },
    })

}
}
