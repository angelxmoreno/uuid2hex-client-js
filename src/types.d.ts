export type Cacheable = {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
};

export type ServerData = {
    statusCode: number;
    data: {
        error?: string;
        uuid?: string;
        hex?: string;
    };
};
