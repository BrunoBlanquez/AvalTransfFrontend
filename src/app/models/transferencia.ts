export interface Transferencia {
  contaOrigem: string;
  contaDestino: string;
  valor: number;
  dataTransferencia: string;  // formato ISO
  dataAgendamento?: string;
  taxa?: number;
}
