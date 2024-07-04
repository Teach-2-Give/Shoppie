<<<<<<< HEAD
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component'; // Ensure this import

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [CommonModule, RouterOutlet, SidebarComponent, AdminNavbarComponent] // Ensure this import
})
export class AdminDashboardComponent {}
=======
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
import { ChartsComponent } from '../charts/charts.component';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [
    
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
    ChartsComponent,NotificationComponent
  ],
})
export class AdminDashboardComponent implements OnInit {
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';


  isLoading: boolean = false;
  images: string []  = [];
  imageUrl = ''
  

  products: Product[] = [];
  filteredProducts: Product[] = [];
  formVisible: boolean = false;
  isEditing: boolean = false;
  productForm: FormGroup;
  
  
  constructor(private productService: ProductService, private fb: FormBuilder, private notificationService: NotificationService) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [''],
      // image: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.pattern(/https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)/),
      //   ],
      // ],
      // stock: ['', [Validators.required, Validators.min(0)]],
      categoryId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.resetForm();
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  resetForm(): void {
    this.productForm.reset();
    this.isEditing = false;
    this.formVisible = false;
  }

  toggleForm(): void {
    this.formVisible = !this.formVisible;
    this.productForm.reset();
  }

  addOrUpdateProduct(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if (this.isEditing) {
        this.productService.editProduct(product).subscribe(
          () => {
            this.loadProducts();
            this.toggleForm();
            this.notificationService.showNotification('Product updated successfully!', 'success');
          },
          (error) => {
            console.error('Error updating product:', error);
            this.notificationService.showNotification('Error updating product', 'error');
          }
        );
      } else {
        this.productService.addProduct(product).subscribe(
          () => {
            this.loadProducts(); 
            this.toggleForm();
            this.notificationService.showNotification('Product added successfully!', 'success');
          },
          (error) => {
            console.error('Error adding product:', error);
            this.notificationService.showNotification('Error updating product', 'error');
          }
        );
      }
      this.resetForm();
    }
  }

  editProduct(product: Product): void {
    this.productForm.patchValue({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      // stock: product.stockQuantity,
      category: product.categoryId,
    });
    this.isEditing = true;
    this.formVisible = true;
    

  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.loadProducts();
        this.notificationService.showNotification('Product deleted successfully!', 'success');
      },
      (error) => {
        console.error('Error deleting product:', error);
        this.notificationService.showNotification('Error deleting product', 'error');
      }
    );
  }

 


  getImagesUrl(event: any): void {
    this.isLoading = true;
    const files = event.target.files;

    if (files) {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "shoppie");
      formData.append("cloud_name", "dd8vdf9tf");

      fetch('https://api.cloudinary.com/v1_1/dd8vdf9tf/image/upload', {
        method: "POST",
        body: formData
      })
      .then(res => res.json())
      .then(res => {
        this.images.push(res.url);
        console.log(this.images);
        this.isLoading = false;
        this.productForm.patchValue({ image: res.url });
      })
      .catch(error => {
        console.error('Error uploading image:', error);
        this.isLoading = false;
        this.notificationService.showNotification('Error uploading image', 'error');
      });
    }
  }

  showNotification(message: string, type: 'success' | 'error'): void {
    this.notificationMessage = message;
    this.notificationType = type;
  }


  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }


  onFilter($event: Event) {
    throw new Error('Method not implemented.');
    }
  // onFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLSelectElement).value;
  //   if (filterValue) {
  //     this.filteredProducts = this.products.filter(
  //       (product) => product.categoryId === filterValue
  //     );
  //   } else {
  //     this.filteredProducts = this.products;
  //   }
  // }
}
// dd8vdf9tf
>>>>>>> ededce58ea6eba6ed43bebbc68bc23a5590b3815
