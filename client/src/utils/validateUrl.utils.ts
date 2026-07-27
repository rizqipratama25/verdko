const MARKETPLACES = [
    "tokopedia.com",
    "www.tokopedia.com",
    "tk.tokopedia.com"
];

export function isSupportedProductUrl(url: string) {
    try {
        const parsed = new URL(url);

        if (!MARKETPLACES.includes(parsed.hostname)) {
            return false;
        }

        const segments = parsed.pathname
            .split("/")
            .filter(Boolean);

        return segments.length >= 1;
    } catch {
        return false;
    }
}