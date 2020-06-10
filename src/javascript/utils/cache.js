import getProperty from './get-property';

class Cache {
    constructor() {
        this._cache = Object.create(null);
        this._size  = 0;
    }

    put(key, value, time = null) {
        if (time !== null && typeof time !== 'number') {
            throw new Error('Cache time must be a positive number');
        }

        const oldRecord = this._cache[key];

        if (oldRecord) {
            clearTimeout(oldRecord.timeout);
        } else {
            this._size++;
        }

        const record = {
            value: value,
            expire: time ? time + Date.now() : null
        };

        if (record.expire !== null) {
            record.timeout = setTimeout(() => this.remove(key), time);
        }

        this._cache[key] = record;

        return value;
    }

    remove(key) {
        const oldRecord = this._cache[key];

        if (!oldRecord) {
            return false;
        }

        clearTimeout(oldRecord.timeout);
        this._size--;
        delete this._cache[key];
        return true;
    }

    clear() {
        Object
            .keys(this._cache)
            .forEach(key => clearTimeout(this._cache[key].timeout))
        ;
        this._size  = 0;
        this._cache = Object.create(null);
    }

    get(key) {
        return getProperty(this._cache, [key, 'value']);
    }

    size() {
        return this._size;
    }

    keys() {
        return Object.keys(this._cache);
    }
}

export default new Cache();
