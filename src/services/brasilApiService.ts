export interface BrasilApiCnpj {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  cep: string;
  uf: string;
  municipio: string;
  bairro: string;
  logradouro: string;
  numero: string;
  ddd_telefone_1?: string;
  email?: string;
  descricao_situacao_cadastral?: string;
}

export async function fetchCnpj(cnpj: string): Promise<BrasilApiCnpj | null> {
  try {
    const cleanCnpj = cnpj.replace(/\D/g, ""); 
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`);
    if (!response.ok) throw new Error("Erro ao buscar CNPJ");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar CNPJ:", error);
    return null;
  }
}
