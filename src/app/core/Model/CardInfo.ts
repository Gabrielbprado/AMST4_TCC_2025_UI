export interface CardInfo {
    cardholder: {
      name: string;
      identification: {
        number: string; // "42232883850"
        type: string;   // "CPF"
      };
    };
    customerId: string | null;  // Pode ser null, como no seu exemplo
    firstSixDigits: string;    // "411111"
    lastFourDigits: string;    // "1111"
    expirationMonth: number;   // 12
    expirationYear: number;    // 2025
    issuer: {
      id: number;              // 25
      name: string;            // "Visa"
    };
    paymentMethod: {
      id: string;              // "visa"
      name: string;            // "Visa"
      paymentTypeId: string;   // "credit_card"
      thumbnail: string;       // URL da imagem
      secureThumbnail: string; // URL da imagem segura
    } | null;  // Pode ser null, como no seu exemplo
  }
  