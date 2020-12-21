export default class NullCacheEngine implements Cacheable {
    getItem(key: string): Promise<string | null> {
        return Promise.resolve(null);
    }
    
    removeItem(key: string): Promise<void> {
        return Promise.resolve(undefined);
    }
    
    setItem(key: string, value: string): Promise<void> {
        return Promise.resolve(undefined);
    }
}
