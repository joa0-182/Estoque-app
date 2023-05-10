import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProdutosService } from '../services/produtos.service';
import { Produto } from '../models/Produto.models';

@Component({
  selector: 'app-alterar-produto',
  templateUrl: './alterar-produto.page.html',
  styleUrls: ['./alterar-produto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class AlterarProdutoPage implements OnInit {

  id = 0;
  nomeProduto = '';
  descricao = '';
  preco = 0;
  nome_imagem = '';


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutosService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.produtoService.getOne(this.id).subscribe(retorno => {
      this.nomeProduto = retorno.nomeProduto as string;
      this.descricao = retorno.descricao ? retorno.descricao : '';
      this.preco = retorno.preco ? retorno.preco : 0;
    })
  }
  salvar(){
    const produto: Produto = {
      id: this.id,
      nomeProduto: this.nomeProduto,
      descricao: this.descricao,
      preco: this.preco,
      nome_imagem: this.nome_imagem
   };
   this.produtoService.update(produto).subscribe((dados) =>
   {
     window.alert(`Concluido com exito!\nProduto alterado: ${dados.id} -> ${dados.nomeProduto}`);
     this.router.navigateByUrl('/lista-produtos')
   });
  }

}
