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
  mensagemErro: string | undefined;

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
    this.fecharMensagemErro();

    this.service.agendar(this.novaTransferencia).subscribe({
      next: (t) => {
        if (
          isNaN(this.novaTransferencia.contaOrigem) ||
          isNaN(this.novaTransferencia.contaDestino)
        ) {
          this.mensagemErro = 'As contas devem conter apenas números.';
          return;
        }
        this.transferencias.push(t);
        this.novaTransferencia = {
          contaOrigem: 0,
          contaDestino: 0,
          valor: 0,
          dataTransferencia: '',
        };
      },
      error: (err) => {
        console.log('Erro: ' + err);
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

  bloquearTeclasInvalidasConta(event: KeyboardEvent) {
    const teclasInvalidas = ['e', 'E', '+', '-', '.', ','];
    if (teclasInvalidas.includes(event.key)) {
      event.preventDefault();
    }
  }

  bloquearTeclasInvalidasValor(event: KeyboardEvent) {
    const teclasInvalidas = ['e', 'E', '+', '-'];
    if (teclasInvalidas.includes(event.key)) {
      event.preventDefault();
    }
  }
}
