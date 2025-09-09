export async function fetchJSON<T>(input: string, init?: RequestInit): Promise<T> {
    const res = await fetch(input, {
        cache: "no-store",
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(init?.headers || {}),
        },
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
    }

    if (res.status === 204) return undefined as unknown as T;
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
        const text = await res.text();
        try { return JSON.parse(text) as T; } catch {
            throw new Error("Expected JSON response but got: " + text.slice(0, 200));
        }
    }
    return (await res.json()) as T;
}