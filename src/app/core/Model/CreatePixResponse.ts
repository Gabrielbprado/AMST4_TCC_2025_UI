export interface CreatePixResponse
{
    transactionId: number;
  transactionAmount: number;
  status: string;
  description: string;
  qrCode: string;
  qrCodeBase64: string;
  expirationDate: string;
  ticketUrl: string;
}