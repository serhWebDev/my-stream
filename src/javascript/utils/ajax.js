import $ from 'jquery';
import cache from './cache';


class Ajax {
    constructor($, cache) {
        this.$ = $;
        this.cache = cache;
        this.resolvers = {};
    }

    static buildUrl(endpoint) {
        return `/api/${endpoint}`;
    }

    get(endpoint, params = {}, useCache = false, headers) {
        const cachePath = Buffer.from(`${endpoint}${JSON.stringify(params)}`).toString('base64');
        const fromCache = this.cache.get(cachePath);

        return new Promise((resolve, reject) => {
            const resolver = {
                reject,
                resolve
            };

            if (this.hasRequest(cachePath)) {
                return this.addResolver(cachePath, resolver);
            } else {
                this.createRequest(cachePath, resolver);
            }

            if (useCache && fromCache) {
                this.resolveAll(cachePath, fromCache);
                return this.clearResolver(cachePath)
            }

            this.request(endpoint, params, 'GET', headers)
                .then(response => this.resolveAll(cachePath, response, useCache))
                .catch(err => this.rejectAll(cachePath, err))
                .finally(() => this.clearResolver(cachePath));
        });
    }

    hasRequest(path) {
        return Boolean(this.resolvers[path]);
    }

    addResolver(path, resolver) {
        this.resolvers[path].push(resolver);
    }

    createRequest(path, resolver) {
        this.resolvers[path] = [resolver];
    }

    rejectAll(path, err) {
        this.resolvers[path].forEach(item => item.reject(err));
    }

    resolveAll(path, response, saveCache = false) {

        if (saveCache) {
            this.cache.put(path, response, 1000 * 600);
        }

        this.resolvers[path].forEach(item => item.resolve(response));
    }

    clearResolver(path) {
        this.resolvers[path] = null;
    }

    post(endpoint, params = {}) {
        return this.request(endpoint, params, 'POST');
    }

    update(endpoint, params = {}) {
        return this.request(endpoint, params, 'UPDATE');
    }

    deleate(endpoint, params = {}) {
        return this.request(endpoint, params, 'DELETE');
    }

    patch(endpoint, params = {}) {
        return this.request(endpoint, params, 'PATCH');
    }

    request(endpoint, params = {}, method = 'GET', headers) {
        return new Promise((resolve, reject) => {
            const config = {
                url: Ajax.buildUrl(endpoint),
                data: params,
                method: method,
                headers: headers
            };

            this.$.ajax(config).then(resolve).fail(reject);
        });
    }
}

export default new Ajax($, cache);
