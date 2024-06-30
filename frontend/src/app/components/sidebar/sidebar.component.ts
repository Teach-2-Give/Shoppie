import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule, MatSidenavModule, MatToolbarModule, MatListModule,  RouterLink, RouterModule, AdminDashboardComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
  
})
export class SidebarComponent {}
