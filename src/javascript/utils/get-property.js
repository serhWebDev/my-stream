import _ from 'underscore';

export default function getProperty(obj, keys = [], defaultValue) {
    const value = keys.reduce((obj, key) => {
        if (!_.isObject(obj) && !_.isArray(obj)) {
            return obj;
        }

        key = _.isArray(obj) ? parseInt(key) : key;

        return obj[key];
    }, obj);

    return value !== undefined && value !== null ? value : defaultValue;
};
