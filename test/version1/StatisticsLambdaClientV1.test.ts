import { ConfigParams } from 'pip-services3-commons-node';

import { StatisticsClientFixtureV1 } from './StatisticsClientFixtureV1';
import { StatisticsLambdaClientV1 } from '../../src/version1/StatisticsLambdaClientV1';

suite('StatisticsLambdaClient', () => {
    let AWS_LAMDBA_ARN = process.env["AWS_LAMDBA_ARN"] || "";
    let AWS_ACCESS_ID = process.env["AWS_ACCESS_ID"] || "";
    let AWS_ACCESS_KEY = process.env["AWS_ACCESS_KEY"] || "";

    if (!AWS_LAMDBA_ARN || !AWS_ACCESS_ID || !AWS_ACCESS_KEY)
        return;

    let config = ConfigParams.fromTuples(
        "lambda.connection.protocol", "aws",
        "lambda.connection.arn", AWS_LAMDBA_ARN,
        "lambda.credential.access_id", AWS_ACCESS_ID,
        "lambda.credential.access_key", AWS_ACCESS_KEY,
        "lambda.options.connection_timeout", 30000
    );

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