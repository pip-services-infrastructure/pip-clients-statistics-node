let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { StatCounterV1 } from '../../src/version1/StatCounterV1';
import { StatCounterIncrementV1 } from '../../src/version1/StatCounterIncrementV1';
import { StatCounterValueSetV1 } from '../../src/version1/StatCounterValueSetV1';
import { StatCounterTypeV1 } from '../../src/version1/StatCounterTypeV1';
import { IStatisticsClientV1 } from '../../src/version1/IStatisticsClientV1';

export class StatisticsClientFixtureV1 {
    private _client: IStatisticsClientV1;
    
    constructor(client: IStatisticsClientV1) {
        this._client = client;
    }
        
    public testCrudOperations(done) {
        async.series([
        // Increment counter
            (callback) => {
                this._client.incrementCounter(
                    null,
                    'test', 'value1', null, 1,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Increment the same counter again
            (callback) => {
                this._client.incrementCounters(
                    null,
                    [
                        <StatCounterIncrementV1>{
                            group: 'test',
                            name: 'value1',
                            value: 2
                        }
                    ],
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Check all counters
            (callback) => {
                this._client.getCounters(
                    null,
                    null,
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
        // Check total counters
            (callback) => {
                this._client.readOneCounter(
                    null, 'test', 'value1', StatCounterTypeV1.Total, null, null,
                    (err, set) => {
                        assert.isNull(err);

                        assert.isObject(set);
                        assert.lengthOf(set.values, 1);

                        let record = set.values[0];
                        assert.equal(3, record.value);

                        callback();
                    }
                );
            },
        // Check counters by group
            (callback) => {
                this._client.readCountersByGroup(
                    null, 'test', StatCounterTypeV1.Total, null, null,
                    (err, sets) => {
                        assert.isNull(err);

                        assert.isArray(sets);
                        assert.lengthOf(sets, 1);

                        let set = sets[0];
                        assert.lengthOf(set.values, 1);

                        let record = set.values[0];
                        assert.equal(3, record.value);

                        callback();
                    }
                );
            },
        // Check monthly counters
            (callback) => {
                this._client.readCounters(
                    null, 
                    [ new StatCounterV1('test', 'value1') ],
                    StatCounterTypeV1.Hour,
                    new Date(),
                    new Date(),
                    (err, sets) => {
                        assert.isNull(err);

                        assert.lengthOf(sets, 1);

                        let set = sets[0];
                        assert.isObject(set);
                        assert.lengthOf(set.values, 1);

                        let record = set.values[0];
                        assert.equal(3, record.value);

                        callback();
                    }
                );
            }
        ], done);
    }
}
