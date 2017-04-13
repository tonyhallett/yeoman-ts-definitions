import * as Base from 'yeoman-generator'
import * as Environment from '../yeoman-environment/index'
import * as RunContext from './run-context';
import { EventEmitter } from 'events';

declare namespace yeomantest {
    interface DoneFunction {
        (done: any): void;
    }
    interface MockAnswer {
        [key: string]: string
    }
    interface GeneratorConstructor {
        new (args: Array<string> | string, options: {}): Base
    }
    type GeneratorCtorAndName = [GeneratorConstructor, string];
    type RegistrationType = string | GeneratorCtorAndName
    /**
     * Create a function that will clean up the test directory,
     * cd into it, and create a dummy gruntfile inside. Intended for use
     * as a callback for the mocha `before` hook.
     *
     * @param {String} dir - path to the test directory
     * @returns {DoneFunction} mocha callback
     */
    export function setUpTestDirectory(dir: string): DoneFunction;
    /**
     *
     * Generates a new Gruntfile.js in the current working directory based on
     * options hash passed in.
     *
     * @param {Object} options - Grunt configuration
     * @param {Function} done  - callback to call on completion
     * @example
     * before(helpers.gruntfile({
     *   foo: {
     *     bar: '<config.baz>'
     *   }
     * }));
     *
     */
    /************ might  be possible to type........................................
    'module.exports = function (grunt) {',
        grunt.initConfig(' + JSON.stringify(options
        '};'
    */
    export function gruntFile(options: {}, done: DoneFunction): void;
    /**
     * Clean-up the test directory and cd into it.
     * Call given callback after entering the test directory.
     * @param {String} dir - path to the test directory
     * @param {Function} cb - callback executed after setting working directory to dir
     * @example
     * testDirectory(path.join(__dirname, './temp'), function () {
     *   fs.writeFileSync('testfile', 'Roses are red.');
     * });
     */
    export function testDirectory(dir: string, done: DoneFunction): void
    /**
     * Answer prompt questions for the passed-in generator
     * @param {Base} generator - a Yeoman generator
     * @param {Object} answers - an object where keys are the
     *   generators prompt names and values are the answers to
     *   the prompt questions
     * @example
     * mockPrompt(angular, {'bootstrap': 'Y', 'compassBoostrap': 'Y'});
     */
    export function mockPrompt(generator: Base, answers: [MockAnswer]): void
    /**
     * Restore defaults prompts on a generator.
     * @param {Base} generator
     */
    export function restorePrompt(generator: Base): void
    /**
     * Provide mocked values to the config
     * @param  {Base} generator - a Yeoman generator
     * @param  {Object} localConfig - localConfig - should look just like if called config.getAll()
     */
    export function mockLocalConfig(generator: Base, localConfig: {}): void

    /**
     * Create a simple, dummy generator
     */
    export function createDummyGenerator(): Base

    /**
     * Create a generator, using the given dependencies and controller arguments
     * Dependecies can be path (autodiscovery) or an array [<generator>, <name>]
     *
     * @param {String} name - the name of the generator
     * @param {Array} dependencies - paths to the generators dependencies
     * @param {Array|String} args - arguments to the generator;
     *   if String, will be split on spaces to create an Array
     * @param {Object} options - configuration for the generator
     * @example
     *  var deps = ['../../app',
     *              '../../common',
     *              '../../controller',
     *              '../../main',
     *              [createDummyGenerator(), 'testacular:app']
     *            ];
     * var angular = createGenerator('angular:app', deps);
     */

    export function createGenerator(name: string, dependencies: [RegistrationType], args: Array<string> | string, options: {}): Base

    /**
     * Register a list of dependent generators into the provided env.
     * Dependecies can be path (autodiscovery) or an array [<generator>, <name>]
     *
     * @param {Array} dependencies - paths to the generators dependencies
     */


    export function registerDependencies(env: Environment, dependencies: [RegistrationType]): void

    
    export function run(Generator: string | GeneratorConstructor, settings?: {}): RunContext



}
export = yeomantest
