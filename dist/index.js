'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var chalk = _interopDefault(require('chalk'));
var Listr = _interopDefault(require('listr'));
var fs = _interopDefault(require('fs'));
var util = require('util');
var path = _interopDefault(require('path'));
var pkgInstall = require('pkg-install');
var ncp = _interopDefault(require('ncp'));
var execa = _interopDefault(require('execa'));
var arg = _interopDefault(require('arg'));
var inquirer = _interopDefault(require('inquirer'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var _this = undefined;
var access = util.promisify(fs.access);
var checkDirectories = function (directoryOptions) { return __awaiter(_this, void 0, void 0, function () {
    var error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, access(directoryOptions.templateDirectory, fs.constants.F_OK)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                fs.mkdirSync(directoryOptions.templateDirectory);
                return [3 /*break*/, 3];
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, access(directoryOptions.templateDirectory, fs.constants.R_OK)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.error('%s Invalid template name', chalk.red.bold('ERROR'));
                process.exit(1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };

var getDirectoryOptions = function (options) {
    var templateDirectory = path.resolve(__dirname, '../templates', options.template.toLowerCase());
    var targetPath = options.targetDirectory || process.cwd();
    var targetDirectory = path.resolve(targetPath, options.projectName);
    return { templateDirectory: templateDirectory, targetDirectory: targetDirectory };
};

var _this$1 = undefined;
var copy = util.promisify(ncp);
var copyTemplateFiles = function (options) { return __awaiter(_this$1, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, copy(options.templateDirectory, options.targetDirectory, { clobber: false })];
}); }); };

var _this$2 = undefined;
var initGit = function (options) { return __awaiter(_this$2, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, execa('git', ['init'], { cwd: options.targetDirectory })];
            case 1:
                response = _a.sent();
                if (response.failed) {
                    return [2 /*return*/, Promise.reject(new Error('Failed to initialize Git'))];
                }
                return [2 /*return*/];
        }
    });
}); };

var getListrTasks = function (options, directoryOptions) { return ([
    {
        title: 'Copy project files',
        task: function () { return copyTemplateFiles(directoryOptions); },
    },
    {
        title: 'Initialize git',
        task: function () { return initGit(directoryOptions); },
        enabled: function () { return options.git; },
    },
    {
        title: 'Install dependencies',
        task: function () { return pkgInstall.projectInstall({ cwd: directoryOptions.targetDirectory }); },
        skip: function () { return !options.runInstall ? 'Pass --install to automatically install dependencies' : undefined; },
    },
]); };

var _this$3 = undefined;
var createProject = function (options) { return __awaiter(_this$3, void 0, void 0, function () {
    var directoryOptions, tasks, listr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                directoryOptions = getDirectoryOptions(options);
                return [4 /*yield*/, checkDirectories(directoryOptions)];
            case 1:
                _a.sent();
                tasks = getListrTasks(options, directoryOptions);
                listr = new Listr(tasks);
                return [4 /*yield*/, listr.run()];
            case 2:
                _a.sent();
                console.log('% Your project is ready, have fun!', chalk.green.bold('DONE'));
                return [2 /*return*/, true];
        }
    });
}); };

var argumentsSpecification = {
    '--yes': Boolean,
    '--git': Boolean,
    '--install': Boolean,
    '-y': '--yes',
    '-g': '--git',
    '-i': '--install',
};

var mapArgumentsToOptions = function (args) { return ({
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    runInstall: args['--install'] || false,
    projectName: args._[0],
    template: args._[1],
}); };

var parseArgumentsToOptions = function (args) {
    var parsedArguments = arg(argumentsSpecification, { argv: args.slice(2) });
    return mapArgumentsToOptions(parsedArguments);
};

var isObject = function (value) { return (value && typeof value === 'object' && !Array.isArray(value)); };

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
var mergeDeep = function (target) {
    var _a, _b;
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    if (!sources.length) {
        return target;
    }
    var source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (var key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, (_a = {}, _a[key] = {}, _a));
                }
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, (_b = {}, _b[key] = source[key], _b));
            }
        }
    }
    return mergeDeep.apply(void 0, [target].concat(sources));
};

var options = [
    {
        type: 'input',
        name: 'projectName',
        message: 'Please name your new project',
        defaultValue: 'node-library',
    },
    {
        type: 'list',
        name: 'template',
        message: 'Please choose which template you want to use',
        choices: ['TypeScript'],
        defaultValue: 'TypeScript',
    },
];

var getDefaultOptions = function () {
    var defaultOptions = {};
    options.forEach(function (option) { return defaultOptions[option.name] = option.defaultValue; });
    return defaultOptions;
};

var getInquirerQuestions = function (providedOptions) {
    return options
        .filter(function (_a) {
        var name = _a.name;
        return !providedOptions[name];
    })
        .map(function (_a) {
        var type = _a.type, name = _a.name, message = _a.message, choices = _a.choices, defaultValue = _a.defaultValue;
        return ({
            type: type,
            name: name,
            message: message,
            choices: choices,
            default: defaultValue,
        });
    });
};

var _this$4 = undefined;
var promptForMissingOptions = function (providedOptions) { return __awaiter(_this$4, void 0, void 0, function () {
    var questions, answers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (providedOptions.skipPrompts) {
                    return [2 /*return*/, mergeDeep({}, getDefaultOptions(), providedOptions)];
                }
                questions = getInquirerQuestions(providedOptions);
                return [4 /*yield*/, inquirer.prompt(questions)];
            case 1:
                answers = _a.sent();
                return [2 /*return*/, mergeDeep({}, options, answers)];
        }
    });
}); };

var _this$5 = undefined;
var cli = function (args) { return __awaiter(_this$5, void 0, void 0, function () {
    var parsedOptions, options;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                parsedOptions = parseArgumentsToOptions(args);
                return [4 /*yield*/, promptForMissingOptions(parsedOptions)];
            case 1:
                options = _a.sent();
                return [4 /*yield*/, createProject(options)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

exports.cli = cli;
exports.createProject = createProject;
