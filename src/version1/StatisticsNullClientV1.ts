let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { StatCounterTypeV1 } from './StatCounterTypeV1';
import { StatCounterV1 } from './StatCounterV1';
import { StatCounterIncrementV1 } from './StatCounterIncrementV1';
import { StatCounterValueSetV1 } from './StatCounterValueSetV1';
import { IStatisticsClientV1 } from './IStatisticsClientV1';

export class StatisticsNullClientV1 implements IStatisticsClientV1 {
    constructor(config?: any) {}
        
    public getGroups(correlationId: string, paging: PagingParams, 
        callback: (err: any, page: DataPage<string>) => void): void {
        callback(null, new DataPage<string>([], 0));
    }

    public getCounters(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<StatCounterV1>) => void): void {
        callback(null, new DataPage<StatCounterV1>([], 0));
    }
    
    public incrementCounter(correlationId: string, group: string, name: string,
        time: Date, timezone: string, value: number, callback?: (err: any) => void): void {
        if (callback) callback(null);
    }

    public incrementCounters(correlationId: string, increments: StatCounterIncrementV1[],
        callback?: (err: any) => void): void {
        if (callback) callback(null);
    }

    public readOneCounter(correlationId: string, group: string, name: string, type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, timezone: string,
        callback: (err: any, value: StatCounterValueSetV1) => void): void {
        callback(null, new StatCounterValueSetV1(group, name, type, []));
    }

    public readCountersByGroup(correlationId: string, group: string, type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, timezone: string,
        callback: (err: any, values: StatCounterValueSetV1[]) => void): void {
        callback(null, []);
    }

    public readCounters(correlationId: string, counters: StatCounterV1[], type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, timezone: string,
        callback: (err: any, values: StatCounterValueSetV1[]) => void): void {
        let result = _.map(c => new StatCounterValueSetV1(c.group, c.name, type, []));
        callback(null, result);
    }

}
