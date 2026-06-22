interface UseApiItemsResult {
    data: ApiItem[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}
