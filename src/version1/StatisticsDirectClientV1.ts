import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams} from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-net-node';

import { IStatisticsClientV1 } from './IStatisticsClientV1';
//import { IStatisticsController } from 'pip-services-statistics-node';
import { StatCounterV1 } from './StatCounterV1';
import { StatCounterIncrementV1 } from './StatCounterIncrementV1';
import { StatCounterTypeV1 } from './StatCounterTypeV1';
import { StatCounterValueSetV1 } from './StatCounterValueSetV1';

export class StatisticsDirectClientV1 extends DirectClient<any> implements IStatisticsClientV1 {
            
    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-statistics", "controller", "*", "*", "*"))

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public getGroups(correlationId: string, paging: PagingParams, 
        callback: (err: any, page: DataPage<string>) => void): void {
        let timing = this.instrument(correlationId, 'statistics.get_groups');
        this._controller.getGroups(correlationId, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });    
    }

    public getCounters(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<StatCounterV1>) => void): void {
        let timing = this.instrument(correlationId, 'statistics.get_counters');
        this._controller.getCounters(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });    
    }
    
    public incrementCounter(correlationId: string, group: string, name: string,
        time: Date, timezone: string, value: number, callback?: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'statistics.increment_counter');
        this._controller.incrementCounter(correlationId, group, name, time, timezone, value, (err,) => {
            timing.endTiming();
            if (callback) callback(err);
        });
    }

    public incrementCounters(correlationId: string, increments: StatCounterIncrementV1[],
        callback?: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'statistics.increment_counters');
        this._controller.incrementCounters(correlationId, increments, (err,) => {
            timing.endTiming();
            if (callback) callback(err);
        });
    }

    public readOneCounter(correlationId: string, group: string, name: string, type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, timezone: string,
        callback: (err: any, value: StatCounterValueSetV1) => void): void {
        let timing = this.instrument(correlationId, 'statistics.read_one_counter');
        this._controller.readOneCounter(correlationId, group, name, type, fromTime, toTime, timezone, (err, set) => {
            timing.endTiming();
            callback(err, set);
        });
    }

    public readCountersByGroup(correlationId: string, group: string, type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, timezone: string,
        callback: (err: any, values: StatCounterValueSetV1[]) => void): void {
        let timing = this.instrument(correlationId, 'statistics.read_counters_by_group');
        this._controller.readCountersByGroup(correlationId, group, type, fromTime, toTime, timezone, (err, set) => {
            timing.endTiming();
            callback(err, set);
        });
    }

    public readCounters(correlationId: string, counters: StatCounterV1[], type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, timezone: string,
        callback: (err: any, values: StatCounterValueSetV1[]) => void): void {
        let timing = this.instrument(correlationId, 'statistics.read_counters');
        this._controller.readCounters(correlationId, counters, type, fromTime, toTime, timezone, (err, sets) => {
            timing.endTiming();
            callback(err, sets);
        });
    }
}