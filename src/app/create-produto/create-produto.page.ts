import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { ProdutosService } from '../services/produtos.service';
import { Produto } from '../models/Produto.models';

@Component({
  selector: 'app-create-produto',
  templateUrl: './create-produto.page.html',
  styleUrls: ['./create-produto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class CreateProdutoPage implements OnInit {

  nomeProduto = '';
  descricao = '';
  preco = 0
  nome_imagem = '';

  constructor(private produtoService: ProdutosService, private route:Router ) { }

  ngOnInit() {
  }

  salvar(){ 
     const produto: Produto = {
        nomeProduto: this.nomeProduto,
        descricao: this.descricao,
        preco: this.preco,
        nome_imagem: this.nome_imagem
     };
     this.produtoService.create(produto).subscribe((dados) => {
       window.alert(`Concluido com exito!\nId Produto: ${dados.id}\nProduto inserido: ${dados.nomeProduto}`);
       this.route.navigateByUrl('/lista-produtos')
     });
    
  }


}
