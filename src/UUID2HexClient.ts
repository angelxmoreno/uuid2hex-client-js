import axios, {AxiosInstance} from "axios";
import NullCacheEngine from "./NullCacheEngine";
import {UUIDv4} from 'uuid-v4-validator'

export default class UUID2HexClient {
    serverUrl: string
    http: AxiosInstance
    cache: Cacheable
    cachePrefix: string
    
    
    constructor(serverUrl: string, http?: AxiosInstance, cache?: Cacheable, cachePrefix?: string) {
        this.serverUrl = serverUrl;
        this.http = http || axios.create();
        this.cache = cache || new NullCacheEngine();
        this.cachePrefix = cachePrefix || 'UUID2HexClient';
    }
    
    async getHex(uuid: string): Promise<string> {
        const isValidUUID = UUIDv4.validate(uuid);
        if (!isValidUUID) {
            throw new Error('Can not get hex for uuid: Invalid UUID provided');
        }
        
        const cacheKey = this.cachePrefix + uuid.replace('_', '');
        const cachedResponse = await this.cache.getItem(cacheKey);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const response = await axios.post<ServerData>(`${this.serverUrl}`, {uuid});
        const {statusCode, data} = response.data;
        const {error, hex} = data;
        
        if (error || statusCode !== 200) {
            throw new Error(`Can not get hex for uuid: ${error}`)
        }
        
        await this.cache.setItem(cacheKey, hex!);
        
        return hex!;
    }
}
