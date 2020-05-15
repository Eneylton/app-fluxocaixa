import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import chartJs from 'chart.js';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-grafico2',
  templateUrl: 'grafico2.html',
})
export class Grafico2Page {
  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public server: ServiceProvider) {
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.doughnutChart = this.getDoughnutChart();

    }, 150);
  
  }

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType,
    });
  }

  getDoughnutChart() {

    let body = {
      crud: 'listar_grafico_categoria'
    }
    
    this.server.postData(body, 'Caixa.php').subscribe(data =>{

      for (let i = 0; i < data.result.length; i++){

        var labels = data.result.map(function(e) {
        return e.descricao;
        });
  
         var data2 =data.result.map(function(e) {
        return e.total;
        });
  
      }
  
    const Resultados = {
      labels: labels,
      datasets: [{
        label: 'Categorias',
        data: data2,
        backgroundColor: [
          '#73c507',
          '#ff5d12',
          '#0594b6',
          '#3b005d',
          '#ff4127',
          '#f8e004'
        ],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56']
      }]
    };

    return this.getChart(this.doughnutCanvas.nativeElement, 'doughnut', Resultados);
  })
}
  
}
