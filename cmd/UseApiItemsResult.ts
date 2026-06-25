import { ApiItem } from "../API_BASE_URL";

interface UseApiItemsResult {
    data: ApiItem[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}
