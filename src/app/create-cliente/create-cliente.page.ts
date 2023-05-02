import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Cliente } from '../models/Cliente.model';
import { ClientesService } from '../services/clientes.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.page.html',
  styleUrls: ['./create-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class CreateClientePage implements OnInit {

  nome = '';
  email = '';
  senha = '';
  validarSenha = '';


  constructor(private clienteService: ClientesService, private route:Router) { }

  ngOnInit() {
  }

  salvar(){ 
    if(this.senha === this.validarSenha) {
      const cliente: Cliente = {
        nome: this.nome,
        email: this.email,
        senha: this.senha
      };
      this.clienteService.create(cliente).subscribe((dados) => {
        window.alert(`Cliente inserido: ${dados.id}`);
        this.route.navigateByUrl('/home');
      });
    } else {
      window.alert('Senha não conferem');
    }
  }

}
