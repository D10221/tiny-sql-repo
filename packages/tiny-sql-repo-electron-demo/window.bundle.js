/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./window.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../tiny-sql-repo-electron/client.js":
/*!*******************************************!*\
  !*** ../tiny-sql-repo-electron/client.js ***!
  \*******************************************/
/*! exports provided: invoke, invoker, CHANNEL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dist_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dist/client.js */ "../tiny-sql-repo-electron/dist/client.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "invoke", function() { return _dist_client_js__WEBPACK_IMPORTED_MODULE_0__["invoke"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "invoker", function() { return _dist_client_js__WEBPACK_IMPORTED_MODULE_0__["invoker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CHANNEL", function() { return _dist_client_js__WEBPACK_IMPORTED_MODULE_0__["CHANNEL"]; });



/***/ }),

/***/ "../tiny-sql-repo-electron/dist/client.js":
/*!************************************************!*\
  !*** ../tiny-sql-repo-electron/dist/client.js ***!
  \************************************************/
/*! exports provided: invoke, invoker, CHANNEL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _invoke_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invoke.js */ "../tiny-sql-repo-electron/dist/invoke.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "invoke", function() { return _invoke_js__WEBPACK_IMPORTED_MODULE_0__["invoke"]; });

/* harmony import */ var _invoker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invoker.js */ "../tiny-sql-repo-electron/dist/invoker.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "invoker", function() { return _invoker_js__WEBPACK_IMPORTED_MODULE_1__["invoker"]; });

/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types.js */ "../tiny-sql-repo-electron/dist/types.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CHANNEL", function() { return _types_js__WEBPACK_IMPORTED_MODULE_2__["CHANNEL"]; });




//# sourceMappingURL=client.js.map

/***/ }),

/***/ "../tiny-sql-repo-electron/dist/invoke.js":
/*!************************************************!*\
  !*** ../tiny-sql-repo-electron/dist/invoke.js ***!
  \************************************************/
/*! exports provided: invoke */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invoke", function() { return invoke; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "../tiny-sql-repo-electron/dist/types.js");

/** */
const invoke = (action) => __webpack_require__(/*! electron */ "electron").ipcRenderer.invoke(_types_js__WEBPACK_IMPORTED_MODULE_0__["CHANNEL"], action);
//# sourceMappingURL=invoke.js.map

/***/ }),

/***/ "../tiny-sql-repo-electron/dist/invoker.js":
/*!*************************************************!*\
  !*** ../tiny-sql-repo-electron/dist/invoker.js ***!
  \*************************************************/
/*! exports provided: invoker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invoker", function() { return invoker; });
/* harmony import */ var _invoke_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invoke.js */ "../tiny-sql-repo-electron/dist/invoke.js");
/* harmony import */ var _rejectNullOrUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rejectNullOrUndefined.js */ "../tiny-sql-repo-electron/dist/rejectNullOrUndefined.js");


const invoker = (config) => (dbName) => {
    const { name, pkey, pkeyAuto } = config;
    return {
        pkey,
        get: (id, columns) => Object(_invoke_js__WEBPACK_IMPORTED_MODULE_0__["invoke"])({
            type: "get",
            payload: { id, columns },
            meta: { use: dbName, from: name, pkey, pkeyAuto },
        }),
        set: (payload) => Object(_invoke_js__WEBPACK_IMPORTED_MODULE_0__["invoke"])({
            type: "set",
            payload: Object(_rejectNullOrUndefined_js__WEBPACK_IMPORTED_MODULE_1__["rejectNullOrUndefined"])(payload),
            meta: { use: dbName, from: name, pkey, pkeyAuto },
        }),
        find: payload => Object(_invoke_js__WEBPACK_IMPORTED_MODULE_0__["invoke"])({
            type: "find",
            payload,
            meta: { use: dbName, from: name, pkey, pkeyAuto },
        }),
        update: (payload) => Object(_invoke_js__WEBPACK_IMPORTED_MODULE_0__["invoke"])({
            type: "update",
            payload: Object(_rejectNullOrUndefined_js__WEBPACK_IMPORTED_MODULE_1__["rejectNullOrUndefined"])(payload),
            meta: { use: dbName, from: name, pkey, pkeyAuto },
        }),
        insert: (payload) => Object(_invoke_js__WEBPACK_IMPORTED_MODULE_0__["invoke"])({
            type: "insert",
            payload: Object(_rejectNullOrUndefined_js__WEBPACK_IMPORTED_MODULE_1__["rejectNullOrUndefined"])(payload),
            meta: { use: dbName, from: name, pkey, pkeyAuto },
        }),
        remove: (id) => Object(_invoke_js__WEBPACK_IMPORTED_MODULE_0__["invoke"])({
            type: "find",
            payload: { id },
            meta: { use: dbName, from: name, pkey, pkeyAuto },
        }),
        count: (filter) => Object(_invoke_js__WEBPACK_IMPORTED_MODULE_0__["invoke"])({
            type: "count",
            payload: filter,
            meta: { use: dbName, from: name, pkey, pkeyAuto },
        }),
        exists: (filter) => Object(_invoke_js__WEBPACK_IMPORTED_MODULE_0__["invoke"])({
            type: "exists",
            payload: { filter },
            meta: { use: dbName, from: name, pkey, pkeyAuto },
        }),
    };
};
//# sourceMappingURL=invoker.js.map

/***/ }),

/***/ "../tiny-sql-repo-electron/dist/rejectNullOrUndefined.js":
/*!***************************************************************!*\
  !*** ../tiny-sql-repo-electron/dist/rejectNullOrUndefined.js ***!
  \***************************************************************/
/*! exports provided: NUllOrUndefinedError, rejectNullOrUndefined */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUllOrUndefinedError", function() { return NUllOrUndefinedError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rejectNullOrUndefined", function() { return rejectNullOrUndefined; });
class NUllOrUndefinedError extends Error {
    constructor(message) {
        super(message);
        this.name = "NUllOrUndefinedError";
    }
}
function isNulOrUndefined(x) {
    return typeof x === "undefined" || x === null;
}
function rejectNullOrUndefined(x) {
    if (isNulOrUndefined(x)) {
        throw new NUllOrUndefinedError("value can't be null|undefined");
    }
    for (const key of Object.keys(x)) {
        if (isNulOrUndefined(x[key])) {
            throw new NUllOrUndefinedError(`property '${key}' of ${x.name || typeof x} '${JSON.stringify(x)}'  can't be null|undefined.` +
                `value is not serializable, parameter can't be inferred, try using TediousParameterLike, or don't include null|undefined 'key/value'? `);
        }
    }
    return x;
}
//# sourceMappingURL=rejectNullOrUndefined.js.map

/***/ }),

/***/ "../tiny-sql-repo-electron/dist/types.js":
/*!***********************************************!*\
  !*** ../tiny-sql-repo-electron/dist/types.js ***!
  \***********************************************/
/*! exports provided: CHANNEL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANNEL", function() { return CHANNEL; });
const CHANNEL = "@tiny-sql-repo-action";
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./window.js":
/*!*******************!*\
  !*** ./window.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tiny_sql_repo_electron_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tiny-sql-repo-electron/client.js */ "../tiny-sql-repo-electron/client.js");


function onError(error) {
  console.log("%s", error && error.name ? error.name : "Error");
  console.error(error);
}

async function main() {
  try {
    const table = Object(_tiny_sql_repo_electron_client_js__WEBPACK_IMPORTED_MODULE_0__["invoker"])({
      name: "tiny-sql-repo-electron-table-one",
      pkey: "id",
      pkeyAuto: true,
    })("no-db-name-required");
    window.table = table;
    let x = await table.find({
      filter: "id>10",
      searchText: "a",
      columns: ["id", "value", "value2"],
      searchColumns: ["value2"],
      skip: 1,
      take: 1,
      orderByDesc: false,
    });
    console.log(x);
    x = await table.update({
      id: 1,
      value: "1",
    });
    console.log(x);
    x = await table.update({
      id: 1,
      value: undefined,
    });
    console.log(x);
  } catch (error) {
    onError(error);
  }
}
main();

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL3Rpbnktc3FsLXJlcG8tZWxlY3Ryb24vY2xpZW50LmpzIiwid2VicGFjazovLy8uLi90aW55LXNxbC1yZXBvLWVsZWN0cm9uL2Rpc3QvY2xpZW50LmpzIiwid2VicGFjazovLy8uLi90aW55LXNxbC1yZXBvLWVsZWN0cm9uL2Rpc3QvaW52b2tlLmpzIiwid2VicGFjazovLy8uLi90aW55LXNxbC1yZXBvLWVsZWN0cm9uL2Rpc3QvaW52b2tlci5qcyIsIndlYnBhY2s6Ly8vLi4vdGlueS1zcWwtcmVwby1lbGVjdHJvbi9kaXN0L3JlamVjdE51bGxPclVuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi4vdGlueS1zcWwtcmVwby1lbGVjdHJvbi9kaXN0L3R5cGVzLmpzIiwid2VicGFjazovLy8uL3dpbmRvdy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvblwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTRCO0FBQ0M7QUFDRjtBQUMzQixrQzs7Ozs7Ozs7Ozs7O0FDSEE7QUFBQTtBQUFBO0FBQXFDO0FBQ3JDO0FBQ08sMkJBQTJCLG1CQUFPLENBQUMsMEJBQVUscUJBQXFCLGlEQUFPO0FBQ2hGLGtDOzs7Ozs7Ozs7Ozs7QUNIQTtBQUFBO0FBQUE7QUFBQTtBQUFxQztBQUM4QjtBQUM1RDtBQUNQLFdBQVcsdUJBQXVCO0FBQ2xDO0FBQ0E7QUFDQSw4QkFBOEIseURBQU07QUFDcEM7QUFDQSxzQkFBc0IsY0FBYztBQUNwQyxtQkFBbUIsMENBQTBDO0FBQzdELFNBQVM7QUFDVCwwQkFBMEIseURBQU07QUFDaEM7QUFDQSxxQkFBcUIsdUZBQXFCO0FBQzFDLG1CQUFtQiwwQ0FBMEM7QUFDN0QsU0FBUztBQUNULHlCQUF5Qix5REFBTTtBQUMvQjtBQUNBO0FBQ0EsbUJBQW1CLDBDQUEwQztBQUM3RCxTQUFTO0FBQ1QsNkJBQTZCLHlEQUFNO0FBQ25DO0FBQ0EscUJBQXFCLHVGQUFxQjtBQUMxQyxtQkFBbUIsMENBQTBDO0FBQzdELFNBQVM7QUFDVCw2QkFBNkIseURBQU07QUFDbkM7QUFDQSxxQkFBcUIsdUZBQXFCO0FBQzFDLG1CQUFtQiwwQ0FBMEM7QUFDN0QsU0FBUztBQUNULHdCQUF3Qix5REFBTTtBQUM5QjtBQUNBLHNCQUFzQixLQUFLO0FBQzNCLG1CQUFtQiwwQ0FBMEM7QUFDN0QsU0FBUztBQUNULDJCQUEyQix5REFBTTtBQUNqQztBQUNBO0FBQ0EsbUJBQW1CLDBDQUEwQztBQUM3RCxTQUFTO0FBQ1QsNEJBQTRCLHlEQUFNO0FBQ2xDO0FBQ0Esc0JBQXNCLFNBQVM7QUFDL0IsbUJBQW1CLDBDQUEwQztBQUM3RCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLG1DOzs7Ozs7Ozs7Ozs7QUNoREE7QUFBQTtBQUFBO0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELElBQUksT0FBTyxtQkFBbUIsSUFBSSxrQkFBa0I7QUFDNUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEOzs7Ozs7Ozs7Ozs7QUNyQkE7QUFBQTtBQUFPO0FBQ1AsaUM7Ozs7Ozs7Ozs7OztBQ0RBO0FBQUE7QUFBOEQ7O0FBRTlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsaUZBQU87QUFDekI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxPOzs7Ozs7Ozs7OztBQ3ZDQSxxQyIsImZpbGUiOiJ3aW5kb3cuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi93aW5kb3cuanNcIik7XG4iLCJleHBvcnQgKiBmcm9tIFwiLi9kaXN0L2NsaWVudC5qc1wiOyIsImV4cG9ydCAqIGZyb20gXCIuL2ludm9rZS5qc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnZva2VyLmpzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3R5cGVzLmpzXCI7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNsaWVudC5qcy5tYXAiLCJpbXBvcnQgeyBDSEFOTkVMIH0gZnJvbSBcIi4vdHlwZXMuanNcIjtcclxuLyoqICovXHJcbmV4cG9ydCBjb25zdCBpbnZva2UgPSAoYWN0aW9uKSA9PiByZXF1aXJlKFwiZWxlY3Ryb25cIikuaXBjUmVuZGVyZXIuaW52b2tlKENIQU5ORUwsIGFjdGlvbik7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludm9rZS5qcy5tYXAiLCJpbXBvcnQgeyBpbnZva2UgfSBmcm9tIFwiLi9pbnZva2UuanNcIjtcclxuaW1wb3J0IHsgcmVqZWN0TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSBcIi4vcmVqZWN0TnVsbE9yVW5kZWZpbmVkLmpzXCI7XHJcbmV4cG9ydCBjb25zdCBpbnZva2VyID0gKGNvbmZpZykgPT4gKGRiTmFtZSkgPT4ge1xyXG4gICAgY29uc3QgeyBuYW1lLCBwa2V5LCBwa2V5QXV0byB9ID0gY29uZmlnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwa2V5LFxyXG4gICAgICAgIGdldDogKGlkLCBjb2x1bW5zKSA9PiBpbnZva2Uoe1xyXG4gICAgICAgICAgICB0eXBlOiBcImdldFwiLFxyXG4gICAgICAgICAgICBwYXlsb2FkOiB7IGlkLCBjb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIG1ldGE6IHsgdXNlOiBkYk5hbWUsIGZyb206IG5hbWUsIHBrZXksIHBrZXlBdXRvIH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc2V0OiAocGF5bG9hZCkgPT4gaW52b2tlKHtcclxuICAgICAgICAgICAgdHlwZTogXCJzZXRcIixcclxuICAgICAgICAgICAgcGF5bG9hZDogcmVqZWN0TnVsbE9yVW5kZWZpbmVkKHBheWxvYWQpLFxyXG4gICAgICAgICAgICBtZXRhOiB7IHVzZTogZGJOYW1lLCBmcm9tOiBuYW1lLCBwa2V5LCBwa2V5QXV0byB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGZpbmQ6IHBheWxvYWQgPT4gaW52b2tlKHtcclxuICAgICAgICAgICAgdHlwZTogXCJmaW5kXCIsXHJcbiAgICAgICAgICAgIHBheWxvYWQsXHJcbiAgICAgICAgICAgIG1ldGE6IHsgdXNlOiBkYk5hbWUsIGZyb206IG5hbWUsIHBrZXksIHBrZXlBdXRvIH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdXBkYXRlOiAocGF5bG9hZCkgPT4gaW52b2tlKHtcclxuICAgICAgICAgICAgdHlwZTogXCJ1cGRhdGVcIixcclxuICAgICAgICAgICAgcGF5bG9hZDogcmVqZWN0TnVsbE9yVW5kZWZpbmVkKHBheWxvYWQpLFxyXG4gICAgICAgICAgICBtZXRhOiB7IHVzZTogZGJOYW1lLCBmcm9tOiBuYW1lLCBwa2V5LCBwa2V5QXV0byB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGluc2VydDogKHBheWxvYWQpID0+IGludm9rZSh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW5zZXJ0XCIsXHJcbiAgICAgICAgICAgIHBheWxvYWQ6IHJlamVjdE51bGxPclVuZGVmaW5lZChwYXlsb2FkKSxcclxuICAgICAgICAgICAgbWV0YTogeyB1c2U6IGRiTmFtZSwgZnJvbTogbmFtZSwgcGtleSwgcGtleUF1dG8gfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICByZW1vdmU6IChpZCkgPT4gaW52b2tlKHtcclxuICAgICAgICAgICAgdHlwZTogXCJmaW5kXCIsXHJcbiAgICAgICAgICAgIHBheWxvYWQ6IHsgaWQgfSxcclxuICAgICAgICAgICAgbWV0YTogeyB1c2U6IGRiTmFtZSwgZnJvbTogbmFtZSwgcGtleSwgcGtleUF1dG8gfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBjb3VudDogKGZpbHRlcikgPT4gaW52b2tlKHtcclxuICAgICAgICAgICAgdHlwZTogXCJjb3VudFwiLFxyXG4gICAgICAgICAgICBwYXlsb2FkOiBmaWx0ZXIsXHJcbiAgICAgICAgICAgIG1ldGE6IHsgdXNlOiBkYk5hbWUsIGZyb206IG5hbWUsIHBrZXksIHBrZXlBdXRvIH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgZXhpc3RzOiAoZmlsdGVyKSA9PiBpbnZva2Uoe1xyXG4gICAgICAgICAgICB0eXBlOiBcImV4aXN0c1wiLFxyXG4gICAgICAgICAgICBwYXlsb2FkOiB7IGZpbHRlciB9LFxyXG4gICAgICAgICAgICBtZXRhOiB7IHVzZTogZGJOYW1lLCBmcm9tOiBuYW1lLCBwa2V5LCBwa2V5QXV0byB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgfTtcclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW52b2tlci5qcy5tYXAiLCJleHBvcnQgY2xhc3MgTlVsbE9yVW5kZWZpbmVkRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XHJcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJOVWxsT3JVbmRlZmluZWRFcnJvclwiO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGlzTnVsT3JVbmRlZmluZWQoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInVuZGVmaW5lZFwiIHx8IHggPT09IG51bGw7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJlamVjdE51bGxPclVuZGVmaW5lZCh4KSB7XHJcbiAgICBpZiAoaXNOdWxPclVuZGVmaW5lZCh4KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBOVWxsT3JVbmRlZmluZWRFcnJvcihcInZhbHVlIGNhbid0IGJlIG51bGx8dW5kZWZpbmVkXCIpO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoeCkpIHtcclxuICAgICAgICBpZiAoaXNOdWxPclVuZGVmaW5lZCh4W2tleV0pKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOVWxsT3JVbmRlZmluZWRFcnJvcihgcHJvcGVydHkgJyR7a2V5fScgb2YgJHt4Lm5hbWUgfHwgdHlwZW9mIHh9ICcke0pTT04uc3RyaW5naWZ5KHgpfScgIGNhbid0IGJlIG51bGx8dW5kZWZpbmVkLmAgK1xyXG4gICAgICAgICAgICAgICAgYHZhbHVlIGlzIG5vdCBzZXJpYWxpemFibGUsIHBhcmFtZXRlciBjYW4ndCBiZSBpbmZlcnJlZCwgdHJ5IHVzaW5nIFRlZGlvdXNQYXJhbWV0ZXJMaWtlLCBvciBkb24ndCBpbmNsdWRlIG51bGx8dW5kZWZpbmVkICdrZXkvdmFsdWUnPyBgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4geDtcclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWplY3ROdWxsT3JVbmRlZmluZWQuanMubWFwIiwiZXhwb3J0IGNvbnN0IENIQU5ORUwgPSBcIkB0aW55LXNxbC1yZXBvLWFjdGlvblwiO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJpbXBvcnQgeyBpbnZva2VyIH0gZnJvbSBcIi4uL3Rpbnktc3FsLXJlcG8tZWxlY3Ryb24vY2xpZW50LmpzXCI7XHJcblxyXG5mdW5jdGlvbiBvbkVycm9yKGVycm9yKSB7XHJcbiAgY29uc29sZS5sb2coXCIlc1wiLCBlcnJvciAmJiBlcnJvci5uYW1lID8gZXJyb3IubmFtZSA6IFwiRXJyb3JcIik7XHJcbiAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHRhYmxlID0gaW52b2tlcih7XHJcbiAgICAgIG5hbWU6IFwidGlueS1zcWwtcmVwby1lbGVjdHJvbi10YWJsZS1vbmVcIixcclxuICAgICAgcGtleTogXCJpZFwiLFxyXG4gICAgICBwa2V5QXV0bzogdHJ1ZSxcclxuICAgIH0pKFwibm8tZGItbmFtZS1yZXF1aXJlZFwiKTtcclxuICAgIHdpbmRvdy50YWJsZSA9IHRhYmxlO1xyXG4gICAgbGV0IHggPSBhd2FpdCB0YWJsZS5maW5kKHtcclxuICAgICAgZmlsdGVyOiBcImlkPjEwXCIsXHJcbiAgICAgIHNlYXJjaFRleHQ6IFwiYVwiLFxyXG4gICAgICBjb2x1bW5zOiBbXCJpZFwiLCBcInZhbHVlXCIsIFwidmFsdWUyXCJdLFxyXG4gICAgICBzZWFyY2hDb2x1bW5zOiBbXCJ2YWx1ZTJcIl0sXHJcbiAgICAgIHNraXA6IDEsXHJcbiAgICAgIHRha2U6IDEsXHJcbiAgICAgIG9yZGVyQnlEZXNjOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5sb2coeCk7XHJcbiAgICB4ID0gYXdhaXQgdGFibGUudXBkYXRlKHtcclxuICAgICAgaWQ6IDEsXHJcbiAgICAgIHZhbHVlOiBcIjFcIixcclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5sb2coeCk7XHJcbiAgICB4ID0gYXdhaXQgdGFibGUudXBkYXRlKHtcclxuICAgICAgaWQ6IDEsXHJcbiAgICAgIHZhbHVlOiB1bmRlZmluZWQsXHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKHgpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBvbkVycm9yKGVycm9yKTtcclxuICB9XHJcbn1cclxubWFpbigpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=