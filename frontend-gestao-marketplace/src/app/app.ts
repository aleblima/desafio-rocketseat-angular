import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  //Como estava de forma manual o carregamento, os componentes Login, Header, Products, NewProduct
  // tinham que ser importados e declarados no imports
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
