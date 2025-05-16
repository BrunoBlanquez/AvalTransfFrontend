import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transferencia } from '../../models/transferencia';
import { TransferenciasService } from '../../services/transferencias.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agendamentos',
  imports: [CommonModule, FormsModule],
  templateUrl: './agendamentos.component.html',
  styleUrl: './agendamentos.component.css',
})
export class AgendamentosComponent {
  novaTransferencia: Transferencia = {
    contaOrigem: 0,
    contaDestino: 0,
    valor: 0,
    dataTransferencia: '',
  };

  erro: string | null = null;

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
          contaOrigem: 0,
          contaDestino: 0,
          valor: 0,
          dataTransferencia: '',
        };
      },
      error: (err) => {
        console.log('Erro: ' + err.error);
        this.erro = err?.error || 'Erro ao agendar transferência.';
      },
    });
  }

  fecharMensagemErro() {
    this.novaTransferencia = {
      contaOrigem: 0,
      contaDestino: 0,
      valor: 0,
      dataTransferencia: '',
    };
    this.erro = null;
  }
}
