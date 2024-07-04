import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/Order';
import { Product } from '../../interfaces/product';


@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule,
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
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css'
})
export class ManageOrdersComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  orders: Order[] = [];
  

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.orderService.getOrders().subscribe((orders: any) => {
      this.orders = orders;
    });
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id);
    });
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }

  // onFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLSelectElement).value;
  //   if (filterValue) {
  //     this.filteredProducts = this.products.filter(
  //       (product) => product.category === filterValue
  //     );
  //   } else {
  //     this.filteredProducts = this.products;
  //   }
  // }

}
