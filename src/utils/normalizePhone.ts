function normalizePhone(phone: string): string {
  if (!phone) return "";

  // 1. Remove tudo que não seja número
  let cleaned = phone.replace(/\D/g, "");

  // 2. Se não começar com DDI, adiciona 55
  if (!cleaned.startsWith("55")) {
    cleaned = "55" + cleaned;
  }

  // 3. Remove o DDI para validar DDD+número
  const withoutDDI = cleaned.slice(2);

  // 4. Verifica se tem DDD (2 dígitos) + número (8 ou 9 dígitos)
  if (withoutDDI.length < 10 || withoutDDI.length > 11) {
    throw new Error("Número inválido.");
  }

  // 5. Verificar se é celular — celular sempre começa com 9
  // const ddd = withoutDDI.slice(0, 2);
  const numero = withoutDDI.slice(2);

  if (!numero.startsWith("9")) {
    throw new Error("Número não é celular válido (precisa começar com 9).");
  }

  if (numero.length !== 9) {
    throw new Error("Número de celular inválido (precisa ter 9 dígitos após o DDD).");
  }

  // 6. Retorna SEM + pois o WPP usa formato: 5511999999999
  return cleaned;
}

export default normalizePhone;
