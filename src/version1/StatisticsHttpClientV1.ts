import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableHttpClient } from 'pip-services-net-node';

import { IStatisticsClientV1 } from './IStatisticsClientV1';
import { StatCounterV1 } from './StatCounterV1';
import { StatCounterTypeV1 } from './StatCounterTypeV1';
import { StatCounterSetV1 } from './StatCounterSetV1';

export class StatisticsHttpClientV1 extends CommandableHttpClient implements IStatisticsClientV1 {

    constructor(config?: any) {
        super('statistics');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
    public getCounters(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<StatCounterV1>) => void): void {
        this.callCommand(
            'get_counters',
            correlationId,
            {
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }
        
    public incrementCounter(correlationId: string, group: string, name: string,
        value: number, callback?: (err: any) => void): void {
        this.callCommand(
            'increment_counter',
            correlationId,
            {
                group: group,
                name: name,
                time: new Date(),
                value: value
            }, 
            callback
        );
    }

    public readOneCounter(correlationId: string, group: string, name: string, type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, callback: (err: any, value: StatCounterSetV1) => void): void {
        this.callCommand(
            'read_one_counter',
            correlationId,
            {
                group: group,
                name: name,
                type: type, 
                from_time: fromTime,
                to_time: toTime
            }, 
            callback
        );
    }

    public readCounters(correlationId: string, counters: StatCounterV1[], type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, callback: (err: any, values: StatCounterSetV1[]) => void): void {
        this.callCommand(
            'read_counters',
            correlationId,
            {
                counters: counters,
                type: type, 
                from_time: fromTime,
                to_time: toTime
            }, 
            callback
        );
    }
}
