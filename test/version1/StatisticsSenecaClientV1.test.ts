let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { StatisticsMemoryPersistence } from 'pip-services-statistics-node';
import { StatisticsController } from 'pip-services-statistics-node';
import { StatisticsSenecaServiceV1 } from 'pip-services-statistics-node';
import { IStatisticsClientV1 } from '../../src/version1/IStatisticsClientV1';
import { StatisticsSenecaClientV1 } from '../../src/version1/StatisticsSenecaClientV1';
import { StatisticsClientFixtureV1 } from './StatisticsClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('StatisticsSenecaClient', () => {
    let service: StatisticsSenecaServiceV1;
    let client: StatisticsSenecaClientV1;
    let fixture: StatisticsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new StatisticsMemoryPersistence();
        let controller = new StatisticsController();

        service = new StatisticsSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-statistics', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-statistics', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-statistics', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new StatisticsSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

        fixture = new StatisticsClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });

    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
