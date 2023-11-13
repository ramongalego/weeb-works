declare module '*.svg' {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_DATABASE_ID: string;
  readonly VITE_WATCHLIST_COLLECTION_ID: string;
  readonly VITE_FAVORITES_COLLECTION_ID: string;
  readonly VITE_APPWRITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
