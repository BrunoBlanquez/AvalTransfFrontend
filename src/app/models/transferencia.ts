export interface Transferencia {
  contaOrigem: string;
  contaDestino: string;
  valor: number;
  dataTransferencia: string;
  dataAgendamento?: string;
  taxa?: number;
}
