import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products';
import { take } from 'rxjs';
import { IProductResponse } from '../../interfaces/product-response';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../services/search';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: IProductResponse[] = [];
  filteredProducts: IProductResponse[] = [];
  filterForm = new FormGroup({
    status: new FormControl(''),
  });

  private readonly _productsService = inject(ProductsService);
  private readonly _searchService = inject(SearchService);

  ngOnInit() {
    this._productsService.getProducts().pipe(take(1)).subscribe({
      next: (response) => {
        this.products = response.data;
        this.filterProducts();
      },
    });

    this._searchService.searchTerm$.subscribe(() => {
      this.filterProducts();
    });
  }

  filterProducts() {
    const title = this._searchService.getSearchTerm().toLowerCase();
    const status = this.filterForm.value.status?.toLowerCase();

    this.filteredProducts = this.products.filter((product) => 
      (!title || product.title.toLowerCase().includes(title)) &&
      (!status || product.status.toLowerCase().includes(status))
    );
  }

  clearFilter() {
    this.filterForm.reset();
    this.filterForm.get('status')?.setValue('');
    this._searchService.setSearchTerm('');

    this.filteredProducts = this.products;
  }
}
