import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { StatCounterTypeV1 } from './StatCounterTypeV1';
import { StatCounterV1 } from './StatCounterV1';
import { StatCounterSetV1 } from './StatCounterSetV1';
import { IStatisticsClientV1 } from './IStatisticsClientV1';
export declare class StatisticsNullClientV1 implements IStatisticsClientV1 {
    constructor(config?: any);
    getCounters(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<StatCounterV1>) => void): void;
    incrementCounter(correlationId: string, group: string, name: string, value: number, callback?: (err: any) => void): void;
    readOneCounter(correlationId: string, group: string, name: string, type: StatCounterTypeV1, fromTime: Date, toTime: Date, callback: (err: any, value: StatCounterSetV1) => void): void;
    readCounters(correlationId: string, counters: StatCounterV1[], type: StatCounterTypeV1, fromTime: Date, toTime: Date, callback: (err: any, values: StatCounterSetV1[]) => void): void;
}
