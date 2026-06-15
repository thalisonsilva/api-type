/**
 * ===========================================
 * useApiItems.ts
 * Hook customizado para usar dentro de componentes React/Next.js
 * ===========================================
 */

import { useState, useEffect } from "react";
import { api, ApiItem } from "./api-client";

interface UseApiItemsResult {
  data: ApiItem[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useApiItems(): UseApiItemsResult {
  const [data, setData] = useState<ApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const items = await api.getItems();
      setData(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
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
