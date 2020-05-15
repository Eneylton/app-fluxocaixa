import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';




@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  caixas:any = [];

  total:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public server: ServiceProvider, public toastyCrtl: ToastController) {

                this.caixas =  [];
            
  }

 
  ionViewDidLoad() {

    this.ListarCaixas();
    this.ListarTotal();

  }

  editar(id,pago){

    let body = {

      id:id,
      pago:pago,
      crud:'editar'
    }

    this.server.postData(body,'Caixa.php').subscribe(data =>{

      this.ListarTotal();
      const toast = this.toastyCrtl.create({
        message: 'Pagamento Realizado com Sucesso !!!!',
        duration: 3000
      });
      toast.present();

    })


  }

  ListarCaixas() {

    let body = {

      crud: 'listar_caixa'
    }
    
    this.server.postData(body,'Caixa.php').subscribe(data =>{
     
      for(let cx of data.result){
        
      
        this.caixas.push({

          id:               cx.id,
          dia_pagamento:    cx.dia_pagamento,
          descricao:        cx.descricao,
          pagamento:        cx.pagamento,
          valor:            cx.valor,
          pago:             Boolean(Number(cx.pago)),
          status:           Boolean(Number(cx.status)),

        })
      }

    })

  }

  ListarTotal(){

    let body ={
      crud: 'listar_total'
    }

    this.server.postData(body, 'Caixa.php').subscribe(data =>{
      let total = 0;
      for(let i =0; i < data.result.length; i++){
        total += parseFloat(data.result[i]["valor"]);
      }
      this.total = total;
    
    })
     

  }

  openCadastro(){

    this.navCtrl.push('CadCaixaPage');
  }

  openGrafico(){
    this.navCtrl.push('PizzaPage');
  }

}
