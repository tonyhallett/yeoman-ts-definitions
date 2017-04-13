import { EventEmitter } from 'events';
import { GeneratorConstructor, MockAnswer, RegistrationType } from './index'
//******************* think that this should export types that is used by the helpers as well - withGenerators
//********************* or a common .d.ts ?
declare namespace RunContext {
    
}
/**
 * This class provide a run context object to façade the complexity involved in setting
 * up a generator for testing
 * @constructor
 * @param {String|Function} Generator - Namespace or generator constructor. If the later
 *                                       is provided, then namespace is assumed to be
 *                                       'gen:test' in all cases
 * @param {Object} [settings]
 * @param {Boolean} [settings.tmpdir=true] - Automatically run this generator in a tmp dir
 * @return {this}
 */
declare class RunContext extends EventEmitter {
    constructor(generator: string | GeneratorConstructor, settings: {})
    /**
     * Hold the execution until the returned callback is triggered
     * @return {Function} Callback to notify the normal execution can resume
     */
    async(): () => void;
    /**
    * Method called when the context is ready to run the generator
    * @private
    */
    _run(): void;
    /**
    * Return a promise representing the generator run process
    * @return {Promise} Promise resolved on end or rejected on error
    */
    toPromise(): Promise<string>;
    /**
    * Promise `.then()` duck typing
    * @return {Promise}
    */
    then(...args:any[]): Promise<any>
    /**
    * Promise `.catch()` duck typing
    * @return {Promise}
    */
    catch(): Promise<any>
    /**
    * Clean the provided directory, then change directory into it
    * @param  {String} dirPath - Directory path (relative to CWD). Prefer passing an absolute
    *                            file path for predictable results
    * @param {Function} [cb] - callback who'll receive the folder path as argument
    * @return {this} run context instance
    */ 
    inDir(dirPath: string, cb: (resolvedPath: string) => void): RunContext
    /**
    * Change directory without deleting directory content.
    * @param  {String} dirPath - Directory path (relative to CWD). Prefer passing an absolute
    *                            file path for predictable results
    * @return {this} run context instance
    */
    cd(dirPath: string): RunContext
    /**
    * Cleanup a temporary directy and change the CWD into it
    *
    * This method is called automatically when creating a RunContext. Only use it if you need
    * to use the callback.
    *
    * @param {Function} [cb] - callback who'll receive the folder path as argument
    * @return {this} run context instance
    */
    inTmpDir(cb: (resolvedPath: string) => void): RunContext
    /**
    * Clean the directory used for tests inside inDir/inTmpDir
    */
    cleanTestDirectory(): void;
    /**
    * Provide arguments to the run context
    * @param  {String|Array} args - command line arguments as Array or space separated string
    * @return {this}
    */
    withArguments(args: string | Array<string>): RunContext
    /**
    * Provide options to the run context
    * @param  {Object} options - command line options (e.g. `--opt-one=foo`)
    * @return {this}
    */
    withOptions(options: {}): RunContext;
    /**
    * Mock the prompt with dummy answers
    * @param  {Object} answers - Answers to the prompt questions
    * @return {this}
    */
    withPrompts(answers: [MockAnswer]): RunContext
    /**
    * Provide dependent generators
    * @param {Array} dependencies - paths to the generators dependencies
    * @return {this}
    * @example
    * var angular = new RunContext('../../app');
    * angular.withGenerators([
    *   '../../common',
    *   '../../controller',
    *   '../../main',
    *   [helpers.createDummyGenerator(), 'testacular:app']
    * ]);
    * angular.on('end', function () {
    *   // assert something
    * });
    */
    withGenerators([RegistrationType]): RunContext;
    /**
    * Mock the local configuration with the provided config
    * @param  {Object} localConfig - should look just like if called config.getAll()
    * @return {this}
    */
    withLocalConfig(localConfig: {}): RunContext //helpers.mockLocalConfig(this.generator, this.localConfig);
}
export = RunContext;