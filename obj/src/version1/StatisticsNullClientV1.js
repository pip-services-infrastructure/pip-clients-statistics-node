"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const StatCounterValueSetV1_1 = require("./StatCounterValueSetV1");
class StatisticsNullClientV1 {
    constructor(config) { }
    getGroups(correlationId, paging, callback) {
        callback(null, new pip_services3_commons_node_1.DataPage([], 0));
    }
    getCounters(correlationId, filter, paging, callback) {
        callback(null, new pip_services3_commons_node_1.DataPage([], 0));
    }
    incrementCounter(correlationId, group, name, time, timezone, value, callback) {
        if (callback)
            callback(null);
    }
    incrementCounters(correlationId, increments, callback) {
        if (callback)
            callback(null);
    }
    readOneCounter(correlationId, group, name, type, fromTime, toTime, timezone, callback) {
        callback(null, new StatCounterValueSetV1_1.StatCounterValueSetV1(group, name, type, []));
    }
    readCountersByGroup(correlationId, group, type, fromTime, toTime, timezone, callback) {
        callback(null, []);
    }
    readCounters(correlationId, counters, type, fromTime, toTime, timezone, callback) {
        let result = _.map(c => new StatCounterValueSetV1_1.StatCounterValueSetV1(c.group, c.name, type, []));
        callback(null, result);
    }
}
exports.StatisticsNullClientV1 = StatisticsNullClientV1;
//# sourceMappingURL=StatisticsNullClientV1.js.map