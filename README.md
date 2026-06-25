# TypeScript API Client (React/Next.js)

Generic example of a REST API integration using TypeScript, built for React or Next.js projects.

## 📁 Files

- **`api-client.ts`** — API client with functions for GET, POST, PUT, and DELETE.
- **`useApiItems.ts`** — Custom React hook (`useApiItems`) to consume the API inside components.


## ⚙️ Setup

1. Set your API URL by creating a `.env.local` file at the project root:

```env
NEXT_PUBLIC_API_URL=https://your-api.com //"http://localhost:3000/api"
```

2. Update the `ApiItem` interface in `api-client.ts` with the fields your API actually returns. Current example:

```ts
export interface ApiItem {
  id: number;
  name: string;
  description?: string;
}
```

3. Update the endpoints (`/items`, `/items/:id`) in `api-client.ts` to match your API.

## 🚀 Usage

### Fetching data in a component

```tsx
"use client";

import { useApiItems } from "./useApiItems";

export default function ItemsList() {
  const { data, loading, error, refetch } = useApiItems();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Creating, updating, or deleting items

```ts
import { api } from "./api-client";

// Create
await api.createItem({ name: "New item" });

// Update
await api.updateItem(1, { name: "Updated item" });

// Delete
await api.deleteItem(1);
```

## 🔐 Authentication (optional)

If your API requires token-based authentication, add the header inside the `request` function in `api-client.ts`:

```ts
headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
}
```

## 📌 Next steps

- Replace `API_BASE_URL` with your actual API URL.
- Update the types (`ApiItem`) and endpoints according to your API documentation.
- Add specific error handling if needed (e.g., 401, 404).
