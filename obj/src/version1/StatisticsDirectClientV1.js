"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class StatisticsDirectClientV1 extends pip_services_net_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services_commons_node_2.Descriptor("pip-services-statistics", "controller", "*", "*", "*"));
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    getGroups(correlationId, paging, callback) {
        let timing = this.instrument(correlationId, 'statistics.get_groups');
        this._controller.getGroups(correlationId, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    getCounters(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'statistics.get_counters');
        this._controller.getCounters(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    incrementCounter(correlationId, group, name, time, timezone, value, callback) {
        let timing = this.instrument(correlationId, 'statistics.increment_counter');
        this._controller.incrementCounter(correlationId, group, name, time, timezone, value, (err) => {
            timing.endTiming();
            if (callback)
                callback(err);
        });
    }
    incrementCounters(correlationId, increments, callback) {
        let timing = this.instrument(correlationId, 'statistics.increment_counters');
        this._controller.incrementCounters(correlationId, increments, (err) => {
            timing.endTiming();
            if (callback)
                callback(err);
        });
    }
    readOneCounter(correlationId, group, name, type, fromTime, toTime, timezone, callback) {
        let timing = this.instrument(correlationId, 'statistics.read_one_counter');
        this._controller.readOneCounter(correlationId, group, name, type, fromTime, toTime, timezone, (err, set) => {
            timing.endTiming();
            callback(err, set);
        });
    }
    readCountersByGroup(correlationId, group, type, fromTime, toTime, timezone, callback) {
        let timing = this.instrument(correlationId, 'statistics.read_counters_by_group');
        this._controller.readCountersByGroup(correlationId, group, type, fromTime, toTime, timezone, (err, set) => {
            timing.endTiming();
            callback(err, set);
        });
    }
    readCounters(correlationId, counters, type, fromTime, toTime, timezone, callback) {
        let timing = this.instrument(correlationId, 'statistics.read_counters');
        this._controller.readCounters(correlationId, counters, type, fromTime, toTime, timezone, (err, sets) => {
            timing.endTiming();
            callback(err, sets);
        });
    }
}
exports.StatisticsDirectClientV1 = StatisticsDirectClientV1;
//# sourceMappingURL=StatisticsDirectClientV1.js.map