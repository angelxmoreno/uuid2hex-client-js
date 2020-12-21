/* eslint-disable @typescript-eslint/no-unused-vars */

import { Cacheable } from './UUID2HexClient';

const NullCacheEngine: Cacheable = {
    getItem(key: string): Promise<null> {
        return Promise.resolve(null);
    },

    removeItem(key: string): Promise<void> {
        return Promise.resolve(undefined);
    },

    setItem(key: string, value: string): Promise<void> {
        return Promise.resolve(undefined);
    },
};

export default NullCacheEngine;
