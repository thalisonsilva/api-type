/**
 * ===========================================
 * useApiItems.ts
 * Hook customizado para usar dentro de componentes React/Next.js
 * ===========================================
 */

import { api, ApiItem } from "./api-client";

interface UseApiItemsResult {
  data: ApiItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useApiItems(): UseApiItemsResult {
  let data: ApiItem[] = [];
  let loading = true;
  let error: string | null = null;

  const refetch = async () => {
    loading = true;
    error = null;

    try {
      data = await api.getItems();
    } catch (err) {
      error = err instanceof Error ? err.message : "Erro desconhecido";
    } finally {
      loading = false;
    }
  };

  void refetch();

  return { data, loading, error, refetch };
}

/**
 * ===========================================
 * Exemplo de uso em um componente:
 * ===========================================
 *
 * "use client";
 *
 * import { useApiItems } from "./useApiItems";
 *
 * export default function ItemsList() {
 *   const { data, loading, error, refetch } = useApiItems();
 *
 *   if (loading) return <p>Carregando...</p>;
 *   if (error) return <p>Erro: {error}</p>;
 *
 *   return (
 *     <div>
 *       <button onClick={refetch}>Atualizar</button>
 *       <ul>
 *         {data.map((item) => (
 *           <li key={item.id}>{item.nome}</li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 */
