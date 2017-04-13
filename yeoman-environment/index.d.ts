import { EventEmitter } from 'events';

declare namespace Environment {

}
declare class Environment extends EventEmitter {
    someFn() { }
}
export = Environment
