import chai, { expect } from 'chai';
import UUID2HexClient from '../src/UUID2HexClient';
import axios from 'axios';
import NullCacheEngine from '../src/NullCacheEngine';
import { Cacheable } from '../src/types';
import chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(chaiAsPromised);
describe('UUID2HexClient', () => {
    describe('constructor', () => {
        it('creates an axios instance when none is provided', () => {
            const client = new UUID2HexClient('some_url', undefined);
            expect(client.http).to.be.instanceof(axios.constructor);
        });

        it('uses an axios instance when one is provided', () => {
            const http = axios.create();
            const client = new UUID2HexClient('some_url', http);
            expect(client.http).to.deep.equal(http);
        });

        it('uses NullCacheEngine as a cache engine when none is provided', () => {
            const client = new UUID2HexClient('some_url', undefined, undefined);
            expect(client.cache).to.equal(NullCacheEngine);
        });

        it('uses a cacheable instance when one is provided', () => {
            const cache: Cacheable = {
                setItem: (key, value) => Promise.resolve(),
                removeItem: (key) => Promise.resolve(),
                getItem: (key) => Promise.resolve(''),
            };
            const client = new UUID2HexClient('some_url', undefined, cache);
            expect(client.cache).to.deep.equal(cache);
        });

        it('uses the defaultPrefix none is provided', () => {
            const client = new UUID2HexClient('some_url', undefined, undefined, undefined);
            expect(client.cachePrefix).to.equal(UUID2HexClient.defaultPrefix);
        });

        it('uses the cachePrefix when one is provided', () => {
            const prefix = 'some_prefix';
            const client = new UUID2HexClient('some_url', undefined, undefined, prefix);
            expect(client.cachePrefix).to.equal(prefix);
        });
    });

    describe('getHex', () => {
        it('throws an error when an invalid uuid is provided', () => {
            const client = new UUID2HexClient('some_url');
            const promise = client.getHex('some_invalid_uuid');
            expect(promise).to.be.rejectedWith(Error);
        });
    });
});
