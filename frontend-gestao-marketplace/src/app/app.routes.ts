import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Products } from './pages/products/products';
import { Layout } from './pages/layout/layout';
import { NewProduct } from './pages/new-product/new-product';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full' // necessário para redirecionar exatamente a rota vazia, se não,
    // qualquer rota que comece com '' redireciona para /login, causando loop infinito e tela em branco
  },
  {
    path: '',
    component: Layout, //component base para carregamento das rotas filhas, ele contem
    //o router-outlet para renderizar as rotas filhas baseadas no path
    canActivateChild: [authGuard], //guardas de rota para proteger as rotas filhas
    children: [
      {
        path: 'products',
        component: Products
      },
      {
        path: 'new-product',
        component: NewProduct,
      }
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  }
];
