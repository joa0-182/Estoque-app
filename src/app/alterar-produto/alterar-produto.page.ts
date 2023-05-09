import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-alterar-produto',
  templateUrl: './alterar-produto.page.html',
  styleUrls: ['./alterar-produto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AlterarProdutoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
