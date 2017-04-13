"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
class StatisticsLambdaClientV1 extends pip_services_aws_node_1.CommandableLambdaClient {
    constructor(config) {
        super('statistics');
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    getCounters(correlationId, filter, paging, callback) {
        this.callCommand('get_counters', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    incrementCounter(correlationId, group, name, value, callback) {
        this.callCommand('increment_counter', correlationId, {
            group: group,
            name: name,
            time: new Date(),
            value: value
        }, callback);
    }
    readOneCounter(correlationId, group, name, type, fromTime, toTime, callback) {
        this.callCommand('read_one_counter', correlationId, {
            group: group,
            name: name,
            type: type,
            from_time: fromTime,
            to_time: toTime
        }, callback);
    }
    readCounters(correlationId, counters, type, fromTime, toTime, callback) {
        this.callCommand('read_counters', correlationId, {
            counters: counters,
            type: type,
            from_time: fromTime,
            to_time: toTime
        }, callback);
    }
}
exports.StatisticsLambdaClientV1 = StatisticsLambdaClientV1;
//# sourceMappingURL=StatisticsLambdaClientV1.js.map