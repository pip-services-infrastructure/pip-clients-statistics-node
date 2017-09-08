"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class StatisticsHttpClientV1 extends pip_services_net_node_1.CommandableHttpClient {
    constructor(config) {
        super('statistics');
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    getGroups(correlationId, paging, callback) {
        this.callCommand('get_groups', correlationId, {
            paging: paging
        }, callback);
    }
    getCounters(correlationId, filter, paging, callback) {
        this.callCommand('get_counters', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    incrementCounter(correlationId, group, name, time, timezone, value, callback) {
        this.callCommand('increment_counter', correlationId, {
            group: group,
            name: name,
            time: time,
            timezone: timezone,
            value: value
        }, callback);
    }
    incrementCounters(correlationId, increments, callback) {
        this.callCommand('increment_counters', correlationId, {
            increments: increments
        }, callback);
    }
    readOneCounter(correlationId, group, name, type, fromTime, toTime, timezone, callback) {
        this.callCommand('read_one_counter', correlationId, {
            group: group,
            name: name,
            type: type,
            from_time: fromTime,
            to_time: toTime,
            timezone: timezone
        }, callback);
    }
    readCountersByGroup(correlationId, group, type, fromTime, toTime, timezone, callback) {
        this.callCommand('read_counters_by_group', correlationId, {
            group: group,
            type: type,
            from_time: fromTime,
            to_time: toTime,
            timezone: timezone
        }, callback);
    }
    readCounters(correlationId, counters, type, fromTime, toTime, timezone, callback) {
        this.callCommand('read_counters', correlationId, {
            counters: counters,
            type: type,
            from_time: fromTime,
            to_time: toTime,
            timezone: timezone
        }, callback);
    }
}
exports.StatisticsHttpClientV1 = StatisticsHttpClientV1;
//# sourceMappingURL=StatisticsHttpClientV1.js.map