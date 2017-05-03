"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const StatCounterSetV1_1 = require("./StatCounterSetV1");
class StatisticsNullClientV1 {
    constructor(config) { }
    getGroups(correlationId, paging, callback) {
        callback(null, new pip_services_commons_node_1.DataPage([], 0));
    }
    getCounters(correlationId, filter, paging, callback) {
        callback(null, new pip_services_commons_node_1.DataPage([], 0));
    }
    incrementCounter(correlationId, group, name, value, callback) {
        if (callback)
            callback(null);
    }
    readOneCounter(correlationId, group, name, type, fromTime, toTime, callback) {
        callback(null, new StatCounterSetV1_1.StatCounterSetV1(group, name, type, []));
    }
    readCountersByGroup(correlationId, group, type, fromTime, toTime, callback) {
        callback(null, []);
    }
    readCounters(correlationId, counters, type, fromTime, toTime, callback) {
        let result = _.map(c => new StatCounterSetV1_1.StatCounterSetV1(c.group, c.name, type, []));
        callback(null, result);
    }
}
exports.StatisticsNullClientV1 = StatisticsNullClientV1;
//# sourceMappingURL=StatisticsNullClientV1.js.map