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
import { StatCounterTypeV1 } from './StatCounterTypeV1';
import { StatCounterSetV1 } from './StatCounterSetV1';

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
        value: number, callback?: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'statistics.increment_counter');
        this._controller.incrementCounter(correlationId, group, name, new Date(), value, (err,) => {
            timing.endTiming();
            if (callback) callback(err);
        });
    }

    public readOneCounter(correlationId: string, group: string, name: string, type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, callback: (err: any, value: StatCounterSetV1) => void): void {
        let timing = this.instrument(correlationId, 'statistics.read_one_counter');
        this._controller.readOneCounter(correlationId, group, name, type, fromTime, toTime, (err, set) => {
            timing.endTiming();
            callback(err, set);
        });
    }

    public readCounters(correlationId: string, counters: StatCounterV1[], type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, callback: (err: any, values: StatCounterSetV1[]) => void): void {
        let timing = this.instrument(correlationId, 'statistics.read_counters');
        this._controller.readCounters(correlationId, counters, type, fromTime, toTime, (err, sets) => {
            timing.endTiming();
            callback(err, sets);
        });
    }
}