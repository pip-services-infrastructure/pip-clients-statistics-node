let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { StatCounterTypeV1 } from './StatCounterTypeV1';
import { StatCounterV1 } from './StatCounterV1';
import { StatCounterSetV1 } from './StatCounterSetV1';
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
        value: number, callback?: (err: any) => void): void {
        if (callback) callback(null);
    }

    public readOneCounter(correlationId: string, group: string, name: string, type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, callback: (err: any, value: StatCounterSetV1) => void): void {
        callback(null, new StatCounterSetV1(group, name, type, []));
    }

    public readCounters(correlationId: string, counters: StatCounterV1[], type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, callback: (err: any, values: StatCounterSetV1[]) => void): void {
        let result = _.map(c => new StatCounterSetV1(c.group, c.name, type, []));
        callback(null, result);
    }

}
