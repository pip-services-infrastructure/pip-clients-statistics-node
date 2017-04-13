import { YamlConfigReader } from 'pip-services-commons-node';
import { StatisticsClientFixtureV1 } from './StatisticsClientFixtureV1';
import { StatisticsLambdaClientV1 } from '../../src/version1/StatisticsLambdaClientV1';

suite('StatisticsLambdaClient', ()=> {
    let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: StatisticsLambdaClientV1;
    let fixture: StatisticsClientFixtureV1;

    setup((done) => {
        client = new StatisticsLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new StatisticsClientFixtureV1(client);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('Crud Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});