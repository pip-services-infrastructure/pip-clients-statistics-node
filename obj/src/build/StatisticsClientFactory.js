"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const StatisticsNullClientV1_1 = require("../version1/StatisticsNullClientV1");
const StatisticsDirectClientV1_1 = require("../version1/StatisticsDirectClientV1");
const StatisticsHttpClientV1_1 = require("../version1/StatisticsHttpClientV1");
const StatisticsSenecaClientV1_1 = require("../version1/StatisticsSenecaClientV1");
class StatisticsClientFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(StatisticsClientFactory.NullClientV1Descriptor, StatisticsNullClientV1_1.StatisticsNullClientV1);
        this.registerAsType(StatisticsClientFactory.DirectClientV1Descriptor, StatisticsDirectClientV1_1.StatisticsDirectClientV1);
        this.registerAsType(StatisticsClientFactory.HttpClientV1Descriptor, StatisticsHttpClientV1_1.StatisticsHttpClientV1);
        this.registerAsType(StatisticsClientFactory.SenecaClientV1Descriptor, StatisticsSenecaClientV1_1.StatisticsSenecaClientV1);
    }
}
StatisticsClientFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-statistics', 'factory', 'default', 'default', '1.0');
StatisticsClientFactory.NullClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-statistics', 'client', 'null', 'default', '1.0');
StatisticsClientFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-statistics', 'client', 'direct', 'default', '1.0');
StatisticsClientFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-statistics', 'client', 'http', 'default', '1.0');
StatisticsClientFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-statistics', 'client', 'seneca', 'default', '1.0');
exports.StatisticsClientFactory = StatisticsClientFactory;
//# sourceMappingURL=StatisticsClientFactory.js.map