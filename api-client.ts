/**
 * ===========================================
 * api-client.ts
 * Exemplo genérico de cliente de API em TypeScript
 * Pode ser usado em projetos React / Next.js
 * ===========================================
 */

// 1) Configuração base da API
// Troque pela URL real da sua API quando tiver
const API_BASE_URL = (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) || "https://api.exemplo.com";

// 2) Tipos genéricos de exemplo
// Substitua pelos campos reais que sua API retorna
export interface ApiItem {
  id: number;
  nome: string;
  descricao?: string;
}

// 3) Função genérica para fazer requisições
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      // Se a API exigir autenticação, adicione aqui:
      // "Authorization": `Bearer ${token}`,
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

// 4) Funções específicas para cada operação (CRUD)
export const api = {
  // GET - buscar lista de itens
  getItems: () => request<ApiItem[]>("/items"),

  // GET - buscar um item específico
  getItemById: (id: number) => request<ApiItem>(`/items/${id}`),

  // POST - criar novo item
  createItem: (data: Omit<ApiItem, "id">) =>
    request<ApiItem>("/items", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // PUT - atualizar item existente
  updateItem: (id: number, data: Partial<ApiItem>) =>
    request<ApiItem>(`/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // DELETE - remover item
  deleteItem: (id: number) =>
    request<void>(`/items/${id}`, {
      method: "DELETE",
    }),
};
