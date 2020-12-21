import NullCacheEngine from '../src/NullCacheEngine';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(chaiAsPromised);

describe('NullCacheEngine', () => {
    describe('getItem', () => {
        it('returns Promise<null>', () => {
            const promise = NullCacheEngine.getItem('some_key');
            return promise.should.become(null);
        });
    });

    describe('setItem', () => {
        it('returns Promise<void>', () => {
            const promise = NullCacheEngine.setItem('some_key', 'some value');
            return promise.should.become(undefined);
        });
    });

    describe('removeItem', () => {
        it('returns Promise<void>', () => {
            const promise = NullCacheEngine.removeItem('some_key');
            return promise.should.become(undefined);
        });
    });
});
