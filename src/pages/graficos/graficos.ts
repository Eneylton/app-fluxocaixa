import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import chartJs from 'chart.js';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-graficos',
  templateUrl: 'graficos.html',
})
export class GraficosPage {

  @ViewChild('barCanvas') barCanvas;

  barChart: any;
  tipo:any;
  total:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public server: ServiceProvider) {
  }

  ngAfterViewInit() {

    setTimeout(() => {
    
      this.barChart = this.getBarChart();

    }, 150);
  
  }

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType,
    });
  }


  getBarChart() {

    let body = {
      crud: 'listar_grafico_pagamento'
    }
    
    this.server.postData(body, 'Caixa.php').subscribe(data =>{

      for (let i = 0; i < data.result.length; i++){

        var labels = data.result.map(function(e) {
        return e.descricao;
        });
  
         var data2 =data.result.map(function(e) {
        return e.total;
        });
  
        console.log(labels);
  
      }
  
        const resultados = {
          
       
          labels:labels,
          datasets: [{
            label: 'Estatística',
            data: data2,
            backgroundColor: [
              '#1761b78c',
              '#0ddc6a99',
              '#fbff0099',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              '#0ddc6a99',
              '#1761b78c',
              '#fbff0099',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        };
        const options = {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        };
    
        return this.getChart(this.barCanvas.nativeElement, 'bar', resultados, options);

      
    })


    }

    }


