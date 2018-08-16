let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';

import { StatisticsMemoryPersistence } from 'pip-services-statistics-node';
import { StatisticsController } from 'pip-services-statistics-node';
import { StatisticsHttpServiceV1 } from 'pip-services-statistics-node';
import { IStatisticsClientV1 } from '../../src/version1/IStatisticsClientV1';
import { StatisticsHttpClientV1 } from '../../src/version1/StatisticsHttpClientV1';
import { StatisticsClientFixtureV1 } from './StatisticsClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('StatisticsHttpClientV1', ()=> {
    let service: StatisticsHttpServiceV1;
    let client: StatisticsHttpClientV1;
    let fixture: StatisticsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new StatisticsMemoryPersistence();
        let controller = new StatisticsController();

        service = new StatisticsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-statistics', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-statistics', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-statistics', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new StatisticsHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

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
