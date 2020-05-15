import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import chartJs from 'chart.js';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-pizza',
  templateUrl: 'pizza.html',
})
export class PizzaPage {


  @ViewChild('pieCanvas') pieCanvas;

  pieChart: any;
  caixas: Array<Object> = [];
  sexo: string;
  total_r: any;
  total_d: any;
  total_g: any;
  somatotal: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public serve: ServiceProvider) {

                this.total_g = 0;
              


  }

  ionViewDidLoad() {

   this.totalReceita();
   this.totalDespesas();
   this.totalGeral();
  }


  totalReceita() {
    let body ={
      crud:'listar_Receita'
    }

    this.serve.postData(body,'Caixa.php').subscribe(data =>{
      let total = 0;
      for(let i = 0; i < data.result.length; i++){

        total += parseFloat(data.result[i]["valor"]);

      }

      this.total_r = total;

    })

  }

  totalGeral() {
    let body ={
      crud:'listar_total_geral'
    }

    this.serve.postData(body,'Caixa.php').subscribe(data =>{
      let total = 0;
      for(let i = 0; i < data.result.length; i++){

        total += parseFloat(data.result[i]["valor"]);

      }

      this.total_g = total;

    })

  }


  totalDespesas() {
    let body ={
      crud:'listar_Despesas'
    }

    this.serve.postData(body,'Caixa.php').subscribe(data =>{
      let total = 0;
      for(let i = 0; i < data.result.length; i++){

        total += parseFloat(data.result[i]["valor"]);

      }

      this.total_d = total;

    })

  }

  

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType,
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {

      this.pieChart = this.getPieChart();

    }, 350);
  }

  getPieChart() {

    let body = {

      crud: 'Listar_Grafico'

    }
    this.serve.postData(body, 'Caixa.php').subscribe(data => {
      for (let cx of data.result) {

        this.caixas.push({

          status: cx.status,
          total: cx.total
        })

        var labels = this.caixas.map(function (e) {
          return e["status"];
        });

        var total = this.caixas.map(function (e) {
          return e["total"];
        });

        console.log("CHEGOU AKI: --> ", labels);
        console.log("CHEGOU AKI: --> ", total);

      }

    const result = {
      labels: labels,
      datasets: [
        {
          data: total,
          backgroundColor: ['#ff0047', '#33ff00 ', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    return this.getChart(this.pieCanvas.nativeElement, 'pie', result);

  })
}

openCadastro(){

  this.navCtrl.push('HomePage');
}

openGraficoBar(){
  this,this.navCtrl.push('GraficosPage')
}

openGraficoDonout(){
  this,this.navCtrl.push('Grafico2Page');
}

}

