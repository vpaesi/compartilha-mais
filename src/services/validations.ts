export function validarNome(nome: string) {
  // Aceita apenas letras (maiúsculas e minúsculas) e espaços
  const regex = /^[A-Za-zÀ-ÿ\s]+$/;
  return regex.test(nome);
}

export function validarWhatsapp(whatsapp: string) {
  // Aceita formato (XX)XXXXX-XXXX
  const regex = /^\(\d{2}\)\d{5}-\d{4}$/;
  return regex.test(whatsapp);
}

export function aplicarMascaraWhatsapp(valor: string) {
  // Remove tudo que não é dígito
  valor = valor.replace(/\D/g, "");
  // Aplica a máscara
  if (valor.length > 11) valor = valor.slice(0, 11);
  if (valor.length > 6) {
    return `(${valor.slice(0, 2)})${valor.slice(2, 7)}-${valor.slice(7)}`;
  } else if (valor.length > 2) {
    return `(${valor.slice(0, 2)})${valor.slice(2)}`;
  } else {
    return valor;
  }
}

