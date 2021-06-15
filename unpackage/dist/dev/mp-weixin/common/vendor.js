(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"接单模块","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!********************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 12));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 13));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 17));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 18));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 22));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 23));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 24));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 25));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 26));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 27));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 28));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 15));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 14));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 29));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 16));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 30));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 31));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 32));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 33));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 34));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 35);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 36));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 37));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 38));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 39));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 114:
/*!***********************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/network/sendOrder.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getSendOrder = getSendOrder;exports.backSendOrder = backSendOrder;exports.rating = rating;exports.sureSuccess = sureSuccess;var _config = _interopRequireDefault(__webpack_require__(/*! ./config.js */ 51));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function getSendOrder(params)
{
  return (0, _config.default)({
    url: "/getMySendOrder?token=" + params.token + "&page_id=" + params.page_id + "&pub_state=" + params.pub_state,
    method: "get" });

}
function backSendOrder(params)
{
  return (0, _config.default)({
    url: '/pullBack?token=' + params.token + '&oid=' + params.oid,
    method: 'post' });

}
function rating(params, data)
{
  return (0, _config.default)({
    url: "/pushDiscuss?token=" + params.token + "&oid=" + params.oid,
    data: {
      detail: data.detail,
      count: data.count },

    method: 'post' });

}
function sureSuccess(params)
{
  return (0, _config.default)({
    url: "/sureSuccess?token=" + params.token + "&oid=" + params.oid,
    method: 'post' });

}

/***/ }),

/***/ 12:
/*!*******************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/mixin/mixin.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 129:
/*!********************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/static/plane.jpeg ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/plane.jpeg";

/***/ }),

/***/ 13:
/*!*********************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/request/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 14));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 132:
/*!******************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/network/user.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getToken = getToken;exports.pushOrder = pushOrder;exports.getInfo = getInfo;var _config = _interopRequireDefault(__webpack_require__(/*! ./config.js */ 51));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function getToken(code) {
  return (0, _config.default)({
    url: "/getToken?code=" + code });

}

function pushOrder(params, data) {
  return (0, _config.default)({
    url: "/pushOrder?token=" + params.token + "&state_id=" + params.state_id,
    data: data,
    method: 'post' });

}

function getInfo(params) {
  return (0, _config.default)({
    url: "/getInfo?token=" + params.token });

}

/***/ }),

/***/ 133:
/*!*****************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/utils/login.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.usualLogin = usualLogin;var _user = __webpack_require__(/*! @/network/user.js */ 132);

function usualLogin(vuex, loading) {
  loading.open();
  uni.getUserProfile({
    desc: "授权登陆，获取用户信息",
    success: function success(res) {
      vuex.state.username = res.userInfo.nickName;
      vuex.state.avatar = res.userInfo.avatarUrl;
      vuex.state.loginFlag = true;
      uni.login({
        success: function success(res) {
          (0, _user.getToken)(res.code).then(function (res) {
            vuex.state.token = res.data.token;
            var params = {
              "token": vuex.state.token };

            (0, _user.getInfo)(params).then(function (res) {
              console.log(res);
              if (res.data.code == 1001) {
                vuex.state.isLogin = res.data.infoObj.isLogin,
                vuex.state.count = res.data.infoObj.count,
                vuex.state.address = res.data.infoObj.address,
                vuex.state.phone = res.data.infoObj.phone,
                vuex.state.money = res.data.infoObj.money;
              } else if (res.data.code == 1005) {
                vuex.state.isLogin = 1;
              }

            });
            loading.close();
          });
        } });

    } });

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!**************************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/deepMerge.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 15:
/*!**************************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/deepClone.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 16:
/*!*********************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/test.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[3-9]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 17:
/*!****************************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/queryParams.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 18:
/*!**********************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/route.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 20);

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"接单模块","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"接单模块","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"接单模块","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"接单模块","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 21);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 21:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 216:
/*!********************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/util/emitter.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 217:
/*!****************************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/util/async-validator.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"VUE_APP_NAME":"接单模块","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}) && "development" !== 'production' && typeof window !==
'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;

  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }

  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;}

    });

    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }

    return str;
  }

  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors) }) :
        resolve();
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields || [];

  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }

  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results) }) :
        resolve();
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField };

  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], {}, value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

/**
   *  Rule for validating required fields.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
   *  Rule for validating whitespace.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i };

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function _float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear ===
    'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    // 修改源码，将字符串数值先转为数值
    return typeof +value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  } };

/**
        *  Rule for validating the type of a value.
        *
        *  @param rule The validation rule.
        *  @param value The value of the field on the source object.
        *  @param source The source object being validated.
        *  @param errors An array of errors that this rule may add
        *  validation errors to.
        *  @param options The validation options.
        *  @param options.messages The validation messages.
        */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
   *  Rule for validating minimum and maximum allowed values.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

var ENUM = 'enum';
/**
                    *  Rule for validating a value exists in an enumerable list.
                    *
                    *  @param rule The validation rule.
                    *  @param value The value of the field on the source object.
                    *  @param source The source object being validated.
                    *  @param errors An array of errors that this rule may add
                    *  validation errors to.
                    *  @param options The validation options.
                    *  @param options.messages The validation messages.
                    */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
   *  Rule for validating a regular expression pattern.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  "enum": enumerable,
  pattern: pattern$1 };


/**
                         *  Performs validation for string types.
                         *
                         *  @param rule The validation rule.
                         *  @param value The value of the field on the source object.
                         *  @param callback The callback function.
                         *  @param source The source object being validated.
                         *  @param options The validation options.
                         *  @param options.messages The validation messages.
                         */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
}

/**
   *  Validates a function.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a boolean.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates the regular expression type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is an integer.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is a floating point number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an array.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an object.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

var ENUM$1 = 'enum';
/**
                      *  Validates an enumerable list.
                      *
                      *  @param rule The validation rule.
                      *  @param value The value of the field on the source object.
                      *  @param callback The callback function.
                      *  @param source The source object being validated.
                      *  @param options The validation options.
                      *  @param options.messages The validation messages.
                      */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a regular expression pattern.
   *
   *  Performs validation when a rule only contains
   *  a pattern property but is not declared as a string type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

function date(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      var dateObject;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
}

function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Performs validation for any type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
}

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any };


function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid' },

    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s' },

    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters' },

    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s' },

    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length' },

    pattern: {
      mismatch: '%s value %s does not match pattern %s' },

    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    } };

}
var messages = newMessages();

/**
                               *  Encapsulates a validation schema.
                               *
                               *  @param descriptor An object declaring validation rules
                               *  for this schema.
                               */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    var z;
    var item;

    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }

      return Promise.resolve();
    }

    function complete(results) {
      var i;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }

      callback(errors, fields);
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule };

        } else {
          rule = _extends({}, rule);
        }

        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);

        if (!rule.validator) {
          return;
        }

        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z });

      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField ===
      'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullfield(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key });

      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errors = e;

        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }

        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }

        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }

            return doIt(errors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }

          fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);

          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }

          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || false;
  } };


Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;var _default =

Schema;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/node-libs-browser/mock/process.js */ 218)))

/***/ }),

/***/ 218:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 219);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 219:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 218)))

/***/ }),

/***/ 22:
/*!***************************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/timeFormat.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 23:
/*!*************************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/timeFrom.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 24:
/*!******************************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/colorGradient.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 25:
/*!*********************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/guid.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 26:
/*!**********************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/color.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 27:
/*!**************************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/type2icon.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 274:
/*!*************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/static/img/express.png ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE/UlEQVRYR+2WbUwURxjH/zN3x91xHAgCBhCBW44DeUegRqyKtY3Wsw3RWGLaNLamTZO2adr0g2n6qU2afmlav9WmwcTEEBMlvqatX5Rq0RQFQcQXdkE90DsOTziWt7udaXat1+PtAEk1TTrJZJOdmef/m/8zu88QPOdGnrM+/tsAgiDUqA6KotjwtE4u2AGbzfYJIeQtQkgR51yvChNCgpzzNs75QUmSvl8IzJwAgiAUAHiPUrqNMZah6sXFmFlpTiZ9bV2ZpnW88QpabvWwweFRCoBTSu8wxk4A2C+K4rVIQDMCZGVl7aSU7tLryLqgwuPNxiheWZhHtm2owktrXkBgzP+4jw9Pi33o1yacvdIJqdfNggqjeh3xBRXeyBg71N3dfXjqghCAzWb7mRJSTCgpYIwb460WpXxllq5mQzkK7QIMRgv0xhjoo6L/icF5CESF4UyZFP96Ty8azjaj+Xq34vPLOkrJOGe8gwMPRFHcqqXvyYq8XAefCARhMRt5sX0FcVaVYk2RfdoOqc4AgwpiitGe4U2FCI7LmjMsOBEaOtZ4BQ3nmnHPPQBFYdp7URQ17RCAIAj8s52v4PSldtx1D7CR8QDVUYrs9GXYVJGPHRsrp8EQqtMgDCar1sPbj/VHcOrcH3A98IBxDh2lPN5qJlV5GTh28frMACe/+QjtUi9SE5dARwkO/NKE1q67/KF/hHDOsSwhlq8vyyO7nethitI+gFBzuX346UQjLneKGB4ZBaUUKYkJyEiOx5bSTKQkxIbm7vnhyOwAXxw4hdt3+7A8eSlKbCmocGQiLyMFxy9cxZnLnXD1P+SBoEKs0SYU21eg+74Xff0+qICUEMRZTPjyw/excXW5Jniz5Xf4H3knwc4JYFqShNraWrS3taGt5TL6+z0ozU7Hns2rtUBSnxcHf2tCq3gPjHGkJ8XhjbVFsC9P1MbLq7X/09MD9A4MYd++fUhLS4PL5UJycjL2fv4ptlfYUWhLCwXfu/8o+ryP8O07myftcNEAtpXFsFqtkGUZHo8HdXV1qN1RM2+AleXVGJWH0N/XjeHBh9MO75wp2P3Bx3A6naivr8dWWw6slWULApimOOVFRIDD59twrvUW8vPzUbyqAgUFBVp/9+035+3AogDUxWMTATTfvINWqRctXS6YTGYkJSY8O4CpO7jlcqP5xh3s2jT5ZzTbIVy0A3MFeDIeCcDnH0W81TxjqIhnYL7i6rxwAHl0Ah7fMNw+v/aMt0bjxeKsZwdw/HwHliVYkZYYi4TYaESbombdy7/igKoWCCoYlMeQGGeJaOSsANWlDlSX5KIsZ8W8MhGeggvtPRgYlLXdry2a2frTf95A47UeeIfkGYvRZqNB96rBoN82PDKemZ2aNFFVaI9SoRLjJtf9mQ6hd1DGkhgz9Dr1Vva49bh9aGjqwO0+L58IKIQSol4SOhjnR0VR/FqdM9uVrJJS+rLFbKqRR8dWpS6Nkytysywl2emoyM2MWAvUWn9Vuo/egSGmMEYpJX7G+CXO+SFJkuqmWjvnpdThcKQGg0GnUa9/PcjYRmu0KbjKkaEvz8kwnb7YrhWjEiEF13oeKJ5BmXLOCSFwM8bPUEq/6+rqaomUzzkBpi4WBGEL59xpjNJvVxhPUhSmeq5eBjsBHBZF8at5HaC/Jy0YIDy4zWYrBGCXJOnoQkTD5y4K4GlF/wcId+AvoIKpP27VZ6IAAAAASUVORK5CYII="

/***/ }),

/***/ 275:
/*!***********************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/static/img/learn.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABsklEQVRYR+3WPWgUURQF4G+FsGCnqGi01QVFo4W9FgZiE1IkRoQ0ooWCnUVA8A9EEEQCBgIWJogQgyAiCWhhCAiKWBhSWgj2FoIIQXbkhbeyjjO7E7KwKeaWc8+999wzb96cii5HpcvzlQQ2rQI3UMPuFmdkGo9j/iCuYU8L/Ge8w1wzJkuBpOjB7O/z4eqgradu2YJDBetOY6GBTRMIm1/HIj7hVU7Tw7j8clxt4Bij93n+3hs8xdecmrO4iC84gl8BlyYQGgTgBTxqs9GOlQfma72Ozyy6e37SeAEF5jGAPixnEXiLEzgZVWjZ8/ecZ0liuF43Uh39993mFDYU/ts/rUBJoFSgVGBdCqzOmq5UjNUTQ9UzXhS4Bzr7GSZTela3Ga6OrN2ARaKzBIpMTGFKAqUCbRWYiv/smwjgTsc37MP+6Av+8wOX8DBODXYr2K68CKalOXa2cEXbMYG90Q0FV7QWWZbsCc4VWP0j7mAJV6KTalf2E0cb2+cRCM+Da+mP4KymB9CbkQgu53sOi9lo2X405zdiy+9hCLsQHO9tvG4nQTq/EQLrnZWJLwl0XYE/AT6yIZZpt1oAAAAASUVORK5CYII="

/***/ }),

/***/ 276:
/*!**********************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/static/img/shop.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADxklEQVRYR82XWUhUURjH/3Nn5t7RccsStSxGKNMeCtukiDKil4gsK4j2HaFpD1otStoe2ieQ9mwhqCwjeologQrbpB7SLHAIS8Uyt5nm3pm5E2duysz13DtHe7ADw8C9//Od33e2738N6OVm6OXx0S2Atec8dlM0Nzs6jhvFCwaLWeBMJAGvKPskMeBxt8pvfW759qmVFgdrYkwA6y+LV+KSjPnWBGM0S2BXs9/d2ugvPbFEWBRJrwuw7uLvg/HJ5nWsA6sHIyAtDd6TJ5dFbdcC0QTYcE28k5LOz9TLIJH/EnzdJA3WTbS+Rrp7fIEwiyaiAtjP/96XlmUp1Iual7oKmbH3gpKqthkoqzurC1Fb6SlyrIjarRZ1AbAXty9LG269oBdtctJeSLIVz39uCcrG9z0KgWvD48Y9+hAfXMsdBTEXQ0VdAAof+Fy0Na9rV7qZDCIKBs9DibMYrd7k4LM4cwMW2wpQ/OUGfAEh+Cw1pisL2RNF00xWTQCy21OH8AtpaVz6AFT/jLSnlfcZfYGlw+naus/S1dDTETYDWtmTUMfKgUa3ErRkBrBYWf7OFvosKRrYmEMHUM9CJ4D9vLgtLYs/qJXj7qeAT2abARMH7Jukra2tlLY7VgiHiKITYPMN6VXSIPMYWrcWETj8AuCNgORng9g6HohXtkOX1vjV+/rIPH5sGMDO+77W2ERjLK2Dsxk4UwHY4gFnCxvA6mzAlkDXtjX52/ZPN8WFAex96JcEK2emdamoB25WAuPSgJe1bABzs4DsFLpWdMnePVONfBjAgWcBmTPRi9MjJ/CoBsjPBEqr2ACmpANTbHSt7ENgx0QDxwxwqxJ4Vw+sGQ2cfsMGMDIFmJPVDQC9JThbAdQ0A/tzgZ1P2ADSE4BV2d1YAr1NSE4AOQkXpgPL77MBkBNATgKtUTfhxuvS42SbOVfdwR8ACv9mfTUPWFjGBkBURbmAkVLuGpzeJ8fm85PD9gBxOwOGCafU4X+4gaPlALnddk0AblUBLR5lRpr//mshbcoB+lEszLeP4toO1xTxKq5uAi69B8b2BxKjtLMnUA0u5efyKrqlI4CMxPA+mlcxkdGKUfk3oKyafdpDlXkZQM6A8L66xYhI1QWpowz3BIHUjoHB+05pEcsxEREf2H+oZVtPBozU5/snzyG1P6RaMhY/GGkw9XstX6hpSll8ISuElh8MO4a0YMQf9hlkcfyLLf/11WNX+8DQsf7vDxP1rBDXJFgN+ZYYLpP2aeZpl6tEV6C0w+2wLBHTDLAE6qmm1wH+ALwhiDDkizPJAAAAAElFTkSuQmCC"

/***/ }),

/***/ 277:
/*!**********************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/static/img/team.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEaElEQVRYR+2WX4hUdRTHP+fO7PYQofdqRmVi7tzdMChQc9MQFEpLKkpKtBfDMp07aqZZ9tTuk/gni/Le1cR6S03EoKzUB33S1RLKCHHurJkQ/XHnziYRGM49Mf90d7h3d/wD9tB5GIb7O7/v+fzO7/zO7yfcZJObHJ//PoDl5qYi4QKQicBEhKOEdCebE+v+WDTu9+vN4KAZsNzTHYjx9iBB5gaOvft6IGIBTC/7viDLSuIqvJXQxN5eZ9xp0zvzgEjxVZSF5TFkdsFJfVX6b3b5aQl1GsIskHOCdoeS2FdIt3wRBxkJMNLLTQzRb8uThJeCtP1RvYDV5c9C+Ro4ETj2JMvzfwbGRAYSOoK03Rk1FglgublFiH4I7A8c+/E4esvzSwCzgPeAFVW/uVxiP82MFpUFqvpG+bvB1GCJfbReKxLAdH1XBAcNO4NMW0csQF2NGImmu3oXj/21v7/V5S9E2Q50B449pTEAL7dX0GdUjRcKmZYdcQCm2zNfJPykMq47A6d1fpSv5fnngHv+ucSov5bb5/v7xG3B64huANkZOKlI0ZKI5eV2gM6rCMqGwElV0l1nlpc9DvKQUnyw4Nx3sgEAfybC/rJjqDODpa0H60WHd50aa2jyJ9BekJFx9XK7m0sVRb8D+gLHHt3QFpRX52a3ILIYOKeoU3Ba99UmW17PCgjfrWQ+7MQwZqJMqa+Zkd6ZtpBiye8JVbxCxs40DGBu7RkjxfBL4P5qis8qelbABu6ufvsmcFKTLc9/Hvi0shP6PcifhDQhjAeGqXK+kLFHRW1PbCMaIBpThQo9CispcsFI0okyrdw5Bpj8jbAtmTTWRrXu6CLs8g+gPFbV+QXkmArH9JIel6RMFqUdtP1KJq5EVMgJ+htIk8IIgTuBW0FPorI6yNgHYovwSmFVEwzr8o69JiYB9G/XJR8DmdTrpE709y8VYSi6SeGp6vcB98eADJienxNoQfhBDePJwuKW0vkd1IZ/4E83EhyqOu0OHHtu1IQRbnaOiuyph7gMYLr+WhHKqw0c+6reCcO2+i2JIrmoFfaHMV1/jQhrgSOBYz9SrtnSz7DN/gTD4IjALWg4L8i07Rpq5fXjpus7Iril90KQtqdGzu/4sdm8o/moKBNEZE4+ndpbBrA8/2VgG3AgcOzS5XJNZnm5g6CPijaNz2fGnooSsVx/O1K+yjcFjr2qBvAOsFKGKLqhqCwvuxXkFUSfC9Kttf0eMM1yc6sQ3QjsChx7XhnA9PxDAtOF8Nm80/bZUIEGORWrBVk/2C1aK1qFwwXHnlHLwAXgtvBi0ux77d6+awbY0jNbwnCfwOd5x346SicOQK+l+usD1IvHHMcXVeRjUV2fz7S+WcvADQVoJIO1o14D6AbawyIz+pbZhxsRiPIxvWylBgax8q1YZCXL7YuX+8CIzdl2NaQEcUNMQn04v7T1WCNilzuetcUfT8im6iOzkblRPrsMw9jYu6Sl8qJuwK6q5Tagd9Uu/wP8C2RGwDC9uNyfAAAAAElFTkSuQmCC"

/***/ }),

/***/ 28:
/*!****************************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/randomArray.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 29:
/*!************************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/addUnit.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!***********************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/random.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 31:
/*!*********************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/trim.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 32:
/*!**********************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/toast.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 33:
/*!**************************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/getParent.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 34:
/*!************************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/$parent.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 35:
/*!********************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/sys.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 36:
/*!*************************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/debounce.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 37:
/*!*************************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/function/throttle.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 38:
/*!*********************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/config/config.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-03-17
var version = '1.8.4';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 39:
/*!*********************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/uview-ui/libs/config/zIndex.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/pages.json ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!*****************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/store/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: {
    token: "",
    username: "",
    avatar: "",
    phone: "",
    address: "",
    count: 0,
    money: 0,
    isLogin: 0,
    loginFlag: false },

  mutations: {},


  actions: {} });var _default =

store;exports.default = _default;

/***/ }),

/***/ 41:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 46:
/*!************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/static/recvGround.png ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjkAAAGHCAYAAABSw0P1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAG0mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDMtMjJUMjE6MzM6NDIrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA2LTExVDIxOjEyOjEwKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA2LTExVDIxOjEyOjEwKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI4ODU3ODkzLTI5ODYtNDZmOC05MDIwLWJlMjY2YzczNDJlMCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjNjM2FkZGVkLTlhMjEtM2U0NC05MjM5LWVjYmRiNjNmZmViMSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjhjM2NjOTk2LWNkYWMtNDBiZi1hOTBjLTk4ZDZlNWNjNWU0ZSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OGMzY2M5OTYtY2RhYy00MGJmLWE5MGMtOThkNmU1Y2M1ZTRlIiBzdEV2dDp3aGVuPSIyMDIxLTAzLTIyVDIxOjMzOjQyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZjQyMjMyOTctZTcyNy00ZWZjLTk4NTQtMDdmMGJmOThjYzA5IiBzdEV2dDp3aGVuPSIyMDIxLTA2LTExVDIxOjExOjI2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Mjg4NTc4OTMtMjk4Ni00NmY4LTkwMjAtYmUyNjZjNzM0MmUwIiBzdEV2dDp3aGVuPSIyMDIxLTA2LTExVDIxOjEyOjEwKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7+SCzyAABGr0lEQVR42u29CZBk933f9/+/1+fcswd2scDiIkgAAniAFEKRkijGcqyYRUuyy1LCslyBzKJUlGU5dBSXmFTJOaokx6qKQlqRFSWWzFJMMzrCWMVIthwqEiRSpBGSEgESIAksFgsssPfcR3e/I//vv6exvYM5Xp/zuvvzIRszszs7Pf1ed/8/7/f/HdYcAWmaltyHaXcruFuQpOasu707Ssxi7D6JUn2PMYk+GgAAAMgjVou4bd5Cdyu4/7j/19zX/97dnnJ/nbjbtrV246h+v2HLzRucvDzuhObt21FaqEVp4I7AqcDaBxJnNsmO3DS/H8kBAADIs+RYe/OjW8u98Lj1/oL7eK5StEkxsN8sBua33dfn3bddGqbwDEVy3INddLJyth6nj242zONxYt7sxOa4ojbtUgMAAADjgY/uBBINu+JM4Llq0S5XCvb3S4H5fffXV53sXB1pyXFyoy2puxqJ+R9Wa+l8I05PObl5IEmI0AAAAEwKko1C4KM9F5zonJsu2mfd1/+H++OvDVJ2BiI5Tm4q7sN/UI/Nz2820nev1VEaAAAAaKL8namiNVMl+1QpMP/Q/dEXnOws51pynNzMbEfpj9Vi8z31OP1+JzlsRQEAAMCeaEurWrCK8vy7Smh+qlSwl/opO32TnMgJzlY9/dFGkn58q2FMjNwAAABABhTZqRTMJ0uh/fOpkv1EaO2V3EjOVj1aWK7ZTzqv+atRwskCAACAzlHeTjEwvzZXNr9YLoRPH7nkrG5FC6sN+5E0NT9L8AYAAAB6IbBmycnOZxbK9n8sF+y3eik570lyXl2NKlFqP+rk5sfcl6c5NQAAANArTk5WSqH5arVgPjVVML9dKIRXuvw53fHyajSTpPZH3acf53QAAABAv1FispOcXzk2FX54aJJzYSmacfcsuflRTgEAAAAMkqoTnXLB/KO5cmcRnY4lZ0dwiOAAAADA0KgUzEemCuaTMx2ITkeS4wSn4gTnQwgOAAAADJPAmufLofklJzr/63Q5zJSMnFlynOAsuHv4iPv0ZznUAAAAMGyctCxVi+a/my6ZT1YzJCNnkpydCM5HDVVUAAAAcISEgXm+WjC/NF00nywfIjqHSg5VVAAAAJAnVHXlJOdXFqsHV10dKDmvrMWPxIn5BylVVAAAAJAj1B35WMX8cKUY/lbHklOPopkrm/bjSYrgAAAAQP6oFswnF8vmI/s1C9xTctI0raxspx9aradsUQEAAEAukcQcq9iPTJXsJ+0eQz3tHoKzUIvSj9zYTn+WYZsAAACQZ6oFuzRXNp8uhfYXneg8va/kOMGZdrePrtXNB1dqKVVUAAAAkGvCwJiZol2aLZlPOcn5qLut7Cc5d2xF6W+u1tJ312MOHAAAAOSfUmjMXNk+VS3YH3aS8+zrJMcJzqK7/fhyLf35jYa+5qABAABA/rHNknKzULa/4CTnY+528RbJSdL07lpkfnq5lvxkgygOAAAAjBDF0JjFcvDL5YKR6Jy/RXIacXp2rZ7+g41G+p8TxQEAAIBRQg0C58v2T6eK9r8PA/sHr0lOHMfTGw37/u3I/LfbcfoAhwoAAABGDSc4Zrpof7VatD/+muQ04vjUWs38va3I/NcxURwAAAAYQUJnNQsVe8HJzt+01j7pJWc7Sj6w2TD/aL1OFAcAAABGl/myVaWVJOd3vOSs1eKPbzTM36NsHAAAAEYZlZOfmg7UL+cfW5WOL22nn1ivp3+NQwMAAACjzpkZa8LAvluS85eWt9PPrtVJxgEAAIDR5/hUYKYK5j02SZIfubKZ/gZbVQAAADAOVAvGnJgK/qqN4/hvvrphfishkAMAAABjgHrmnJmxv27rUfq5SxvJuzkkAAAAMC7cPhN80a7Xk/TGFmEcAAAAGB9OTNkn7dJWkpJ0DAAAAOPEQsVJztXNJN1qIDkAAAAwPsyWnORc3ojTWsTBAAAAgPFhumietK+uxWkj4WAAAADA+FApOMm5uBqnDOUEAACAcaIcOsm5sILiAAAAwHhRDJAcAAAAQHIAAAAAkBwAAAAAJAcAAAAAyQEAAABAcgAAAADJAQAAAEByAAAAAJAcAAAAACQHAAAAAMkBAAAAQHIAAAAAyQEAAABAcgAAAACQHAAAAAAkBwAAAADJAQAAAEByAAAAAMkBAAAAQHIAAAAAkBwAAAAAJGeSWa8ZU4uMOT7NsYAmr640nw+lAscCAADJGUHOXzfm65es+dpVY96waMzfeOvonaq6k7M/OWfN2+5I+y5p+tm/+gVr3nnWmLe6nz8pC/43Lhvzu89Yc6xqzPfen5p7jvNaAQBAcjJeIf/vX7GHft+PPJqa2+f7v2i/4u7/+evWPHPFmK3o1r//8LtSM1MeLUn7jFuM9Ti0IP/td/RXRJ580Zo/eqH5edX93EfPNGVnlI5RL4+5xcMnjXnP/aPxuK9vGPPHz9lM3/s996dELwEAyTkKyfk7j/XvDVhX5l+7ZM3zSwd/39vdIv69b8r/6dL22hPPNSNQ7fQzGtWK4uwWwdZx+rZT/ZfQo+az37Tmy6/s/XeSvPfcm5q33DEer6+DLiRar5fdnF0Y3uO47wQCBoDkjLHk/Jfv7d9ha20/HIYWsh/7jvxuy0g8/uKiNV98yewpH+K99xrz2N29H7vPnbPm8xcO/p4zs8Z8+52puff4aOeu6Lh+5muHS3BLJP/Kg/mN6vRDcvaKZg2bvL8WAQDJ2TcK8c/+bLiSI/7ll6x5Ze3w7/v+h1LzwKnRk5t2fujNveWRZD1HeT5mWdH2zv/1tDU3tjpbgN//UD5zdcZFcloS/UNvRXQAkJwR4xf+aPiSo/yV33rq8PtV/sX7Hs7XKfu9r71+a+qwRfjxx7qPNnRyf1qI/tY7RvMp3qnM7ebddxnznfelI/n6En//u/YWiLxIjhiVLWQAJAeOVHLEP/9itiv2/d78jwpFcn7jS51FG7qVj04iAQdFA0ZJdP7g2WxbVaMSbcgqOfu9xvIkOXmWSQAkB8npu+T8n3/R/YI0DAYhZ0LbKv/qKzbTdlW3i0OnMjVOV9lfvWjMEy90dnxbqLLtg+9MR+r1NUqSM8rRQgAkB8lBcjKSdcutnU7yczpZ3MYxMVRRnX/9dLbcrfbj8IFH81UJNE6So+3jv/wAeTkASA6SM/aSI7JUPXUjI53mp/Sa3JxXFM36f76RLScpj4IzTpJDPg4AkoPkTJjkiKyVYi2y9M/p5LjmMTm73xzUMyfPgjMukoPgACA5uUY5JPW2/Ib25NROJEc/Qz+rxR8+19kCP2qSo8Tfl5cPPj6rNXPgArzfojG3T7VVPTYdRYeU61MKD/++ucpgSssVdVrbHvy5POi59n1vTM3Jmd5+/tV1zUx7/bl+6HRvfXh6lZxWM8BTs9nO836PrZOKwHZGuSUBAJIzIeQ94pJXyclb0mcvDGoe2Dgdo73otWKtV8npFUnSv/tW50ncio79R29EcACQHCQHyUFykJwcSk6nOWPtgpPX7T8AQHKQHCTndfRrxASSk3/J6WQ0xm5UIv4Dj4z34FcAJAfJyYR6krzl9N5/d1AegK4U33n28J//zWtm3zwM3feDJ/fPU3hpuffIBZKD5Iya5CiP7Hee6q7HkHLFvvs+SsQBkBwkZ9+FU5Uw5919HdbE7sPvOvxqMUtX5EE2J1NTun/7LTsWzwEkZ/wlp9tzQf4NAJKD5HQgOVmqjQ5bdLNOKx9keWunYxWQnMmUHOW+XN4n4pj1daecqb141z2H338v4zB0kfAfP0j+DQCSg+RkWjizNrI7rP1+1tlWWSJCSA6SM0jJGWTO22H338sIDLUfeOwutqcAkBwkp6OFM+vk7P16cOQhioPkIDl5lhz1q/o3z3bXp0oXGO97cLSHuQIAkvO6N2G9uS1Wbv27LG/Ou0PpemPVleN+C2fWuU77RXPyEMXpRHI6ydvIuiBmzdHI+jsiOeMhOaqcevJCd6XhgugNAJIzUXQ71kFv7GcX9v83WRe+3d1/s3YQPqiyq4UqvN55T/f5BkhO/yRHya3K/8gzLXnPq+R029ivdfxV0XjnQn+fA3ptIUwASM7YSU7WqpFRuBLvVSAOGtOwm69eMpmiVJKSLGSVwqOWnEE1I8wDg5YcSUS3W1N5fn0BAJKD5IyA5IwCSM7oSo7mp+V1SxDJAUBykBwkB8lBcpAcAEBykBwkB8lBcpAcAEBykBwkB8lBcpAcACQHyemf5GRt+IfkIDmTIDlqyFeL9n6eZJWT/RLN7zuRmnPX8is5g27jAABIzlAkR/05XrhuzPPXsjX6Q3KQnEmRnF5fX3tdSHRzjI+Cfk5PBwAk50jehLVADSocj+QgOUgOkgMASM6Rvgnvt3CKuUrqbvt/35+d3ztnQQvf/SdSc3Kmv49JOQwtHjrdfTg9q+R83xuzP4Y/fC5bvxPJWRbU8DDLpHQkB8lBcgCQnIlBeTXX1rONX+jlDS5L/o66Fz940pi33pGv/X06HiM5eZCcbo95K18m6/e3P0cG8XsDAJIzEJm5uGzM6rb13XFXtvZuXz8oyRnlRRDJQXLyKDlZnkMa4/CT39X8mZ/9ps3UFbt9YC6SA4DkjASq/MiynTEIyVGy8q9+4fBZO3pDfvyx/FVpkJOD5ORRcrL8zIdPGvO+h9OOxLpd1rPcR7tIAQCSM3YL9WHzlZQvkqUSS4Mb33RiMI+/HhvznfeluTt2SA6S043kdBO5y/o7/P3vujmdPGtBwiSeUwAkZ0TfaMeRXt6IkRwkJ2+S87lz1nz+wuHf14rKXN8w5tee7Dwqg+QAIDkjwyA7so6z5OS5qgXJmUzJ+edftJmm2Ld+Xtbt6t3nB8kBQHJGhqyJh0gOktMpv/e1bM0hkZzeJef89WzVkO35OFnPz7vvunVbF8kBQHJGhn4s1npDm6+akZMlJGewkpM1SojkdC452mp69rI1D55KzfFpY/7ll7L1WGqvkvqlP7WZKinV6+ktd3T2eyM5AEhOLsh6BbgfrYTEUcxRQXIGuyAhOf2VHLV8eOaSNV+9ZF7blvo7j2WfX9WeW9PJ6353GwQkBwDJGRl6lZPWGzCSg+QgOYORHEVSnrq0d6RGApL1dde+7ZR1m3p30rFaP3zsTzvbFgMAJOfIyPqmheTcyjcuG/O1S/19vFkbMer37ienZrsvpT+IrImwSE73SEKyNu9sdTnO2qNqL1k56gaTAIDk9Pxmq0Xn7XemmcLZkyo5g6DfHY9HZRGf1AVxmO0b3n7GmO99U/qaoP/uM9nuuz2HB8kBQHJGklbSot4I33n3ze7CWd6EWwuurg6VDLkXWQdF6qr0/e5NtVw4/Hf+vWezRQn0mL7t1N6nVrlESto8COVBrG139m9GVXJ2n8NeHmsnEcJJWhB1XF5xovD89eFWNbbn1XTSNqK9CSCSA4DkjCRKQjwzb255M+tUcvqxeCuy8lcePHyEQydRo1aIvlvGKfemU4bVLHHcF0Qdi5eXrXlp2RxJT6r2LaesDQB3/7sWWXvrIDkASE7u6YfkdFO9pVEObz6dmgdPvV68OpGm9hA9kjNcyelkLlonQ0xHBUUA/+DZfDTabBf9Tvpi7d6q6uT1sNe/BQAkZ6wkR6H53/hStm2lg64m33AiNfcebwpPJ9LUaxQHyelecrI2mhMqgx7UFuBRkjXxepC0R1Q6ieLsN2Az6+thHMUVAMlBcgYqCBKeV9dN5lycXqM4SE73kpO10dxhz6FR5qifO4qI/q133Dy2neTi7LfdlDUShOQAIDljLTmdXDUOgn5EcZCc7iSnk+qdcS4f15bVP/uzo3kNKBLzgUdvRsg62T486PWTVZSQHAAkZ6wlR1tVL1w35vlr2bct+sXuWTtIznAlp5OIQT/PVR7JOm4hq7hkjY790JtTc8/xmxcc/+or2SNrB0VBs27B9esiAwCQnFxKzlEJjxaCH/uOdM+EZSRn8JLTaaL5uF/xdxpB2U0rCf++E82v//XTh0tTe9JvJ43/sghKvyenAwCSM/KSs9dCqD4h55dM3xMzj1XdVej9N69ikZzhSU6nieb7JbeOE91sWbWLzW7Z0DH+rb/YX3R2C85B37sXB0XWOmkLgOQAIDkTKznttKYpP3u1v8Ij2Xnszv3L0JGc/ktOJ+XJol/J4Xkny5aVnq8PnjSvTRU/TCY/87XXbwm2C06nW1Qt6TwoCpr1/OqxfPCdvJ0CIDk5JmuYvZ9XbLpSzNrJuBNaXY+72RZpNXJrMVdJ3W0wx/wPn8t21a0tnkGx+7Fm7XXSSbJxi3EtHc/6WpJUPHomm9gcJE+tTuGt6KWes7/zVGeCI9rzePa6GMlaSMAEcgAkJzfoDVGLa7Xt6m1pO3tUpRfJUSj/2roxF1eaW1f9StDcD20DfPudN3vu5I1RnV3VTd7J7vLmcaZ9y0qvs4ducyJwvPctVUV0/uScNW+7o/sqqhZqz/CXH0j9z5tr2yKT6F7bsOYrr5i+JC4DAJIzdLptWta+UGlbZ9W9mc8dUFGhGVbbUfPNctBCcxCthaZ9TheS0/0i280MpknriPs5d5xOTA9OsHvpsKztpb/9juY2VSdNHPeDkQ4ASE6u6GarQbSHpY+6L043HBSeR3IOF5xOk1rbF1VyNvp7LrrtLL67n04nycX7QY8cACQnd2+SnZaZ7pYcMUpJunnMGxi1SE63csxco/7TbaJxu+B0+jzc72eOe8UcAJIzgnQTpt5r730Y83paicR6c/6Li9Z88SXTsaDlsVnZKObkdCo6JKUOVnT+zbPZomv7CU4v8rrfewIAIDkjeVX+fW9MzVvuuPXP+hHuPugNdK88GkWiOpGdvOYMjGricdbnjhbWxx+jE+4gybJ1dZDgtH7Gx/6089dwvxtxAgCS09c3x07f2PaLhvQjebH9jfOdZ4156PThi2NLdg7aMsvzG/GoSk4W0TlsYYX+cdDWVdbz0M04CnJxAJCcXNPJG9tB0ZBeBxP2Wmar+//ii3tX/eS58iPrVl9eu8nu1ywOwRk+e0VUOzkPqgb7/IXs90eeFQCSk3uyJg5nEYVOoznK1Ti7YMydC/27GpTsPPHczd+jvVQ2j4zDXKDd0SgE5+hoj66p3cMPPJJ9qzDrFqRet99zP+cXAMkZAQ4qA5cgvOV0tm2j/a4kW4ue3nBPuZv6hpyYMQN/g2x1Uv6ue/J9tTkOkiOx/BdPNrdKEJyjR9G1lS1j3v9wZ3K/13vB7tfuHQuG/CoAJGe0UARGDfvmq83Gfup42u2bmbqv1iJrTs6kpuzeINmvPxhF0rKQ90ZrGsD6mWcsgpMDlKfWbeRSz8fWGBOdRxKKAZAcADDNiA5X+QAASA4AAAAAkgMAAACA5AAAAACSg+QAAAAAkgMAAACA5AAAAAAgOQAAAABIDgAAAACSAwAAAEgOAAAAAJIDAAAAgOQAAAAAIDkAAAAASA4AAAAAkgMAAABIDgAAAACSAwAAAIDkAAAAACA5AAAAAEgOAAAAAJIDAAAASA4AAAAAkgMAAACA5AAAAAAgOQAAAABIDgAAACA5SA4AAAAgOQAAAABIDgAAAACSAwAAAIDkAAAAACA5AAAAgOQAAAAAIDkAAAAASA4AAAAAkgMAAACA5AAAAAAgOQAAAIDkAAAAACA50F+sSU1oYxOY2FjbPEWBSdx/052/bd5EnBZMkupvAw4cAAAAkpM/QhuZst025aBmQhPtSE7SJjnxa9/bFJqW5IT+lrh/VU9Kpp6W/Q0AAADJgaM9EbZuKoGTG7tlCjbysmNN56dFkZ0k9XrkZKditpOqqXnZsRxkAABAcmB4lGzNzIYrphpsGWMGcxoaacmsxbNmM5lBdgAAAMmBwTMdrJuFwvWuIjadY826E531ZM5EaYGDDwAASA70l1bOjaI3RdsY+v3HpuBlZzuZMo20yAkBAAAkB/ojODPBmpkKNvznR8lWMm1W43kTOdFJ2cICAAAkB7pBFVHKuZkK130OznC2pw5HkRxFdNbiOV+VBQAAgORAZiQ08+GSqQSqmmrk7veT3GzG02YjmfEJygAAAEgOHIoKuecLTcFpNvHLJ+q300jKZj2ZNVvJFCcOAACQHNiP1EwF62YuXM1l9OYgtHW1Gi+SpwMAAEgO3ETRmmJQ94nFkpy85N50Si2pmA0f1am6R8CYCAAAQHImGuujNxtmOlzzycWjjmZhrcYLZjut+M8BAACQnAlEW1Lz4bIp5zz3plN8rk5aMhvxzE63ZAAAACRnQkibpeHB+kDHMhw16qWj6ivl6zAWAgAAkJwxRxEbbU1Vgw3fudia8T6EmnCukRAqN1fXZAAAACRnHA+arZu5cGknejNZKKqjTslsXwEAAJIzRoQ29ltTs+Gq72I8qai8XNtXGg2hSiwAAAAkZ5QPlK2barBp5sJlDobHmlpa9hVYtaRsyNUBAAAkZ+SW8tSUgm0/WLPsPo5T9VQ/0PyrNZWaJ1VfjQUAAIDkjAAqDZ8O1s10uD7R21NZVHAzmfJ5OpIdAAAAJCfPB8YJjpKLy0ENwcmA8nTUU2ctnvd5OkR1AAAAyckhyrsh96Z7lJB8PTrJgQAAACQnD1iT+JJwbU+VJ7A0vN80x0LMm+10yvfYAQAAQHKOAG1HVZzYzIUrIzc1PM9oC2vN99SZ9v11AAAAkJxhHoCd0nD1vynYiGdEn1FujpKRJTsSnZRScwAAQHIGTXNqONGb4SDBUUSHqA4AACA5A0TbU1Phhu99g+AMD+Xm1NOyWY6P+ZwdAAAAJKefD9hJzbHCFf8Rjg5VX6kKCwAAAMnpEXUuVu7NfLhkQnJvjpzEhGYjnvFjIcjTAQAAJKdLSrbm+95Ugm2jXBzID0pKbnZKrnjxAQAAQHIyoDlTqp6aLyx50YF8EqUFLzrr8SyiAwAASM5hlO22mQrXTcVumdAylmEU0DgIP9U8Zao5AAAgOa+jNTV8LlhxH+u+kzGMluhs+VLzKaI6AACA5LQzG66YarDhq6cs+Tcjh5KQVWq+naqB4AIjIQAAAMlR75vjxat+mwrGg0Za9NtXlJoDAMBESo6a+VV2BmsqyRjGDc2/mjUbySydkgEAYDIkR1tRmjWl7alKsOkrqWB8UfWV+uo00pKfhwUAADC2kqO+N2ruR/RmctAoiO20WYHFWAgAABg7yVG3Ys2c0tRwSsMnj9QEZiup+u0rVWIBAACMheSUbN3MhUumFNTYnppo0bF+22rNJyVXOSAAADDKkpP67amZcN1XUQG0qKUVc61xivlXAAAwapKjoZpbfmtK+TcAe6GozkYyYzbjaRoIAgBA/iVHEZuyOheHy76xH8BBSG7W4jmznUz5WVhEdgAAIJeSo+Ri9b2ZCdfYnoLMNJOSp8xmMu2nmwMAAJKTG8lR7xttTU0FGz6KA9ANsZ9qPm1W43kvPgAAgOQcKSoH18wplYcrksPcKegFNQzcjGe97NTTEgcEAADJORrKdsvMF5ZNydY4I9BXNODzRnTCV2EZ8nQAAJCcYdFs7LdqZsM1Y4jcwMCwOw0EZ3ZydZAdAAAkZ2BLTuqjNn57ygsOwOCp+waC874Ci+orAAAkp++oU7EGaqqxX9GJDrk3MExUar4cLfrtK+ZfAQAgOX2jZLe93DA1HI5WdALTSEp+srkSk4nqAAAgOT1RdoIzt5NcTPQGjhqJjSI52r5Svg6dkgEAkJyOkdDMhKtmPlziaEMuqadlc9XPv6KnDgAAkpP1h9uGk5sbpuIb+xG9gfwiwbnSuN000iIHAwAAydmfgpObit0ys+GKb/IHMAqop85WMu3zdDT0k1wdAAAk59Yf6ARH21NVn1yM4MBoIbGpJ2Wzmiz45OSELSwAACTHuuVg1svNBlPDYeRRUvJ2WjEr0SJJyQAAkyw52p7S1PDpcJ3oDYwNiuLUkqpZi+d8cjIAAEyY5BRt3cyFy6Yc1BAcGEPsa52StxgJAQAwOZKjxGJtUSE3MO4oV0fjIJaiY2xfAQCMq+So70052DbTgfJvtjiCMFEoqrMZz/oKLJKSAQDGSHJUDq7OxWrspwniAJOIIjnK09lKpkxEXx0AgNGXHOXeSG5KPveGuVMAjZ1cnU0nO+TqAACMoOS0poarcoq5UwCvFx1FdNbjObavAABGSXIkNKqcUmO/Ar1vAPZE21cb8YzZSGbYvgIAGAXJUUO/E8XL7u2b3BuArLKjXB1tYQEAQA4lR+XgKgufCjZILgboAs2/WokXiOoAAORFcrQ1JanR1pT635BcDNA92rraiGcZ9AkAkAfJUfXUdLhmphisCdAzzUGfFbMcL/qIDqIDAHBEknNxtZYeL1z11VMA0D8080o5OttJFdEBADgKydnceDVVmTgADEZ0VqMFs51WORgAAMOWnGTreZrfAAyQOC2YVxt3ciAAAJAcgPFDU8yXopM0DQQAQHIAxo8b0QmzmcxwIAAAkByA8UIJyMvxMXroAAAgOQDjRWoCP9BzJVr0HZIBAADJARgbGmnRrMYLvjMyAAAgOQBjhbatrke30TsHAADJARgvlJNzPTrpxz4AAACSAzBWLEXHfaUV0RwAACQHYKzQEE+NfKDSCgAAyQEYKyJT8NGcWsK4BwAAJAdgjNA2VWvLCgAAkByAsUKl5LoBAACSAzBWqFeOqqwAAADJARgr1BjwcuMODgS8RuLejeNEk+vd88P9Rx+TNDVpak2q/6Xa6oRJQHWX1uqjNYH7qFsxNCZ0f1gIm19Tm4nkAOQWVVZdQnJ4HjipqTmb2W4Ys+0+1mNj6lFqttzXdfd15MwncZITp6mXoIR37IkgDJzIuI9BILHRgm1NtWhNKdTHpvBU3OflgvtYQHeQHICcoeTji/W7ORATyEYjNWu11Ky721q9KTZbTmwUxQHIgqI85VDSY8yUk58ZJz4LU4GZdp8XAo4PkgOQA16u38NBmBAUgVl3QnN9MzFL205somYEJ0JsoFfhcTfJTsUJzlTBmhPT1syVAx/lmeQYD5IDgOTAANGba83JzDUnNorcbDaaN0VuAAaBcnW0rVVxgqOozonpwMyXm3k9SA4AIDnQN15YSsyra7HZijgWcHScmbXmzrnQzJYny3SQHAAkB/qItp426qm5sZWYl1dTnzgMkAeUvHx8KjAnpqyZr1ifx4PkAACSA4eiN9FGbMzVjcRcWk/Mai2lCgryuvB70blzvhnZseP9WJEcACQHekXRm6ubqXlpJSbfBkaCxao19y40RWdcq7GQHAAkB3pAb55XNhLz4lLiy8KJ3sAooeqrE9XA3D4b+C0sJAcAkBzwKP/mxeXYR3AUyQEYRRTFmStbc99iM6ozTlVYSA4AkgNdsLSVmheWYt/vBmAcUGLy2fnAvOFYiOQAAJIziSh6o2Z+z92IzTZl4TCGnJq25p7F0MyURj+kg+QAIDnQAZfWEvPSarN6CmBcOelE543HQ1Md8ZlYSA4AkgMZUcfir1+N/WgGgF7Q3Cn5QxjY5iDOnSnjof9o/d/Hyc2BrHF6c0J9I2lOox80d80H5s65wHdPRnIAAMkZYxTBObeU+CGaAN3QGrewWLE+wVeTwwtBS2x2JCdoJv5KK5pik74mNy3ZUYNJ5YRpsOvaAPsxSb6OVa154HhoyiMa0UFyAJAcOAQtJE9fif3MKYBOkcwsVoxZqAZ++6da1DDN7quYmvPQUlOLm/2ZNMn+xnZzJlq/IzySsHsWmiXm+p2RHABAcsaIZbd4fOt6TA4OdIya7WnLZ7ES+KjIoNlykvPMtdgsb6Wm38/Wu93juP/46FVdITkASA7sg7YFnr5MmTh0hrZ2FPmQGAy7k7Cq/65tqPovMbU+zk1TjtDbTofmWHW0WiMjOQBIDuzBdqQRDYm/8QYJh6GtJ+XZKN9GybpHncOi7axrm6lvdyBJl/z0inarHr4tNCenR0d0kBwAJAdedzWcmsvrzURj5lDBoQtpaLzc3L0Q+s7BeUJbWC+vNofG9uO5PF2yPqJTGZFEZCQHAMmBXVxcS8z5JZr9weFUCsZ3CD5etU528rvwS3IkOyt92Hq9YzYw9y4GI1FxheQAIDnQRpqm5kuvxn1ZDGC8mSpaPwbh9EyQ+yne2q5a3k7Mt64nPVcJSuyUUH12Pv+JyEgOAJIDbWibSg3/mCYOB6FtKQnO8alAC+lIoDzkK+vNPDM1tOz2Ka4k5IWKNQ+fzH//HCQHAMmBHRpuFfiTFyMSjeFAFMl47I7CSPaNEaq6ev56bF5d7/6Zrkf+wInQnJ4NTJ4PA5IDgOSAaYbzzy3F/ioXYD9mdhJvhxHBUJdjVfnpuantsErR9k0oGrExT1+JzI2t7pf/qaIx9ysfaSrourEhkgOA5MAQuLqZmHM3EuZSwb6ookjdf++YG87+lJKFr26kXnQ0DuLElDWnZgLTL59QJ++vXo79z++W293vc89i4POTkBwAQHJyiBIx1dX4+tZwBh/C6FEKjZ/KfWJqOEnGEpxvXItv6W+j+5VgqbIptP2RilfXm5WEm43u/r0iS/cdC8xdOU1CRnIAkBzOwWpiXlxOerqihfFFIxlOTlnzJic5wygTl2h/4eVozyooJTmrm7LK1vuxRaSu3ho+e2El8bOwuuGYOzaPni4gOQCA5OQNXSk/czXy3WGpqILdBDuVRJKKYTX6U9O+P3mxcdDCbd6opN8+bV1J7i+uNkWnm9eAIkzffqbgGwUiOQCA5OQItbx/6nLkEzEBdjNfaUZwht3J+I/PNw4cxSDROTPXjOj04zfTGIinrnTfH0ozrR69PX9bVkgOAJIzsTTcIvLKauyHGQLsxYMnwqElGu+W76edfB80ikHbaHcvBObMTH+6D7/kXgsX/LZtd//+XWcLuUtARnIAkJyJZa2e+oqqa5ujKzkqadbspMBav7WiJUZv6Np2SNJm+bGu0vs5g0vbE1pUSzv3q/vUfes+m/fdvL9a1J/BkEeF+uCoH07liNJNlAx/2Mypkvvdzs5p4nloes1F1raVOiJf2ejupH3bydDnCyE5AIDk5AB1N/6GW0hGbatKclEtNGclnXGLynTRiUfY7KESBM3EVclFFDfLj5drxtzYSsxGvTfp0M+XVGna9kLVNgUraMqVxEc/W6LTcP9RKf7yVurLlPV5PIKrzJ3zgXng+NFtwWQdrqnnw0MnNT8r6Fl0XllLzDNXu3tB6Lmorb0wR56D5AAgOROLxje8ujY6oQaJxHwlMHe6K/fZkvGSk6XCRtJTdw9T+RYvr8ZmqYsGcNM7c5rUqyXr/XrhcXajpG41WdxojM5So740j50Jj3zopsTx6kZinrsRHyg6Pkdnp+qqF9HR/X35lchHOTtltqQE7eaoCyQHAJCcI+aLL0cj1fxPQxFvmw58JKWb8mFJx2otNS8sxR11up0pNauLVGXUTY+Y5nDI1DzvFupROd4Sujcdz0cirY6fztlhER2Jjn5n3zCwB9GR+H+9i2iOIkpn50LfHBDJAQAk5whRhOGJF6OR+X0lGZKcveRG4rLp5OHFlZsdm/X9za0lY8q7ohGKqLywlPjtusNQ1czDt4V+AduNtqKUILu8lZirm6nvJXPMXcXPl5tbWrvRAv21K7HfOssziuIo4fhYNV9JtCrzfvZafNii3peIzhdeirqKvOk58MipQm7GPCA5AEjORJJlwcgDkgvNB2pP6NQbdj1SBU7icygO2n7Sv5eoKDIxs9PHRAmtyvU4DG07POIEpz16o/wl3a/GDVw6QJLUw+XktPX33f7vFZV42onO9Rwne+tYa3xDHkcVaLvxxUMqoJQTc48733oc3VZdaXvxm9c7f31Ibt/snjPVnBw7JAcAyZlItNBmiWQcNZIFJZW2XxmrE+6l9dRvK2Tt0qwr7LPzoU8A1riAw/6d5jRpfMCZNrnSdpekSgvgZoarfEnC3W6x1aTq9t9fP0ORpDx2mFb0Q+MbVJYdBvl7PqRpai7uHL+Dtq7KTm6Vu9Wt6Oj8qutyp2NO9Lx55FToo3lIDgAgOUfE5y5EuR/jIEnQtsNt0zcXDPX2eXE59q34O23Dr8iMyrqz5MVogbx7IXytfFqLnZJRtd202cE2hh6DtruUlNraPlEUQo8hSzRp2FQLzd44x6aC3D4vJDrfuiFJTzOJjs5jp1tXuo8/eykyWx3u6GpnVJJzIifHD8kBQHImDpU4P3E+//k4PqIwe3O7R1s9ij5pgYsH6Ae6Gv82JyYL5Ztiovybc0vd9RTSgnffYvBano6Eadn9vK9fiXMnmnd4KQh8iX6un8Nx6vvZnDskoqNo1J1d5uhoO/diFyIqSVT0LszBIURyAJCciUORDFVW5ZnqTgRE4wRaa4VKwLVNcX3AibuqonrzqcItycbaojq3FHfVZ0eSpkX2zrbOwVqYNU5jeTs/y4+O8wMntL0W5mKBziI6Lyw3E8gPq7p64ESz6qoTLq7G5hvXEtPpGdI2p851KQcHEckBQHImDiXNfvVyviXnuKpUbivckrR77kbsF7VBooVJC9S9u8qAv/xq1FV/nRaLVWvefvutrYOfuhx33V13QAuil7vFqh2Z53IrR0cychDlVmfkhexl8TrfiuZsdlhllafEbSQHAMmZODSj55vX8p10fHI6cAvurcMXexWNLGhLSdVc7eXTh03Fzsp33128JTqkXj1qcqetsDygBF1VBmko56ihLsWvHNLYUudW1XJZ5UORQ1VYrXZ4fvTc0XNotozkACA5SM7QUR6Dmqvllb1EY90tNF+8OPjok+7zwRMFUy3e/DNth6garVe0wLZvmai3z7PX44GLW1a0+EssW6X2o0SWqis9qjceV8VVmKmpo7Z19Vq52mG0TcfvTSdCs1hBcgCQHCRn6Ch68OJyfiM52i558Li74m5bbLXQfPXy4MVMScJKOi62LYL9KrdXCfubjt/8waoUU/JxXgakanGW5GSJdKicXknTqhSLknwsoUrofmE5Nhv1/b9HHbOVBD6dQeS0TXXevU46HX2i562ev3nY9kNyAJCciUMheCXS5hWVemuic/vWjiJPuqoeNFoEH9m1TfbZc42+/Gzl+3z33TfzcrTwPJ2jvBwlXKtbbzlD2oqiJi+vNHv9jNKkdUVwHjxZ8G0JDlOQWtycOdbpBYGq8x70A0ORHAAkB8kZOt2Wxg4LRVMe3tVpWD1LNocw4PK+xfCWpON+5eO02J2Xo+2VcznZOtRWnRKPs2zlDCM/alDcfzw0d8wGhz5Odbe+uBab52909lpRFFDRwDz0ykFyAJCciUNbJK/muNuxj6bcdmtfk35FUw5jd97Mlrvbz7/Uv/t+99niQPJ9+iWX2q7KMnfpj883RiqC044GaGqQZumQiJW6Y6vpZKfjT3T89DxS8jySA4DkcBCGjLr2Xsq55GixbSeL5Ny7EJg757P1J9EW0VN75Pi85VTBz5waluTkqZz/5FRzqy6L5AxLOvuF8nVa0pz1eaJUI71OnulwIrndkZzbkBwAQHKGz9fdm3anyZRIzvhLzqRsV6kj8e2zwaEyp0iVtnWVqN8JOn4Ps10FAEjO0ZD3nJy9tqs+f0FzhNKBS44Sntsnnqt66HMX+ic533lX8bV5WEKy+fWr+diu2qvT836MauJxM1+m4ATk8OeI8rGUeHx+ubPzo+On59FxJAcAkJzhk/cS8hM71VXFtsVWyZ+HLTbTReujJMEeQ4pUTaNFpxWl2E9yNCtLU89baMvi/32hf5LzH95bvCWCkKWJ3bBQfyI1A6x2VEKeH8nJUkKu59YbjgWZegFtNVLzopOcTi8IVF2l59AxqqsAAMkZPqrmeWEpv5KjxeGhk4VbIh4X11Lz7NXut3V2R3n2k5yTO1GkdhHRnK8sk8sPQwvrO+8s3CIKSjq+mpMS8umdZoDTY9wMUIJzZu7WPkj7sbHTDLDTEn8dvwfokwMASM7RcGElNt+6nl/J0baJBiq2X20r/0N5IIOWnL2iSN90x+qlld63lO5dDH0juhYqUdZWVV6aASqCo0hOHsYRdPw+stqMTm5HBz++R3YeX5ZHqHEbinre6DD3SGMx3ugkZ56xDgCA5AyfvA/oVMddScnp2VuF4Ike+tVklRwvWG6BmmlboDQp/Euv9H683nGm4H9+C42q+Mb1ODeTyHVsFMlZqIzhgM5QHac7HNDpzss3rsU+otMJp2eaA14Z0AkASM4RoK0XbcHkmb16tvTS3yer5Cif4i73fVoQWyjn5AsvNUyth2COFtnvOFu8pXJJSa0XdpJ384BSmR460ewTFIyA5zTi1E+lV6+henzgQu8jg+39j7JwcTX28tTp2ZHgaJJ9lgR4JAcAyYF+Lw5Jap44n2/J2avS5+XVxDx/I+4q0TWr5OwnWL0mCO+V0Kz7z8tWVQsJnm6aSJ53wdE5PLd0sOCEzmvunFWy8a3VelnotgpRJeqKQubAcZAcACRnMsl7x1pFVNRrRPkNrbVitdZMBL3ehRh0Ijm6T+WmtC/0KvVWfka9i2iORE1T1dtL02tRap66EpuV7XwtPws7+SRzOc/LUZTlJScgB1VSSXBOVK0fsRDYzh/Pv385MmsdblXpbt6ck27HSA4AkjOx9Guy9iBRom4z7H8z+qH8FUVVOt3i6URytDg+dKLZFLAVzdFW1ctd9EwR9yyE/r7LbY9DeVHPXItMnLNToMerrZ3TOd2yylJFJXSs9dyRWHYTldKctC84yUk7tAPJubpGz+dEEpEcACRnIlEYvtOZPMNGiZvaZritrQOxok8vLjc7NneSI9OJ5AgNcLzb/ZtWzxgtdspl0kiMjQ4GhapCTBEplWe3gglaQLVI53W0huRAj72Swy2rLFVUktR75rsXHKF8qW9e7/z10UmvISQHAMmBAaGchidejHL/e6rXyFtPF27Jb1Ak5NqmRCHO3L/mvp2oUKs0/DDJaYnRfcdurcbppCJK/X6Un7F7wTt3I/YJs3mWS/3eeejz0iJrFZWSjM90mYPTzhdeijqS2RYnpxTJKeQmCobkACA5E0s3OQdHwR1OTrTl094cUGi7Qo30LrubIjzqUNvKM1IERZVMupI/7hZr5Ui0VzZlnf79Zo0AaNu2EroPSY565zTc5/Uo9VElbZGU3P2V/FZJsxS7/T69nG0oFyf/cnn3fGDuPx7m4ndpVlFpezU9tIrqTcebVVS9CE63k+HLBSVuhz5xOy8gOQBIzsSiHiAvr47G4KGzbvHQwlsqmNc1ctP2j7YvlJDc2sZQTokWncqOdOyWI1VKPZ9h8KJkSVEBRWV2X51LqjYbzW0sJUUrWVffP1OW8Nz6zRIcNZXTfa6PgFjquD12R7Y5VoMWnCxVVBIcbU/d32MERwL75Ve6k3+d//uPBWaxiuQAAJJz5CivRVsv8YgMWFQisvJz2vNbOl80jc+F0U1ikgWJi7a7FJkpht3dpyI/55ZGQ3BaKCpy9gijEi3ByVJFpRyq+46pbLu3faLrm6n580vdRdoUQdI2XyE/joPkACA5k4sWXA2+zFuvln0XM9tsza8rdkVWlDuSJfdBb/C1SCXoiY9cqV1/p+Xzkptj7gr97FzgZxNpYbWH3KfkUd1ytUjf2Eq87IwSio4omnNUSbRK/D2s0V+p1cl4vrcIjlBk7lvuPq9udqcEuyfYIzkDJDWBqacl00hKppaW/Z8F7k8LtmHKwbYp2rp7geJ2R01iQlN356jhzpXOl16j1v1p0Z2nSrDl3tSjsT9PSM7RoUX34lrsRWeU0FaK8nNUyaLGfdVCUzp0BS3p0daQJCZOU1OPmv11JHLKm9noIZIiyVJUp+g+UZ6OIjsld4dB0Py72P3oRDk67hdQ5Eb5N4pGSCbjEX0Zv/FYYO5aGP6elUYqPH05OrTRn7Ywz8z2p3nhheVm753tLgI5uvd3nS3kpqpqjCXHusWybG5EJ0yUFvZ/4G4RPVa46mUHjkJuArOdTJnlaNGLzn6U7bY5UbzixQfJgUEtJk+5xWTUogwwHJp5JsOvtDqsWaWvoprbqaLqw/1tqTnj5dhH+bpBUb5Hbw9zd/7GTnLW4zmzEi+6a//DT7sWzhPFy24hrfFKHjLL7hxtuHOV9TydLr7iozpIDvSbetx8c1/eJrILr0eRMZVFq0FgcUhzChRJ+dyFg4exqo+P8qT6UaqtKJu2xZSIn3T5Mnj77WGuEo7HUnIkOFo8TQdeq+2rmXDVTAUbJhjjaEFeUARnJV7wgtMJJSeic+Gy38JCcqDf5G1QJOQLuc0JJzpvcqIzjKGTaryoAbJ79alpVVEpgtMPwZHkKwH/xZXuc6a0bakJ83lkbCQnSovmcuNMpsjAfqIzHayTpzNgwdlMps1ydLzjf6vzIsGZD5f8+UJyoJ9s7iRcXt9KO25jD5OB70HjJEc5UMOoHrq0E1lp37LS/apnkqZ891pF1UJT7c8vxb4VQDdItO5bVIfoMK/nbfQlR0nGy9Exs5HMdP0zFMWZCVec6GyM7bbIUVJLK2YjnjXbSdXLTjdIdBRxWyhcHysZRXLyQasXyUYdy4G9UcL3PQuBF41hINHRjC9FGJXQq2iSb/TXp5+v/JuvXo57imCqpYG2zVRxh+QMCCUaS3LqO1VU3SK5mQo2zXx4g1dzH1EC+HJ83NSSshfSXtC21fHC1bESUSQnH6hzr8YNjEpzQDgaVF32ttNhX6qZDkMl+BIQRXMUxak40enXbpm2pp6+EvkGjb1In5r/qZt2kNOh7WMhOcrFWUvmTJz2vicYmNhJzrKZDtd4NfdJcHR+NpLZrrYS9xJRSU5pjJLFkZz8oOTjL71CJBf2R+9ip2c126qQ24X9MJRcfHE1Nt+6nvQUE1fPpLtyOsh0rCRH5eLK9TCmfwe6Wbp8mRydHlDU5krjdtNIi339qZKcarCJ5MBAUAM2JSIDHMRixfrZVioxHyW0RfWce46rdUIvq5saUT5yKjSzpXw//rGQnOvRSbPlJae/lJzozIRrfkFFdjq4SnByo/ybtXjuwB443dKUnA0kBwaCGuj9fxdHa/wAHA1qyHj7TOA7Dg+rvLxbVEXVmh223WOwsjmANTD3LIYm74o3FpKztBPJSQdwuFXJo4oedUmmxPxwtD21lUyZlfjYQH6+ZPMYkRwYMIrknF+OD+w2C+AXUbfgKxn5tun8bttoe0oT4zWUdbMPxaka/qqKqrx1Nx5byelnTs5eKE+n4iRnOljzsgOvR4JZT8pmNV7wCeDpgPy+YCMvOeTkwCBpuFXhklsQXlhKfEIywEFovMJcyfqIjkrMbU7Wfi3s2p66sNycz9aP0RoSm0dPhyMhOGMjOSpLVpdjzT8aFIogaBTEbLiyE0UglN0uOBJNbRkq/yYdYACzZOtOcq542UFyYJBoWKEapF2k2goyrRHGl1GrMd5d80cf5VDvJ5WfX99KfEJ9P/o/Sd40hFORnFFhLCQn8X1yju8kHw/4gDnRmQrWzVS4YUJDFYakRoKznVYHFklrF0365MDQ5D1tDrb8+tXYLxgAWVBU51ilOThVPW3CIfuAys5Xaonfcl2rN3Nx+tXg8uzOrKxwdBxnfDoea4tElTxDeyL7bZNrO3OvJu8NsBW9WfFjNIaDtgoXwuteNMcJJCff+G2r5QTRgY6ZL1s/Y0rDK4chBnqOSspXBjCH7dS0qqkKI3cOxmp21WYyc+hU634v9coNqQZbphJsjt3iuxtFzDQ+o5ZUfN+bKB3eE15bhNoqLI3hMFUkJ/8o3P/1K5HZIngL3VygFaxZrBg/wFLbWNWC8TOweumzoyaBSoxXFeB6LTU33HNUktPvsSSSM0Vw1OU5z/1wJkJy/JtRdMxvWw1PdJqyo0VYs68kOuM4FkLbUtvJlNlKqjudpYf3ZFf+jSI44zicE8kZofO0GvsETkQHukVSI8k5XrU+f0eio07Gqj4Pdj6GQbOrsd5hNW0hTlJfHaVtqLj10f3BshObtZq2VJOuJ4cfKjjul1ioqvFhOJKCM5aS0+8Ou50uxoroVOyWKQV1X5U1yuj4JWnoBUdzwVQaboZ8TCehAzWSMyKvB3eJrBLc88sp08qhZ/ROKsFRlKfkbhoAWvRf62MzylNzVqPxC7o5lzGR+7rmJLueDGeQ7Mkpa+6YD5yUBSN7nMdOcoS2VVajhSOI6LQW5sQd2LrfWpH0lEdsi0XHT1tSitxIcLRFlZjhP8mLfjr8io+QjXWEAMkZKa5upubllbinmT8AeeeOWU07D710jTJjKTmiFdE5KtFpyY6aCUp2lDRbDmq5ju7oOG3FU75SSscvGnA5+MHHLjbzhSW/DTjuTRiRnNFC2wXK0dH4B5KRYRxRsrQkZ1R64Uyk5LRQDsn16FQufhe7k7sj4VEptD3yxdu+1qF4y0dtSkcmNe1ICiU4mh82CSA5o4kERy3yr2wgOjAelHz35tA3NRwXxl5yRC2t+ITkQTYL7AYlKFfcQq6trYJpGGsTH7XQzdq0LxEMRWeS1PphmUna/Ok6Do2dKqmjinLtTepnhamz9LhXqiE544Fvl78am8vrqe8sCzCKKDdITQzVA0cJ0XaMHttESI5QN971eHagIwd6Eh4TOemJvfgogdl/7v6sXXQCe+tWlzW7O/RYLzJNXWiKjWRGycPuJ/pmfbodRX7NYei3Vf7SYuHGyCdsIzmTx/Wt1LxwIzbrjdRvZwGMCpomfqxqzZm5IPcTxZGcA2ME1guOREcJtekIuKoWfqcmPqrjbdvWbxGcpuLc7P0rqWl1HVb0JjajkTEmqdEW3iQKDpIzPiw70Xl1vTkjSNUwxHUg3+uLMbNl6/vfnJwK/KDRcWRiJKeFtmckOiqJjtMCz/QjRnk3Kg+v+CnvkznyGckZH9THREnJV3ZkhynmkEemi9aPnLh91o5s/xsk58A3ovC1PJ185aRM0lWEBp7WfA8c9RSyZnJj/EjOeKE3Uw33XNluNhBcJVcH8rPgm9Ozzb43iuKUwol4zJMnOTffjAJztXFqp4MvDJOF8IaP4FiC+kjOmHNpPTUvLse+/T7AUXH3fGDunFfn4okTu8mVHKGoznoy53vqpMbyShgwkppjhau+lB6QnEmhkRhzfil2wsMWFgwXJRM/eLJg5ib0Wt5LTrz5fGonfH1XWfVqPG/qScXEbGH1/4lmG6YcbO3M96pzQJCciUQl5xv11FzdTPyk6Jra9UepiajIgp4vII1PHla1lG7Hp6wTm8B3LJ7k5d1LTrR5Lg0sodRmY7xpP8284ZOSiez0ih9x4aSmmVy8Nfbdi5EcyMp2ZJzoJGZtZ4q0hGcrogQdOhAbt0SVw2ZuTbVgzUzZmGPVwMyUeptwPk6UQyc59c3zacESQ22h3jL1tGLW4jk/2gC6Q52LZ8MV97E+lpPZkRzo2wWWE5t6nJqtRnMoo4SnHjW/1p9HfhK1NXHanEidcE06EYSB8V3NWhPKNbizUrRebCrFZofiivtc0Zpxr5LqlkrBSU5t80I6SR1ms6D8nO2k6nvqaORBHhvo5faFaSIzHa77yI2iOCQXIzmQHQmMojkqR2+4/8ReajR1Wq+k5vRpXlGTgbRF0Rr1IFZkRrdCqJ5p1n8MLPsNh1GV5GxvXkxLEzInqFPRUWKyBlZqG6uelElOPgBtRSmhWHJTnuC+N0gOAEA+mC46ydnaupaWzQpH4xBUar4SLfoeO7DriRSs+eiNtqgAyQEAyAMLZfuk3a6tpaXkCkcjI5IcbWXV3C3K6SyoQaPZWgXbMBW75WdOsd2J5AAA5I2TU/ZLttHYTsPoIkejA5qzsCQ7FR/haSSlsZcdP/LTy020IzdblIMjOQAAueX2meC3bZLE/yLZfuk/C6iw6gqNhqg7yZHs1Lz0lHw35fGRm1auzbaP3khyyLdBcgAA8owfYzETvN+mafqhxvYrv1owJB/3KjvavtJNW1mSHTUZHE2xSU0pqPkcG0VrWmXgVEohOQAAo4AGkR6r2vdKcn68Ubv6K4V0jaPSB5pVWQXfOVl9dpS/I9mJRmDquaRGlVFFH7Fp+HLwwCbIDZIDADBSqDHidNH8JUnOD8aN1U/b6JqxVEgPDOXsNBOWK2Yzmc7Bllbqt560FVW22z5yQ0diJAcAYBw4M2tNaO37vdY0Gmu/nkarj7NlNUzpaW1vFV/b5tKfKRKUpBIgZcNY3wSsqSTBgX16dr7bf64xHbb5k5y4pl5eQhP7xOFmlKZu1OXaIjVIDgDAmFEOjbltOvgFa+0/9KtmFNV+OYnXP1xIljk6Ryw+sRMcbXdJTdSMsFW11f756wWnKTLaWhKhTw5uVkPp89ALEEKD5AAAjD+zJXt5oWI/6CTn//aSkyTxTyTxxs+Yxo2zVFkBIDkAAKOI5nzNlu3vzpWDH2gGARxpmt4TRds/ncbrf7eQrnKUAJAcAICRY6po/3y6aH++WrS/2S451SSJ3pPE6z8TxMvvZWsDAMkBABglNLR0tmQ/4STn5wqh/eZrkrMjOvdHceNnbHT1g0FKAjIAkgMAMDqUQ2sWq/ZXioH5J9baF3ZLzjF3+0+jxvLPBcnafGAijhgAkgMAkHvCwJiZol2fK9t/7L78NSc5r94iOTuic38Ubf+mjZcfDdJNjhoAkgMAkGskMpWCNfMV+41iYH7YCc5X2/+uXXIUzfm5uLHyQ2Fy4xiHDgDJAQDIMwVFcUp2Y6Zo/sAJzt9tRXFeJzk7onMyjqMPxI2rHyuaLY4eAJIDAJBbZkv26lzZfiqw5uNOcJ5r/7s9W+hKdBqNjX8axlf+E+YWASA5AAB5RBVVJ6r2F8sF+8u7BWdfydkRnR9s1G58OkyWmWkFgOQAAOSOk1NW+TjvV3fjvf7+QH2p1zf+5zRe+4mi2eBIAiA5AAC5oVq0iuJ8wgnO4/t9z4GSkyTJyTha+5E0Xv9IwWyf5ZAC9A+NUL1Yv5sDAQDQARKXcsFcnSnaT02Vgp867HsPJI7j+9N4478y8dKP0jsHoH/EpmBerd/JgQAA6IBS2BScasF8PAyD53qSnObIh/jdcbzxvwTx6hsCU+cIA/SBelo2Vxq3cyAAADJSCIwqqT5aDs2ni2Fw47Dvz5RS7ERnOo4bH0yi9Z8qpEtv4DAD9M5WMmWuR7dxIAAAMhA6wZku2E9NFc1/UyocLjiZJWdHdE5GUe0DSbz6sUKyRsUVQI+sx3NmOabnJgBAFmZL9p9qi6pSPHiLqivJaZOdx2v1jV8vxpcRHYAeuB6dNFvJNAcCAOAQTk3bT5QLweOd/ruuNMWJznsb9dX/LUjW32BNzdAwEKAzlI+zEh0zNfcRAAD2FhTl4EwV7afmKwdXUfVVckQURz+ZxFuP23j5gcA0ZhAdgOxoq2otmTNxWuBgAADslhNnJ+XQCU7BfqpSMB8vhNm3qPoiOaq6crfb42jzr6fJ9ofDZPUN1iI6AIeRmMDciE6Y7WSKgwEAsItiYMxU0V6tFu1HC4H5dGDtjW5/Vs9ZNc2E5O2/EaRb3x9Fm+8r2hpnCOAAGmnRSc5t/iMAANykFPqJ4p8thfaPnOxoHtWNXn5eX1KHnegcS5L4rjje/JBJtn4iSDfdtWrC2QLY/VpxLzlFcBTJSQ2Z+wAAQoM2ndxIcv64HNqfdl9fdILzaq8/t+/vsk54PhRFtR+Mo6X3Fcw2sgPQRjPheNHU0goHAwCQmx25mSraJ4uB+aQTm/+pnz9/IJeSiuy4D+9tRLW/niabbyuk24+kaQ3hgYlGScbryZxZi+c4GAAwsRQCY4qh3SoH5lKlYJ8qhuZT7o//qB+Rm6FITpvs3O8+vCWK6/9FGq0shqaxkKbJ7cZECA9MHJvJtI/iaGYVAMAkoYhN0f3HWnOjHJpL0yX7XGjN77m/etLJzZcHdb9DSQpwsvOY+3B/ksQPRdHmX7PpdjW08R1pEs0gPDAJKP/mhm/+R0UVAEwGTmJ81Cawdst9frlatKul0DzhXOcJ99fPD1Juhio5bbJTdR80drmapPF7kiR6j01rBWvSe5I0fTSNG24xiIxN3c2Jj3rvqCydHjww6izHx816PMuBAICxQQKhfjZ2R2gCZy+SGt3cl8+7L79cDG3svn7Gff377ttW3U0JxevD/B2P5sq2mbejEcw2TZP7kjT5vjSJTxoTu18q3rn2vXkDGGXWk1mTpCEHAgDGS3R2JEfbUYH7IvSRG1NzH/6t+/IrxvitmuVB5Ntk4f8HjKWS5n/E5AIAAAAASUVORK5CYII="

/***/ }),

/***/ 47:
/*!*************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/static/placeGround.png ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjkAAAGHCAYAAABSw0P1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAG0mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDMtMjJUMjE6MzM6NDIrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA2LTExVDIxOjE2OjU3KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA2LTExVDIxOjE2OjU3KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmQ0NTRlYmI0LTRlM2ItNDlkZi1iNzJkLWQyZWU2ZGY4ZjZlOCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjkyYzdhYzMyLWQ0OGItMTY0OS1iMDk3LWYxMzQ3NjQ2OTQ3YSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjhjM2NjOTk2LWNkYWMtNDBiZi1hOTBjLTk4ZDZlNWNjNWU0ZSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OGMzY2M5OTYtY2RhYy00MGJmLWE5MGMtOThkNmU1Y2M1ZTRlIiBzdEV2dDp3aGVuPSIyMDIxLTAzLTIyVDIxOjMzOjQyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZjQyMjMyOTctZTcyNy00ZWZjLTk4NTQtMDdmMGJmOThjYzA5IiBzdEV2dDp3aGVuPSIyMDIxLTA2LTExVDIxOjExOjI2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDQ1NGViYjQtNGUzYi00OWRmLWI3MmQtZDJlZTZkZjhmNmU4IiBzdEV2dDp3aGVuPSIyMDIxLTA2LTExVDIxOjE2OjU3KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBl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"

/***/ }),

/***/ 50:
/*!***********************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/network/recvOrder.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getRecvOrder = getRecvOrder;exports.getSwiper = getSwiper;var _config = _interopRequireDefault(__webpack_require__(/*! ./config.js */ 51));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function getRecvOrder(params)
{
  return (0, _config.default)({
    url: "/getMyRecvOrder?token=" + params.token + "&page_id=" + params.page_id + "&recv_state=" + params.recv_state,
    method: "get" });

}


function getSwiper() {
  return (0, _config.default)({
    url: "/getSwiper" });

}

/***/ }),

/***/ 51:
/*!********************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/network/config.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default;var baseURL = 'https://scut.chenct.top/api/v1';
// const baseURL = 'http://localhost:8000/api/v1'


function _default(options) {
  return new Promise(function (resolve, reject) {
    uni.request({
      url: baseURL + options.url,
      method: options.method || 'get',
      data: options.data || {},
      success: resolve,
      fail: reject });

  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 60:
/*!**********************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/pages/modifyInformation/list.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.list = void 0;var list = [
{
  value: 1,
  label: "大学城校区",
  children: [{
    value: 1,
    label: "c1" },
  {
    value: 2,
    label: "c2" },
  {
    value: 3,
    label: "c3" },

  {
    value: 4,
    label: "c4" },
  {
    value: 5,
    label: "c5" },
  {
    value: 6,
    label: "c6" },

  {
    value: 7,
    label: "c7" },
  {
    value: 8,
    label: "c8" },
  {
    value: 9,
    label: "c9" },
  {
    value: 10,
    label: "c10" },
  {
    value: 11,
    label: "c11" },
  {
    value: 12,
    label: "c12" },
  {
    value: 13,
    label: "c13" },
  {
    value: 14,
    label: "c14" },
  {
    value: 15,
    label: "c15" }] },



{
  value: 2,
  label: "五山校区",
  children: [{
    value: 16,
    label: "西一" },
  {
    value: 17,
    label: "西二" }] },


{
  value: 3,
  label: "国际校区",
  children: [{
    value: 18,
    label: "D1" },
  {
    value: 19,
    label: "D2" }] }];exports.list = list;

/***/ }),

/***/ 61:
/*!************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/network/modifyInfo.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.modifyInfo = modifyInfo;var _config = _interopRequireDefault(__webpack_require__(/*! ./config.js */ 51));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function modifyInfo(params, info)
{
  return (0, _config.default)({
    url: "/modifyInfo?token=" + params.token,
    data: {
      phone: info.phone,
      link_img: info.link_img,
      fid: info.fid,
      sid: info.sid,
      address: info.address },

    method: 'post' });

}

/***/ }),

/***/ 70:
/*!******************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/network/pick.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getToken = getToken;exports.getItems = getItems;exports.checkQulification = checkQulification;var _config = _interopRequireDefault(__webpack_require__(/*! ./config.js */ 51));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function getToken(params) {
  return (0, _config.default)({
    url: "/getToken?code=" + params.code });


}
function getItems(params) {
  return (0, _config.default)({
    url: "/getOrder?page_id=" + params.page_id + "&token=" + params.token + "&state_id=" + params.state_id });

}
function checkQulification(params, oid) {
  return (0, _config.default)({
    url: "/sureOrder?token=" + params.token,
    data: {
      oid: oid },

    method: 'post' });


}

/***/ }),

/***/ 77:
/*!************************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/static/img/sucess.png ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 86:
/*!***********************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/static/img/wrong.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/wrong.png";

/***/ }),

/***/ 97:
/*!********************************************************************!*\
  !*** C:/Users/MagicBook/Desktop/软件开发实训/1.0/接单模块/network/detail.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getDetail = getDetail;var _config = _interopRequireDefault(__webpack_require__(/*! ./config.js */ 51));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function getDetail(params)
{
  return (0, _config.default)({
    url: "/getSuccess?token=" + params.token + "&oid=" + params.oid,
    method: 'get' });

}

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map