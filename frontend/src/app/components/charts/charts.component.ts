import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartOptions: ChartOptions = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad'
    },
    hover: {
      mode: 'nearest',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };

  public productData: ChartDataset<'line'>[] = [
    { data: [120, 150, 180, 90], label: 'products' }
  ];
  public productLabels = ['Electronics', 'Clothing', 'Home Appliances', 'Books'];
  public salesData = [{data: [300, 500, 400, 700], label: 'sales'}];
  public salesLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  public customersData = [{data: [200, 400, 600, 700, 800], label: 'customers'}];
  public customersLabels = ['January', 'February', 'March', 'April'];
  public ordersLabels = ['Pending', 'Shipped', 'Delivered', 'Returned'];

  ngOnInit() {
    this.addHoverEffect();
  }

  private addHoverEffect() {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('mouseenter', () => {
        this.triggerChartUpdate();
      });
    }
  }

  private triggerChartUpdate() {
    if (this.chart && this.chart.chart) {
      // Trigger a re-render by updating the data slightly
      this.productData[0].data = [...this.productData[0].data]; // Shallow copy to trigger change detection
      this.chart.chart.update();
    }
  }
}




// public chartOptions: ChartOptions = {
//   responsive: true,
// };
// public chartLabels: string[] = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
// public chartType: string = 'bar';
// public chartLegend = true;
// public chartPlugins = [];

// public chartData: ChartDataset[] = [
//   { data: [12, 19, 3, 5, 2, 3], label: 'Series A' }
// ];