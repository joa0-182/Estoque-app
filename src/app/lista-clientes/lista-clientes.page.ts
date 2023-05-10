import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Cliente } from '../models/Cliente.model';
import { ClientesService } from '../services/clientes.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.page.html',
  styleUrls: ['./lista-clientes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink],
})
export class ListaClientesPage {

listaClientes: Cliente[] = [];

  constructor(private clienteService: ClientesService, private router: Router, private alertController: AlertController) {}

  ionViewWillEnter() {
    this.buscarClientes();
  }

  buscarClientes(){
    this.clienteService.getAll().subscribe(dados => {
      this.listaClientes = dados;
    });
  }

  alterarCliente(id: number){
    this.router.navigateByUrl(`/alterar-cliente/${id}`);
  }

  excluirCliente(id: number){
    this.clienteService.delete(id).subscribe(() => {
      this.listaClientes = this.listaClientes.filter(p => p.id !==id);
    });
  }

  async confirmarExclusao(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir esse cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.excluirCliente(id);
          }
        }
      ]
    });

    await alert.present();
  }
}
