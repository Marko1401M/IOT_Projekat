import { Component, AfterViewInit,signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Chart from 'chart.js/auto';
import { ApiService } from './services/api-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('dashboard');
  maxTemperature = signal(0);
  averageTemperature = signal(0);
  maxHumidity = signal(0);
  averageHumidity = signal(0);
  maxLight = signal(0);
  constructor(private apiService: ApiService){}

  ngAfterViewInit(): void {

    this.apiService.getData().subscribe(data=> {
      console.log(data);
      
      data = [...data]
      .sort((a, b) =>
        new Date(a.time).getTime() - new Date(b.time).getTime()
      )
      .slice(-10);
      const labels = data.map(x=> new Date(x.time).toLocaleTimeString())
      
      const temperatures = data.map(x => x.temperature);
      const airHumidity = data.map(x => x.airHumidity); 
      const light = data.map(x => x.light)

      this.averageTemperature.set(Number((temperatures.reduce((sum, value)=> sum + value,0) / temperatures.length).toFixed(1)));
      this.maxTemperature.set( Number((Math.max(...temperatures)).toFixed(1)));

      this.maxHumidity.set(Number((Math.max(...airHumidity)).toFixed(2)));
      this.averageHumidity.set(Number((airHumidity.reduce((sum, value) => sum + value, 0) / airHumidity.length).toFixed(2)));

      this.maxLight.set(Number((Math.max(...light)).toFixed(2)));

      new Chart('chart1',{
        type:'line',
        data:{
          labels:labels,
          datasets:[
            {
              label:'Temperatura',
              data: temperatures,
              tension:0.4
            }
          ]
        },
        options:{
          responsive: true,
          maintainAspectRatio: false
        }
      });

      new Chart('chart2',{
        type:'line',
        data:{
          labels:labels,
          datasets:[
            {
              label:'Vlažnost vazduha',
              data: airHumidity,
              tension:0.4
            }
          ]
        },
        options:{
          responsive: true,
          maintainAspectRatio: false
        }
      });

      new Chart('chart3',{
        type:'line',
        data:{
          labels:labels,
          datasets:[
            {
              label:'Svetlost',
              data:light,
              tension:0.4
            }
          ]
        },
        options:{
          responsive: true,
          maintainAspectRatio: false
        }
      });
    })
    
    //this.createChart1();
    //this.createChart2();
    //this.createChart3();
  }
  createChart1(): void {
    new Chart('chart14', {
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
    new Chart('chart23', {
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
    new Chart('chart33', {
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
