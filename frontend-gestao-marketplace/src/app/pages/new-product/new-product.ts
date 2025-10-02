import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css'
})
export class NewProduct {


  productImageBase64 = '';
  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(0,[Validators.required]),
    description: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
  })

saveProduct() {
  console.log('productForm', this.productForm);

  if(this.productForm.invalid || !this.productImageBase64) return;


}

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;

  if(input.files && input.files.length > 0){
    const file = input.files[0];

    this.convertFileToBase64(file);
  }
}
  convertFileToBase64(file: File) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    //não tem na aula, mas o copilot sugeriu e funcionou

    reader.onload = (e: any) => {
      const imageBase64 = e.target.result as string;

      this.productImageBase64 = imageBase64;

      console.log(imageBase64)
    }

    reader.onerror = (_) => {
      this.productImageBase64 = '';
    }

    reader.readAsDataURL = (file) => {

    }
  }

}
