import { Component, AfterViewInit,signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('dashboard');

  ngAfterViewInit(): void {
    this.createChart1();
    this.createChart2();
    this.createChart3();
  }
  createChart1(): void {
    new Chart('chart1', {
      type: 'bar',

      data: {
        labels: [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L'
        ],

        datasets: [{
          label: 'Temperatura',
          data: [12, 25, 18, 32, 20, 27,12, 25, 18, 32, 20, 27]
        }]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }


  createChart2(): void {
    new Chart('chart2', {
      type: 'bar',

      data: {
        labels: [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F'
        ],

        datasets: [{
          label: 'Vlaznost',
          data: [15, 22, 17, 28, 19, 25]
        }]
      },
      

      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  createChart3(): void {
    new Chart('chart3', {
      type: 'line',

      data: {
        labels: [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F'
        ],

        datasets: [{
          label: 'Osvetljenje',
          data: [20, 35, 28, 42, 31, 45],
          fill: true,
          tension: 0.4
        }]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
