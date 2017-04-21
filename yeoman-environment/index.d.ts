import { EventEmitter } from 'events';
import * as Base from '../yeoman-generator';
declare namespace Environment {
    interface InstantiateOptions {
        arguments?: Array<string> | string;
        options?: Base.ObjectAny;
    }
}
declare class Environment extends EventEmitter {

  /**
   * Given a String `filepath`, tries to figure out the relative namespace.
   *
   * ### Examples:
   *
   *     this.namespace('backbone/all/index.js');
   *     // => backbone:all
   *
   *     this.namespace('generator-backbone/model');
   *     // => backbone:model
   *
   *     this.namespace('backbone.js');
   *     // => backbone
   *
   *     this.namespace('generator-mocha/backbone/model/index.js');
   *     // => mocha:backbone:model
   *
   * @param {String} filepath
   */
    namespace(filepath: string):string;
    //options is the same for both
    instantiate(Generator: Base.GeneratorConstructor, options?: Environment.InstantiateOptions):Base
      /**
   * Create is the Generator factory. It takes a namespace to lookup and optional
   * hash of options, that lets you define `arguments` and `options` to
   * instantiate the generator with.
   *
   * An error is raised on invalid namespace.
   *
   * @param {String} namespace
   * @param {Object} options
   */
    create(namespace: string, options: Environment.InstantiateOptions):Base

}
export = Environment

