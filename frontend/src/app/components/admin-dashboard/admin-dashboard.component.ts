import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { Router, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [
    Component,
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  formVisible: boolean = false;
  isEditing: boolean = false;
  productForm: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [
        '',
        [
          Validators.required,
          Validators.pattern(/https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)/),
        ],
      ],
      stock: ['', [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  toggleForm(): void {
    this.formVisible = !this.formVisible;
  }

  addOrUpdateProduct(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if (this.isEditing) {
        this.productService.editProduct(product).subscribe(() => {
          this.loadProducts();
          this.resetForm();
        });
      } else {
        this.productService.addProduct(product).subscribe(() => {
          this.loadProducts();
          this.resetForm();
        });
      }
    }
  }

  editProduct(product: Product): void {
    this.productForm.setValue({
      id: product.id,
      name: product.name,
      shortDescription: product.description,
      price: product.price,
      image: product.image,
      stock: product.stock,
      category: product.category,
    });
    this.isEditing = true;
    this.formVisible = true;
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  resetForm(): void {
    this.productForm.reset();
    this.isEditing = false;
    this.formVisible = false;
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }

  onFilter(event: Event): void {
    const filterValue = (event.target as HTMLSelectElement).value;
    if (filterValue) {
      this.filteredProducts = this.products.filter(
        (product) => product.category === filterValue
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
}
