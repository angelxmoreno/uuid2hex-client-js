# uuid2hex-client-js

This package is the javascript client for the [UUID2Hex service](https://github.com/angelxmoreno/uuid2hex-service). It 
uses axios to make calls to the API and takes an optional `CacheableInterface` to avoid unnecessary calls.  

## Installation
using yarn:
```bash
yarn add uuid2hex-client-js 
```

using npm:
```bash
npm install --save uuid2hex-client-js 
```

## Setup and Configuration
The only required parameter for the `UUID2HexClient` is the endpoint of the [UUID2Hex service](https://github.com/angelxmoreno/uuid2hex-service).
Optional parameters are the http client (an axios instance) and the cacheEngine ( an object that implements the `CacheableInterface` interface).
See below for an example:

```ts
import UUID2HexClient, { CacheableInterface } from 'uuid2hex-client-js';
import axios from 'axios';

const uuid = '3e51e7b1-1f7c-4d50-8a91-96fed586cfd2';

// required
const serviceUrl = 'https://uuid2hex.herokuapp.com/lookup';

// optional
const http = axios.create({
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
});

// optional
class LogStorage implements CacheableInterface {
    async getItem(key: string) {
        console.log('getting item', key);
        return null;
    }

    async removeItem(key: string) {
        console.log('removing item', key);
    }

    async setItem(key: string, value: string) {
        console.log('setting item', key, value);
    }
}
const cacheEngine = new LogStorage();

const lookup = new UUID2HexClient(serviceUrl, http, cacheEngine);

lookup.getHex(uuid).then((hex: string | null) => console.log(`hex for ${uuid} is ${hex}`));

/*
 prints to console:

getting item UUID2HexClient3e51e7b1-1f7c-4d50-8a91-96fed586cfd2
setting item UUID2HexClient3e51e7b1-1f7c-4d50-8a91-96fed586cfd2 5fe265caf39105fe
hex for 3e51e7b1-1f7c-4d50-8a91-96fed586cfd2 is 5fe265caf39105fe
 */
```
