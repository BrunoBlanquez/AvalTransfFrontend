export interface Transferencia {
  contaOrigem: number;
  contaDestino: number;
  valor: number;
  dataTransferencia: string;
  dataAgendamento?: string;
  taxa?: number;
}
