import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transferencia } from '../../models/transferencia';
import { TransferenciasService } from '../../services/transferencias.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agendamentos',
  imports: [CommonModule, FormsModule],
  templateUrl: './agendamentos.component.html',
  styleUrl: './agendamentos.component.css'
})
export class AgendamentosComponent {
  novaTransferencia: Transferencia = {
    contaOrigem: '',
    contaDestino: '',
    valor: 0,
    dataTransferencia: ''
  };

  transferencias: Transferencia[] = [];

  constructor(private service: TransferenciasService) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe((dados) => {
      this.transferencias = dados;
    });
  }

  agendar() {
    this.service.agendar(this.novaTransferencia).subscribe({
      next: (t) => {
        this.transferencias.push(t);
        this.novaTransferencia = {
          contaOrigem: '',
          contaDestino: '',
          valor: 0,
          dataTransferencia: ''
        };
      },
      error: (err) => alert('Erro ao agendar transferência: ' + err.message)
    });
  }
}
