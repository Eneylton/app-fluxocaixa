import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-cad-caixa',
  templateUrl: 'cad-caixa.html',
})
export class CadCaixaPage {

  data_pagamento: number;
  pago: number;
  valor: any;
  status: any;
  pagamento_id: number;
  categoria_id: number;
  pagamentos:any = [];
  categorias:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public server: ServiceProvider,
    public toastyCrtl: ToastController, 
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.listarPagamentos();
    this.listrCategorias();
  }
  listrCategorias() {
    let body = {

      crud:'listar_categorias'
    }

    this.server.postData(body,'Caixa.php').subscribe(data=>{

      for(let item of data.result){
        this.categorias.push({
          id:item.id,
          descricao:item.descricao
        })
      }
    })

  }



  listarPagamentos() {
    let body = {

      crud:'listar_pagamentos'
    }

    this.server.postData(body,'Caixa.php').subscribe(data=>{

      for(let item of data.result){
        this.pagamentos.push({
          id:item.id,
          descricao:item.descricao
        })
      }
    })

  }

  cadastrar() {
    let body = {
      data_pagamento: this.data_pagamento,
      pago: this.pago,
      status: this.status,
      pagamento_id: this.pagamento_id,
      categoria_id: this.categoria_id,
      valor:this.valor,
      crud: 'adicionar'
    }

    this.server.postData(body, 'Caixa.php').subscribe(data => {
     
      this.showInsertOk();

    })

  }


  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Seu Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            this.navCtrl.setRoot('HomePage')
          }
        }
      ]
    });
    alert.present();
  }

}
