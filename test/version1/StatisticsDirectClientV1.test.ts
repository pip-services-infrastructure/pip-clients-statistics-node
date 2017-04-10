let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { StatisticsMemoryPersistence } from 'pip-services-statistics-node';
import { StatisticsController } from 'pip-services-statistics-node';
import { IStatisticsClientV1 } from '../../src/version1/IStatisticsClientV1';
import { StatisticsDirectClientV1 } from '../../src/version1/StatisticsDirectClientV1';
import { StatisticsClientFixtureV1 } from './StatisticsClientFixtureV1';

suite('StatisticsDirectClientV1', ()=> {
    let client: StatisticsDirectClientV1;
    let fixture: StatisticsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new StatisticsMemoryPersistence();
        let controller = new StatisticsController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-statistics', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-statistics', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new StatisticsDirectClientV1();
        client.setReferences(references);

        fixture = new StatisticsClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
