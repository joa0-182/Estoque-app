import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Produto } from '../models/Produto.models';
import { ProdutosService } from '../services/produtos.service';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class ListaProdutosPage{

  handlerMessage = 'teste';
  roleMessage = 'teste';

  listaProdutos: Produto[] = [];

  constructor(private produtoService: ProdutosService, private router: Router, private alertController: AlertController) {}

  ionViewWillEnter() {
    this.buscarProdutos();
  }

  buscarProdutos(){
    this.produtoService.getAll().subscribe(dados => {
      this.listaProdutos = dados;
    });
  }

  alterarProduto(id: number){
    this.router.navigateByUrl(`/alterar-produto/${id}`);
  }

  excluirProduto(id: number) {
    this.produtoService.delete(id).subscribe(() => {
      this.listaProdutos = this.listaProdutos.filter(p => p.id !==id);
    });
  }

  async confirmarExclusao(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este produto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.excluirProduto(id);
          }
        }
      ]
    });

    await alert.present();
  }
}

