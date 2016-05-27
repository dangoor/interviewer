(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("immutable"), require("react"), require("redux"), require("react-redux"));
	else if(typeof define === 'function' && define.amd)
		define("subdivide", ["immutable", "react", "redux", "react-redux"], factory);
	else if(typeof exports === 'object')
		exports["subdivide"] = factory(require("immutable"), require("react"), require("redux"), require("react-redux"));
	else
		root["subdivide"] = factory(root["immutable"], root["react"], root["redux"], root["react-redux"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.reducer = exports.default = undefined;

	var _reducers = __webpack_require__(2);

	Object.defineProperty(exports, 'reducer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_reducers).default;
	  }
	});

	var _Subdivide = __webpack_require__(7);

	var _Subdivide2 = _interopRequireDefault(_Subdivide);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Subdivide2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Divider = exports.Layout = exports.Pane = undefined;
	exports.default = subdivide;

	var _immutable = __webpack_require__(3);

	var _constants = __webpack_require__(4);

	var _LayoutHelper = __webpack_require__(5);

	var _secondPass = __webpack_require__(6);

	var _secondPass2 = _interopRequireDefault(_secondPass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Pane = exports.Pane = new _immutable.Record({
	  id: '0',
	  childIds: (0, _immutable.List)(),
	  isGroup: false,
	  direction: undefined,
	  parentId: undefined,
	  splitRatio: 1,

	  top: undefined,
	  left: undefined,
	  width: undefined,
	  height: undefined,

	  canSplit: undefined,
	  joinDirection: undefined,
	  props: {}
	});

	var Layout = exports.Layout = new _immutable.Record({
	  rootId: '0',
	  //  dividerSize: 3,
	  borderSize: 1,
	  cellSpacing: 3,
	  touchMargin: 2,
	  mode: undefined,
	  dividerDown: undefined,
	  cornerDown: undefined,
	  cornerHover: undefined,
	  width: 800,
	  height: 600,
	  panes: (0, _immutable.Map)({
	    '0': new Pane()
	  }),
	  allPanesIdsEver: _immutable.OrderedSet.of('0'),
	  dividers: (0, _immutable.Map)()
	});

	var Divider = exports.Divider = new _immutable.Record({
	  id: undefined,
	  top: undefined,
	  left: undefined,
	  width: undefined,
	  height: undefined,
	  borderSize: undefined,
	  touchMargin: undefined,
	  beforePaneId: undefined,
	  afterPaneId: undefined,
	  beforeRatio: undefined,
	  afterRatio: undefined,
	  direction: undefined,
	  parentSize: undefined
	});

	var firstPass = function firstPass(state, action) {
	  state = (0, _LayoutHelper.deserialize)(state);

	  switch (action.type) {
	    case _constants.SPLIT:
	      return (0, _LayoutHelper.split)(state, action);

	    case _constants.JOIN:
	      return (0, _LayoutHelper.join)(state, action);

	    case _constants.SET_SPLIT_RATIO:
	      return (0, _LayoutHelper.setSplitRatio)(state, action);

	    case _constants.SET_SIZE:
	      return (0, _LayoutHelper.setSize)(state, action);

	    case _constants.SET_CORNER_DOWN:
	      return (0, _LayoutHelper.setCornerDown)(state, action);

	    case _constants.SET_CORNER_HOVER:
	      return (0, _LayoutHelper.setCornerHover)(state, action);

	    case _constants.SET_DIVIDER_DOWN:
	      return (0, _LayoutHelper.setDividerDown)(state, action);
	    case _constants.SET_STATE:
	      return (0, _LayoutHelper.deserialize)(action.state);
	    case _constants.SET_PANE_PROPS:
	      return (0, _LayoutHelper.setPaneProps)(state, action);

	    default:
	      return state;
	  }
	};

	function subdivide() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? Layout() : arguments[0];
	  var action = arguments[1];

	  state = firstPass(state, action);
	  state = (0, _secondPass2.default)(state);
	  return state;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var NE = exports.NE = 'NE';
	var SW = exports.SW = 'SW';
	var SE = exports.SE = 'SE';
	var NW = exports.NW = 'NW';
	//export const ROW_SPLIT = 'ROW_SPLIT'
	//export const COL_SPLIT = 'COL_SPLIT'

	var ROW = exports.ROW = 'ROW';
	var COL = exports.COL = 'COL';
	var JOIN = exports.JOIN = 'JOIN';
	var SPLIT = exports.SPLIT = 'SPLIT';

	var CHILD_ABOVE = exports.CHILD_ABOVE = 'CHILD_ABOVE';
	var CHILD_BELOW = exports.CHILD_BELOW = 'CHILD_BELOW';
	var CHILD_LEFT = exports.CHILD_LEFT = 'CHILD_LEFT';
	var CHILD_RIGHT = exports.CHILD_RIGHT = 'CHILD_RIGHT';
	var CHILD_NONE = exports.CHILD_NONE = 'CHILD_NONE';

	var SET_STATE = exports.SET_STATE = 'SET_STATE';

	var CORNER_DOWN = exports.CORNER_DOWN = 'CORNER_DOWN';

	var ADD_CHILD_PANE = exports.ADD_CHILD_PANE = 'ADD_CHILD_PANE';
	var REMOVE_CHILD_PANE = exports.REMOVE_CHILD_PANE = 'REMOVE_CHILD_PANE';
	var REMOVE_PARENT_PANE = exports.REMOVE_PARENT_PANE = 'REMOVE_PARENT_PANE';
	var SET_SPLIT_RATIO = exports.SET_SPLIT_RATIO = 'SET_SPLIT_RATIO';
	var SET_SIZE = exports.SET_SIZE = 'SET_SIZE';
	var SET_BLOCK = exports.SET_BLOCK = 'SET_BLOCK';
	var SET_DIVIDER_DOWN = exports.SET_DIVIDER_DOWN = 'SET_DIVIDER_DOWN';
	var SET_CORNER_DOWN = exports.SET_CORNER_DOWN = 'SET_CORNER_DOWN';
	var SET_PANE_PROPS = exports.SET_PANE_PROPS = 'SET_PANE_PROPS';
	var SET_CORNER_HOVER = exports.SET_CORNER_HOVER = 'SET_CORNER_HOVER';

	var JOIN_RIGHT_ARROW = exports.JOIN_RIGHT_ARROW = 'JOIN_RIGHT_ARROW';
	var JOIN_UP_ARROW = exports.JOIN_UP_ARROW = 'JOIN_UP_ARROW';
	var JOIN_LEFT_ARROW = exports.JOIN_LEFT_ARROW = 'JOIN_LEFT_ARROW';
	var JOIN_DOWN_ARROW = exports.JOIN_DOWN_ARROW = 'JOIN_DOWN_ARROW';

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.deserialize = deserialize;
	exports.split = split;
	exports.join = join;
	exports.setSplitRatio = setSplitRatio;
	exports.setSize = setSize;
	exports.setCornerDown = setCornerDown;
	exports.setCornerHover = setCornerHover;
	exports.setDividerDown = setDividerDown;
	exports.setPaneProps = setPaneProps;

	var _constants = __webpack_require__(4);

	var _immutable = __webpack_require__(3);

	var _reducers = __webpack_require__(2);

	var _secondPass = __webpack_require__(6);

	var _secondPass2 = _interopRequireDefault(_secondPass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getNextId(state) {
	  var panes = state.get('panes');

	  var id = 0;
	  while (panes.get(id + '') !== undefined) {
	    id += 1;
	  }

	  return id + '';
	}

	function deserialize(subdivide) {
	  if (subdivide instanceof _reducers.Layout) return subdivide;
	  var panes = (0, _immutable.Map)();
	  var dividers = (0, _immutable.Map)();
	  Object.keys(subdivide.dividers).forEach(function (key) {
	    var divider = subdivide.dividers[key];
	    dividers = dividers.set(key, (0, _reducers.Divider)(divider));
	  });
	  Object.keys(subdivide.panes).forEach(function (key) {
	    var pane = subdivide.panes[key];
	    panes = panes.set(key, (0, _reducers.Pane)(_extends({}, pane, {
	      childIds: (0, _immutable.List)(pane.childIds)
	    })));
	  });
	  return new _reducers.Layout(_extends({}, subdivide, {
	    panes: panes,
	    dividers: dividers
	  }));
	}

	function wrapPane(state, id) {
	  var pane = state.panes.get(id);
	  var parent = state.panes.get(pane.parentId);
	  var parentId = pane.parentId;
	  var groupId = getNextId(state);
	  var group = new _reducers.Pane({
	    id: groupId,
	    isGroup: true,
	    childIds: (0, _immutable.List)([id]),
	    parentId: pane.parentId,
	    splitRatio: pane.splitRatio
	  });
	  state = state.set('allPanesIdsEver', state.allPanesIdsEver.add(groupId));
	  pane = pane.set('parentId', groupId);
	  state = state.setIn(['panes', id], pane);
	  state = state.setIn(['panes', groupId], group);
	  if (parent) {
	    var childIds = parent.childIds;
	    childIds = childIds.set(childIds.indexOf(id), groupId);
	    state = state.setIn(['panes', parentId, 'childIds'], childIds);
	  }
	  return { state: state, group: group };
	}

	function getDirection(splitType) {
	  if (splitType === _constants.CHILD_ABOVE || splitType === _constants.CHILD_BELOW) return _constants.COL;
	  if (splitType === _constants.CHILD_LEFT || splitType === _constants.CHILD_RIGHT) return _constants.ROW;
	}

	function getOffset(splitType) {
	  if (splitType === _constants.CHILD_ABOVE || splitType === _constants.CHILD_LEFT) return 0;
	  if (splitType === _constants.CHILD_BELOW || splitType === _constants.CHILD_RIGHT) return 1;
	}

	function split(state, _ref) {
	  var id = _ref.id;
	  var splitType = _ref.splitType;
	  var startX = _ref.startX;
	  var startY = _ref.startY;

	  var pane = state.panes.get(id);
	  var parent = state.panes.get(pane.parentId);
	  var direction = getDirection(splitType);
	  var isRoot = id === state.rootId;
	  var oldPane = pane;
	  var oldParentId = pane.parentId;

	  if (!parent || parent.direction !== direction) {
	    var out = wrapPane(state, id);
	    parent = out.group;
	    parent = parent.set('direction', direction);
	    state = out.state;
	    if (isRoot) {
	      state = state.set('rootId', parent.id);
	    }
	    pane = pane.set('splitRatio', 1);
	  }
	  var childIds = parent.childIds;
	  var index = childIds.indexOf(id);
	  var newPane = new _reducers.Pane({
	    id: getNextId(state),
	    parentId: parent.get('id'),
	    splitRatio: 0.2
	  });
	  var offset = getOffset(splitType);
	  childIds = childIds.splice(index + offset, 0, newPane.id);
	  var beforePaneId = offset ? pane.id : newPane.id;
	  var afterPaneId = offset ? newPane.id : pane.id;
	  var ratio = direction === _constants.ROW ? (startX - oldPane.left) / oldPane.width : (startY - oldPane.top) / oldPane.height;
	  var ratioA = ratio = offset ? ratio : 1 - ratio;
	  var ratioB = 1 - ratioA;
	  if (newPane.parentId === oldParentId) {
	    ratioA *= oldPane.splitRatio;
	    ratioB *= oldPane.splitRatio;
	  }
	  parent = parent.set('childIds', childIds);
	  state = state.set('allPanesIdsEver', state.allPanesIdsEver.add(newPane.id));
	  state = state.setIn(['panes', parent.id], parent);
	  state = state.setIn(['panes', newPane.id], newPane);
	  state = state.setIn(['panes', pane.id, 'splitRatio'], ratioA);
	  state = state.setIn(['panes', newPane.id, 'splitRatio'], ratioB);
	  state = state.set('cornerDown', undefined);
	  var newDividerId = beforePaneId + 'n' + afterPaneId;
	  state = (0, _secondPass2.default)(state);
	  var divider = _extends({}, state.dividers.get(newDividerId).toJS(), { startX: startX, startY: startY });
	  state = state.set('dividerDown', divider);
	  return state;
	}

	function removePane(state, id) {
	  //splice pane out of parents childIds
	  var pane = state.panes.get(id);
	  var parent = state.panes.get(pane.parentId);
	  if (!parent) return state;
	  var childIds = parent.childIds;
	  var index = childIds.indexOf(id);
	  var panes = state.panes;
	  childIds = childIds.splice(index, 1);
	  parent = parent.set('childIds', childIds);
	  panes = panes.set(parent.id, parent);
	  if (childIds.size === 1) {
	    var remainingPane = panes.get(childIds.get(0));
	    if (parent.id === state.rootId) {
	      state = state.set('rootId', remainingPane.id);
	      remainingPane = remainingPane.set('parentId', undefined);
	    } else {
	      var grandparentId = parent.parentId;
	      var grandparent = panes.get(grandparentId);
	      var grandchildIds = grandparent.childIds;
	      index = grandchildIds.indexOf(parent.id);
	      grandchildIds = grandchildIds.set(index, remainingPane.id);
	      grandparent = grandparent.set('childIds', grandchildIds);
	      remainingPane = remainingPane.set('parentId', grandparentId);
	      panes = panes.set(grandparent.id, grandparent);
	    }
	    panes = panes.delete(parent.id);
	    remainingPane = remainingPane.set('direction', undefined);
	    panes = panes.set(remainingPane.id, remainingPane);
	  }
	  panes = panes.delete(id);
	  state = state.set('panes', panes);
	  return state;
	}

	function join(state, _ref2) {
	  var retainId = _ref2.retainId;
	  var removeId = _ref2.removeId;

	  var remove = state.panes.get(removeId);
	  if (remove.isGroup) {
	    console.warn('cannot replace group');
	    return state;
	  }
	  var retain = state.panes.get(retainId);
	  var parent = state.panes.get(retain.parentId);
	  var siblings = parent.childIds;
	  var pos = [retainId, removeId].map(function (id) {
	    return siblings.indexOf(id);
	  });
	  if (pos[1] === -1 || pos[0] === -1 || !(pos[0] + 1 === pos[1] || pos[0] - 1 === pos[1])) {
	    console.warn('pane must be adjacent to join');
	    return state;
	  }
	  state = removePane(state, removeId);
	  var nextParentId = state.getIn(['panes', retainId]).parentId;
	  var splitRatio = parent.id === nextParentId ? remove.splitRatio + retain.splitRatio : parent.splitRatio;
	  state = state.setIn(['panes', retain.id, 'splitRatio'], splitRatio);
	  return state;
	}

	function setSplitRatio(state, action) {
	  var splitRatio = action.splitRatio;
	  var id = action.id;


	  state = state.setIn(['panes', id, 'splitRatio'], splitRatio);
	  return state;
	}

	function setSize(state, _ref3) {
	  var width = _ref3.width;
	  var height = _ref3.height;

	  return state.set('width', width).set('height', height);
	}

	function setCornerDown(state, action) {
	  return state.set('cornerDown', action.cornerDown);
	}

	function setCornerHover(state, action) {
	  return state.set('cornerHover', action.cornerHover);
	}

	function setDividerDown(state, action) {
	  return state.set('dividerDown', action.divider);
	}

	function setPaneProps(state, _ref4) {
	  var id = _ref4.id;
	  var props = _ref4.props;

	  return state.setIn(['panes', id, 'props'], props);
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = secondPass;

	var _constants = __webpack_require__(4);

	var _reducers = __webpack_require__(2);

	var _immutable = __webpack_require__(3);

	function getJoinDirection(_ref) {
	  var subdivide = _ref.subdivide;
	  var pane = _ref.pane;
	  var cornerDown = subdivide.cornerDown;

	  if (cornerDown === undefined) return false;
	  var cornerDownId = subdivide.cornerDown.id;
	  var cornerDownPane = subdivide.panes.get(cornerDownId);
	  var parent = subdivide.panes.get(cornerDownPane.parentId);
	  if (!parent) return false;
	  var siblings = parent.childIds;
	  var index = siblings.indexOf(cornerDownId);
	  var beforeId = index < 1 ? undefined : siblings.get(index - 1);
	  var afterId = siblings.get(index + 1);
	  var isBeforeGroup = beforeId !== undefined && subdivide.panes.get(beforeId).isGroup;
	  var isAfterGroup = afterId !== undefined && subdivide.panes.get(afterId).isGroup;
	  var canJoinBefore = beforeId === pane.id && !isBeforeGroup;
	  var canJoinAfter = afterId === pane.id && !isAfterGroup;

	  return cornerDown.corner === _constants.NE && (parent.direction === _constants.COL && canJoinBefore && _constants.JOIN_UP_ARROW || parent.direction === _constants.ROW && canJoinAfter && _constants.JOIN_RIGHT_ARROW) || cornerDown.corner === _constants.SW && (parent.direction === _constants.COL && canJoinAfter && _constants.JOIN_DOWN_ARROW || parent.direction === _constants.ROW && canJoinBefore && _constants.JOIN_LEFT_ARROW) || cornerDown.corner === _constants.NW && (parent.direction === _constants.COL && canJoinBefore && _constants.JOIN_UP_ARROW || parent.direction === _constants.ROW && canJoinBefore && _constants.JOIN_LEFT_ARROW) || cornerDown.corner === _constants.SE && (parent.direction === _constants.COL && canJoinAfter && _constants.JOIN_DOWN_ARROW || parent.direction === _constants.ROW && canJoinAfter && _constants.JOIN_RIGHT_ARROW);
	}

	function secondPass(state) {
	  var dividerMap = (0, _immutable.Map)();

	  var _state = state;
	  var rootId = _state.rootId;
	  var width = _state.width;
	  var height = _state.height;

	  var left = 0;
	  var top = 0;
	  var rootPane = state.panes.get(rootId);

	  var _state2 = state;
	  var cellSpacing = _state2.cellSpacing;
	  var cornerDown = _state2.cornerDown;


	  rootPane = rootPane.merge({
	    width: width,
	    height: height,
	    top: top,
	    left: left,
	    canSplit: cornerDown && cornerDown.id === rootId
	  });

	  state = state.mergeIn(['panes', rootId], rootPane);

	  var flattenChildren = function flattenChildren(parent) {
	    var x = parent.left;
	    var y = parent.top;
	    var spacingOffset = void 0;
	    var hasDivider = false;
	    var beforePaneId = void 0;
	    var divider = void 0;
	    var beforeRatio = void 0;

	    parent.childIds.forEach(function (childId, i) {
	      var child = state.panes.get(childId);
	      var canSplit = cornerDown && cornerDown.id === childId;
	      var joinDirection = getJoinDirection({ subdivide: state, pane: child });

	      child = child.merge({ canSplit: canSplit, joinDirection: joinDirection });

	      hasDivider = i !== 0;
	      spacingOffset = 0;
	      if (hasDivider) {
	        spacingOffset = cellSpacing;
	        divider = {
	          left: x,
	          top: y,
	          beforePaneId: beforePaneId,
	          afterPaneId: child.id,
	          beforeRatio: beforeRatio,
	          afterRatio: child.splitRatio,
	          direction: parent.direction,
	          parentSize: parent.direction === _constants.ROW ? parent.width : parent.height,
	          id: beforePaneId + 'n' + child.id
	        };
	      }

	      if (parent.direction === _constants.ROW) {
	        if (hasDivider) {
	          divider.width = cellSpacing;
	          divider.height = parent.height;
	          dividerMap = dividerMap.set(divider.id, new _reducers.Divider(divider));
	          // state = state.setIn(['dividers', divider.id],
	          //     new Divider(divider))
	          x += cellSpacing;
	        }
	        child = child.merge({
	          width: parent.width * child.splitRatio - spacingOffset,
	          height: parent.height,
	          left: x,
	          top: y
	        });
	        x += child.width;
	      } else if (parent.direction === _constants.COL) {
	        if (hasDivider) {
	          divider.width = parent.width;
	          divider.height = cellSpacing;
	          dividerMap = dividerMap.set(divider.id, new _reducers.Divider(divider));
	          // state = state.setIn(['dividers', divider.id],
	          //     new Divider(divider))
	          y += cellSpacing;
	        }
	        child = child.merge({
	          width: parent.width,
	          height: parent.height * child.splitRatio - spacingOffset,
	          left: x,
	          top: y
	        });
	        y += child.height;
	      }

	      beforePaneId = child.id;
	      beforeRatio = child.splitRatio;
	      state = state.mergeIn(['panes', childId], child);
	      if (child.isGroup) {
	        flattenChildren(child);
	      }
	    });
	  };
	  flattenChildren(rootPane);
	  state = state.set('dividers', dividerMap);
	  return state;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(9);

	var _reactRedux = __webpack_require__(10);

	var _reducers = __webpack_require__(2);

	var _reducers2 = _interopRequireDefault(_reducers);

	var _Layout = __webpack_require__(11);

	var _Layout2 = _interopRequireDefault(_Layout);

	var _SubdivideActionCreators = __webpack_require__(18);

	var SubdivideActionCreators = _interopRequireWildcard(_SubdivideActionCreators);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function configureStore(initialState) {
	  var store = (0, _redux.createStore)(_reducers2.default, initialState);
	  if (false) {
	    // Enable Webpack hot module replacement for reducers
	    module.hot.accept('../reducers', function () {
	      var nextRootReducer = require('../reducers');
	      store.replaceReducer(nextRootReducer);
	    });
	  }

	  return store;
	}

	var ConnectedLayout = (0, _reactRedux.connect)(function (state) {
	  return { subdivide: state };
	})(_Layout2.default);

	var Subdivide = function (_Component) {
	  _inherits(Subdivide, _Component);

	  function Subdivide(props) {
	    _classCallCheck(this, Subdivide);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Subdivide).call(this, props));

	    var dispatch = props.dispatch;

	    if (dispatch) {
	      _this.actions = (0, _redux.bindActionCreators)(SubdivideActionCreators, dispatch);
	    } else {
	      _this.store = configureStore();
	      _this.actions = (0, _redux.bindActionCreators)(SubdivideActionCreators, _this.store.dispatch);
	    }
	    return _this;
	  }

	  _createClass(Subdivide, [{
	    key: 'render',
	    value: function render() {
	      var store = this.store;
	      var actions = this.actions;

	      return store ? _react2.default.createElement(ConnectedLayout, _extends({}, this.props, { store: store, actions: actions })) : _react2.default.createElement(_Layout2.default, _extends({}, this.props, { actions: actions }));
	    }
	  }]);

	  return Subdivide;
	}(_react.Component);

	exports.default = Subdivide;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _Pane = __webpack_require__(12);

	var _Pane2 = _interopRequireDefault(_Pane);

	var _Dividers = __webpack_require__(15);

	var _Dividers2 = _interopRequireDefault(_Dividers);

	var _AnimationFrame = __webpack_require__(17);

	var _AnimationFrame2 = _interopRequireDefault(_AnimationFrame);

	var _constants = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Layout = (_temp = _class = function (_Component) {
	  _inherits(Layout, _Component);

	  function Layout(props, context) {
	    _classCallCheck(this, Layout);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Layout).call(this, props, context));

	    _this.animationFrame = new _AnimationFrame2.default();
	    var setSize = props.actions.setSize;


	    _this.onMouseMove = _this.animationFrame.throttle(function (_ref) {
	      var clientX = _ref.clientX;
	      var clientY = _ref.clientY;
	      var _this$props = _this.props;
	      var actions = _this$props.actions;
	      var subdivide = _this$props.subdivide;


	      if (subdivide.dividerDown) {
	        var divider = subdivide.dividerDown;
	        var beforePaneId = divider.beforePaneId;
	        var afterPaneId = divider.afterPaneId;
	        var direction = divider.direction;
	        var parentSize = divider.parentSize;
	        var startX = divider.startX;
	        var startY = divider.startY;


	        var delta = direction === _constants.ROW ? clientX - startX : clientY - startY;
	        var deltaRatio = delta / parentSize;
	        var afterRatio = divider.afterRatio - deltaRatio;
	        var beforeRatio = divider.beforeRatio + deltaRatio;
	        if (beforeRatio * parentSize > 20 && afterRatio * parentSize > 20) {
	          actions.setSplitRatio(beforePaneId, beforeRatio);
	          actions.setSplitRatio(afterPaneId, afterRatio);
	        }
	      }

	      if (subdivide.cornerDown) {
	        var pane = subdivide.cornerDown;
	        var split = actions.split;
	        var width = pane.width;
	        var height = pane.height;
	        var left = pane.left;
	        var top = pane.top;
	        var id = pane.id;
	        var corner = pane.corner;


	        if (clientX > left && clientX < left + width && clientY > top && clientY < top + height) {

	          if (corner === _constants.SW) {
	            if (clientX - left > 25) {
	              split(id, _constants.CHILD_LEFT, clientX, clientY);
	            } else if (top + height - clientY > 25) {
	              split(id, _constants.CHILD_BELOW, clientX, clientY);
	            }
	          }

	          if (corner === _constants.NE) {
	            if (left + width - clientX > 25) {
	              split(id, _constants.CHILD_RIGHT, clientX, clientY);
	            } else if (clientY - top > 25) {
	              split(id, _constants.CHILD_ABOVE, clientX, clientY);
	            }
	          }

	          if (corner === _constants.SE) {
	            if (left + width - clientX > 25) {
	              split(id, _constants.CHILD_RIGHT, clientX, clientY);
	            } else if (top + height - clientY > 25) {
	              split(id, _constants.CHILD_BELOW, clientX, clientY);
	            }
	          }

	          if (corner === _constants.NW) {
	            if (clientX - left > 25) {
	              split(id, _constants.CHILD_LEFT, clientX, clientY);
	            } else if (clientY - top > 25) {
	              split(id, _constants.CHILD_ABOVE, clientX, clientY);
	            }
	          }
	        }
	      }
	    });

	    _this.onMouseUp = function () {
	      var _this$props2 = _this.props;
	      var actions = _this$props2.actions;
	      var subdivide = _this$props2.subdivide;

	      if (subdivide.dividerDown) {
	        actions.setDividerDown(undefined);
	      }
	      // give pane onMouseUp a chance to fire
	      setTimeout(function () {
	        if (subdivide.cornerDown) {
	          actions.setCornerDown(undefined);
	        }
	      }, 10);
	    };

	    window.addEventListener('resize', function () {
	      setSize(window.innerWidth, window.innerHeight);
	    });

	    document.addEventListener('mouseup', _this.onMouseUp);
	    document.addEventListener('mousemove', _this.onMouseMove);

	    setSize(window.innerWidth, window.innerHeight);
	    return _this;
	  }

	  _createClass(Layout, [{
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.animationFrame.stop();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var subdivide = _props.subdivide;
	      var actions = _props.actions;
	      var DefaultComponent = _props.DefaultComponent;
	      var iframeSafe = _props.iframeSafe;

	      var panes = void 0;
	      if (iframeSafe) {
	        panes = subdivide.allPanesIdsEver.toList().toJS().map(function (id) {
	          var pane = subdivide.panes.get(id);
	          return _react2.default.createElement(_Pane2.default, {
	            subdivide: subdivide,
	            pane: pane,
	            actions: actions,
	            key: id,
	            DefaultComponent: DefaultComponent
	          });
	        });
	      } else {
	        panes = subdivide.panes.toList().filter(function (pane) {
	          return !pane.isGroup;
	        }).map(function (pane) {
	          return _react2.default.createElement(_Pane2.default, {
	            subdivide: subdivide,
	            pane: pane,
	            actions: actions,
	            key: pane.id,
	            DefaultComponent: DefaultComponent
	          });
	        });
	      }

	      return _react2.default.createElement(
	        'div',
	        null,
	        panes,
	        _react2.default.createElement(_Dividers2.default, { dividers: subdivide.dividers, subdivide: subdivide, actions: actions })
	      );
	    }
	  }]);

	  return Layout;
	}(_react.Component), _class.defaultProps = {
	  iframeSafe: true
	}, _temp);
	exports.default = Layout;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _Triangle = __webpack_require__(13);

	var _Triangle2 = _interopRequireDefault(_Triangle);

	var _CornerOverlay = __webpack_require__(14);

	var _CornerOverlay2 = _interopRequireDefault(_CornerOverlay);

	var _constants = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function getStyles(_ref) {
	  var width = _ref.width;
	  var height = _ref.height;
	  var top = _ref.top;
	  var left = _ref.left;

	  var pane = {
	    position: 'absolute',
	    width: width + 'px',
	    height: height + 'px',
	    top: top + 'px',
	    left: left + 'px',
	    overflow: 'hidden'
	  };

	  return { pane: pane };
	}

	var Pane = function (_Component) {
	  _inherits(Pane, _Component);

	  function Pane(props, context) {
	    _classCallCheck(this, Pane);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Pane).call(this, props, context));

	    _this.onMouseUp = function () {
	      //Note this on mouse up happens after subdivide on mouse up
	      var _this$props = _this.props;
	      var actions = _this$props.actions;
	      var subdivide = _this$props.subdivide;
	      var pane = _this$props.pane;
	      var join = actions.join;

	      if (!subdivide.cornerDown) return;
	      var cornerDownId = subdivide.cornerDown.id;
	      if (pane.joinDirection) {
	        join(cornerDownId, pane.id);
	        actions.setCornerDown(undefined);
	      }
	    };
	    return _this;
	  }

	  _createClass(Pane, [{
	    key: 'render',
	    value: function render() {

	      if (this.props.pane === undefined) {
	        return _react2.default.createElement('div', { style: { visibility: 'hidden' } });
	      }

	      if (this.props.pane.isGroup) {
	        return null;
	      }

	      var _props = this.props;
	      var pane = _props.pane;
	      var subdivide = _props.subdivide;
	      var actions = _props.actions;
	      var DefaultComponent = _props.DefaultComponent;

	      var styles = getStyles(pane);

	      return _react2.default.createElement(
	        'div',
	        { style: styles.pane, onMouseMove: this.onMouseMove, onMouseUp: this.onMouseUp },
	        _react2.default.createElement(DefaultComponent, {
	          subdividePane: pane,
	          subdivideActions: actions,
	          subdivide: subdivide }),
	        _react2.default.createElement(_CornerOverlay2.default, { pane: pane, subdivide: subdivide }),
	        _react2.default.createElement(_Triangle2.default, {
	          corner: _constants.SW,
	          color: '#dadadf',
	          size: 42,
	          subdivide: subdivide,
	          pane: pane,
	          actions: actions
	        }),
	        _react2.default.createElement(_Triangle2.default, {
	          corner: _constants.NE,
	          color: '#dadadf',
	          size: 42,
	          subdivide: subdivide,
	          pane: pane,
	          actions: actions
	        }),
	        _react2.default.createElement(_Triangle2.default, {
	          corner: _constants.NW,
	          color: '#dadadf',
	          size: 42,
	          subdivide: subdivide,
	          pane: pane,
	          actions: actions
	        }),
	        _react2.default.createElement(_Triangle2.default, {
	          corner: _constants.SE,
	          color: '#dadadf',
	          size: 42,
	          subdivide: subdivide,
	          pane: pane,
	          actions: actions
	        })
	      );
	    }
	  }]);

	  return Pane;
	}(_react.Component);

	exports.default = Pane;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _constants = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Triangle = function (_Component) {
	  _inherits(Triangle, _Component);

	  function Triangle() {
	    _classCallCheck(this, Triangle);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Triangle).apply(this, arguments));
	  }

	  _createClass(Triangle, [{
	    key: 'onMouseDown',
	    value: function onMouseDown() {
	      var _props = this.props;
	      var actions = _props.actions;
	      var corner = _props.corner;
	      var pane = _props.pane;

	      actions.setCornerDown(_extends({}, pane.toJS(), { corner: corner }));
	    }
	  }, {
	    key: 'onMouseEnter',
	    value: function onMouseEnter() {
	      var _props2 = this.props;
	      var actions = _props2.actions;
	      var corner = _props2.corner;
	      var pane = _props2.pane;

	      actions.setCornerHover({
	        paneId: pane.id,
	        corner: corner
	      });
	    }
	  }, {
	    key: 'onMouseLeave',
	    value: function onMouseLeave() {
	      var actions = this.props.actions;

	      actions.setCornerHover(undefined);
	    }
	  }, {
	    key: 'getStyles',
	    value: function getStyles() {
	      var _props3 = this.props;
	      var corner = _props3.corner;
	      var color = _props3.color;
	      var size = _props3.size;
	      var subdivide = _props3.subdivide;
	      var pane = _props3.pane;
	      var cornerHover = subdivide.cornerHover;

	      var offset = (size + 3) / 2;
	      var outer = {
	        width: size,
	        height: size,
	        position: 'absolute',
	        backgroundColor: 'rgba(0,0,0,0)',
	        opacity: 1,
	        display: subdivide.dividerDown ? 'none' : 'block'
	      };

	      if (corner === _constants.NE) {
	        outer = _extends({}, outer, {
	          top: 0,
	          right: 0,
	          cursor: 'grab',
	          transform: 'translate3d(' + offset + 'px,' + -offset + 'px, 0) rotate(225deg)'
	        });
	      } else if (corner === _constants.SW) {
	        outer = _extends({}, outer, {
	          bottom: 0,
	          left: 0,
	          cursor: 'grab',
	          transform: 'translate3d(' + -offset + 'px,' + offset + 'px, 0) rotate(45deg)'
	        });
	      } else if (corner === _constants.SE) {
	        outer = _extends({}, outer, {
	          bottom: 0,
	          right: 0,
	          cursor: 'grab',
	          transform: 'translate3d(' + offset + 'px,' + offset + 'px, 0) rotate(315deg)'
	        });
	      } else if (corner === _constants.NW) {
	        outer = _extends({}, outer, {
	          top: 0,
	          left: 0,
	          cursor: 'grab',
	          transform: 'translate3d(' + -offset + 'px,' + -offset + 'px, 0) rotate(135deg)'
	        });
	      }

	      var hover = cornerHover && cornerHover.paneId === pane.id && cornerHover.corner === corner ? 0 : offset;

	      var inner = {
	        border: '1px solid #c0c0d0',
	        backgroundColor: color,
	        width: '100%',
	        height: '100%',
	        transform: 'translate3d(0,' + hover + 'px,0)',
	        transition: 'transform .1s'
	      };

	      return { outer: outer, inner: inner };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var styles = this.getStyles();
	      return _react2.default.createElement(
	        'div',
	        {
	          key: 'outer',
	          style: styles.outer,
	          onMouseDown: function onMouseDown() {
	            return _this2.onMouseDown();
	          },
	          onMouseEnter: function onMouseEnter() {
	            return _this2.onMouseEnter();
	          },
	          onMouseLeave: function onMouseLeave() {
	            return _this2.onMouseLeave();
	          }
	        },
	        _react2.default.createElement('div', { style: styles.inner })
	      );
	    }
	  }]);

	  return Triangle;
	}(_react.Component);

	exports.default = Triangle;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _constants = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CornerOverlay = function (_Component) {
	  _inherits(CornerOverlay, _Component);

	  function CornerOverlay() {
	    _classCallCheck(this, CornerOverlay);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(CornerOverlay).apply(this, arguments));
	  }

	  _createClass(CornerOverlay, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.updateJoinOverlay();
	      this.updateDivideOverlay();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {}
	  }, {
	    key: 'updateDivideOverlay',
	    value: function updateDivideOverlay() {
	      var _props = this.props;
	      var pane = _props.pane;
	      var subdivide = _props.subdivide;

	      if (!pane.canSplit || !subdivide.cornerDown) return;
	      var corner = subdivide.cornerDown.corner;


	      var canvas = this.refs.canvas;
	      var ctx = canvas.getContext('2d');
	      var width = pane.width;
	      var height = pane.height;
	      var top = pane.top;
	      var left = pane.left;

	      height = Math.round(height + top - (top | 0));
	      width = Math.round(width + left - (left | 0));
	      var dashRatio = 0.5;
	      var dashWidth = 3;
	      var dashSpacing = 20;
	      var dashLength = dashRatio * dashSpacing;
	      var offset = 34;
	      ctx.clearRect(0, 0, width, height);
	      ctx.beginPath();
	      ctx.rect(0, 0, width, height);
	      if (corner === _constants.SW) {
	        for (var x = 0; x < width; x += dashSpacing) {
	          ctx.rect(x, height - offset - dashWidth, dashLength, dashWidth);
	        }

	        for (var y = 0; y < height; y += dashSpacing) {
	          ctx.rect(offset, height - y - dashLength, dashWidth, dashLength);
	        }
	      } else if (corner === _constants.NE) {
	        for (var _x = 0; _x < width; _x += dashSpacing) {
	          ctx.rect(width - _x - dashLength, offset, dashLength, dashWidth);
	        }

	        for (var _y = 0; _y < height; _y += dashSpacing) {
	          ctx.rect(width - offset - dashWidth, _y, dashWidth, dashLength);
	        }
	      } else if (corner === _constants.NW) {
	        for (var _x2 = 0; _x2 < width; _x2 += dashSpacing) {
	          ctx.rect(_x2, offset, dashLength, dashWidth);
	        }

	        for (var _y2 = 0; _y2 < height; _y2 += dashSpacing) {
	          ctx.rect(offset, _y2, dashWidth, dashLength);
	        }
	      } else if (corner === _constants.SE) {
	        for (var _x3 = 0; _x3 < width; _x3 += dashSpacing) {
	          ctx.rect(width - _x3 - dashLength, height - offset - dashWidth, dashLength, dashWidth);
	        }

	        for (var _y3 = 0; _y3 < height; _y3 += dashSpacing) {
	          ctx.rect(width - offset - dashWidth, height - _y3 - dashLength, dashWidth, dashLength);
	        }
	      }

	      ctx.fillStyle = '#999';
	      ctx.closePath();
	      ctx.fill('evenodd');
	    }
	  }, {
	    key: 'updateJoinOverlay',
	    value: function updateJoinOverlay() {
	      var pane = this.props.pane;

	      if (!pane.joinDirection) return;
	      var canvas = this.refs.canvas;
	      var ctx = canvas.getContext('2d');
	      var width = pane.width;
	      var height = pane.height;
	      var top = pane.top;
	      var left = pane.left;
	      var joinDirection = pane.joinDirection;

	      height = Math.round(height + top - (top | 0));
	      width = Math.round(width + left - (left | 0));
	      var size = Math.min(width, height);
	      var bodyHeight = size / 3 / 2 | 0;
	      var bodyWidth = size / 3 / 2 | 0;
	      var w2 = width / 2 | 0;
	      var h2 = height / 2 | 0;
	      ctx.clearRect(0, 0, width, height);
	      ctx.beginPath();
	      ctx.moveTo(0, 0);

	      if (joinDirection === _constants.JOIN_RIGHT_ARROW) {
	        ctx.lineTo(width, 0);
	        ctx.lineTo(width, height);
	        ctx.lineTo(0, height);
	        ctx.lineTo(0, h2 + bodyHeight);
	        ctx.lineTo(bodyWidth, h2 + bodyHeight);
	        ctx.lineTo(bodyWidth, h2 + bodyHeight * 2);
	        ctx.lineTo(size / 2, h2);
	        ctx.lineTo(bodyWidth, h2 - bodyHeight * 2);
	        ctx.lineTo(bodyWidth, h2 - bodyHeight);
	        ctx.lineTo(0, h2 - bodyHeight);
	      }

	      if (joinDirection === _constants.JOIN_LEFT_ARROW) {
	        ctx.lineTo(width, 0);
	        ctx.lineTo(width, height);
	        ctx.lineTo(width, h2 - bodyHeight);
	        ctx.lineTo(width - bodyWidth, h2 - bodyHeight);
	        ctx.lineTo(width - bodyWidth, h2 - bodyHeight * 2);
	        ctx.lineTo(width - size / 2, h2);
	        ctx.lineTo(width - bodyWidth, h2 + bodyHeight * 2);
	        ctx.lineTo(width - bodyWidth, h2 + bodyHeight);
	        ctx.lineTo(width, h2 + bodyHeight);
	        ctx.lineTo(width, height);
	        ctx.lineTo(0, height);
	      }

	      if (joinDirection === _constants.JOIN_UP_ARROW) {
	        ctx.lineTo(0, height);
	        ctx.lineTo(width, height);
	        ctx.lineTo(w2 - bodyWidth, height);
	        ctx.lineTo(w2 - bodyWidth, height - bodyHeight);
	        ctx.lineTo(w2 - bodyWidth * 2, height - bodyHeight);
	        ctx.lineTo(w2, height - size / 2);
	        ctx.lineTo(w2 + bodyWidth * 2, height - bodyHeight);
	        ctx.lineTo(w2 + bodyWidth, height - bodyHeight);
	        ctx.lineTo(w2 + bodyWidth, height);
	        ctx.lineTo(width, height);
	        ctx.lineTo(width, 0);
	      }

	      if (joinDirection === _constants.JOIN_DOWN_ARROW) {
	        ctx.lineTo(0, height);
	        ctx.lineTo(width, height);
	        ctx.lineTo(width, 0);
	        ctx.lineTo(w2 + bodyWidth, 0);
	        ctx.lineTo(w2 + bodyWidth, bodyHeight);
	        ctx.lineTo(w2 + bodyWidth * 2, bodyHeight);
	        ctx.lineTo(w2, size / 2);
	        ctx.lineTo(w2 - bodyWidth * 2, bodyHeight);
	        ctx.lineTo(w2 - bodyWidth, bodyHeight);
	        ctx.lineTo(w2 - bodyWidth, 0);
	      }

	      //    ctx.lineWidth = 2
	      ctx.fillStyle = '#999';
	      ctx.closePath();
	      //ctx.stroke()

	      ctx.fill();
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return this.props.width === nextProps.width && this.props.height === nextProps.height;
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.updateJoinOverlay();
	      this.updateDivideOverlay();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var subdivide = this.props.subdivide;
	      var _props$pane = this.props.pane;
	      var joinDirection = _props$pane.joinDirection;
	      var canSplit = _props$pane.canSplit;

	      if (!(subdivide.cornerDown || subdivide.dividerDown)) return false;

	      if (!(joinDirection || canSplit)) {
	        var dividerDown = subdivide.dividerDown;

	        var cursor = !dividerDown ? undefined : dividerDown.direction === _constants.ROW ? 'col-resize' : 'row-resize';
	        return _react2.default.createElement('div', { style: {
	            width: '100%',
	            height: '100%',
	            position: 'absolute',
	            cursor: cursor,
	            top: 0
	          } });
	      }

	      var _props$pane2 = this.props.pane;
	      var width = _props$pane2.width;
	      var height = _props$pane2.height;
	      var top = _props$pane2.top;
	      var left = _props$pane2.left;

	      height = Math.round(height + top - (top | 0));
	      width = Math.round(width + left - (left | 0));
	      return _react2.default.createElement('canvas', {
	        width: width,
	        height: height,
	        style: {
	          top: 0,
	          left: 0,
	          position: 'absolute',
	          background: '#fff',
	          opacity: 0.9
	        },
	        ref: 'canvas' });
	    }
	  }]);

	  return CornerOverlay;
	}(_react.Component);

	exports.default = CornerOverlay;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _constants = __webpack_require__(4);

	var _DividerTouch = __webpack_require__(16);

	var _DividerTouch2 = _interopRequireDefault(_DividerTouch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Rect = function Rect(props) {
	  var style = props.style;
	  var _props$style = props.style;
	  var left = _props$style.left;
	  var top = _props$style.top;

	  style = _extends({}, style, {
	    transform: 'translate3d(' + left + 'px,' + top + 'px,0)',
	    position: 'absolute',
	    top: 0,
	    left: 0
	  });
	  return _react2.default.createElement('div', _extends({}, props, { style: style }));
	};

	var Dividers = function Dividers(props) {
	  var dividers = props.dividers;
	  var subdivide = props.subdivide;
	  var actions = props.actions;
	  var borderSize = subdivide.borderSize;
	  //let touch = dividers.map(touch).toSeq()

	  var toBorder = function toBorder(divider) {
	    var width = divider.width;
	    var height = divider.height;
	    var top = divider.top;
	    var left = divider.left;
	    var id = divider.id;

	    var style = {
	      width: width,
	      height: height,
	      top: top,
	      left: left,
	      backgroundColor: '#c0c0d0'
	    };

	    return _react2.default.createElement(Rect, { style: style, key: id });
	  };

	  var toInner = function toInner(divider) {
	    var width = divider.width;
	    var height = divider.height;
	    var top = divider.top;
	    var left = divider.left;
	    var id = divider.id;
	    var direction = divider.direction;

	    var style = void 0;
	    if (direction === _constants.COL) {
	      style = {
	        width: width + borderSize * 2,
	        height: height - borderSize * 2,
	        top: top + borderSize,
	        left: left - borderSize,
	        backgroundColor: '#e0e0f0'
	      };
	    } else {
	      style = {
	        width: width - borderSize * 2,
	        height: height + borderSize * 2,
	        top: top - borderSize,
	        left: left + borderSize,
	        backgroundColor: '#e0e0f0'
	      };
	    }

	    if (style.left < 0) {
	      style.width = style.width + style.left;
	      style.left = 0;
	    }
	    style.width = Math.min(style.width, subdivide.width - style.left);
	    if (style.top < 0) {
	      style.height = style.height + style.top;
	      style.top = 0;
	    }
	    style.height = Math.min(style.height, subdivide.height - style.top);

	    return _react2.default.createElement(Rect, { style: style, key: id });
	  };

	  var toTouch = function toTouch(divider) {
	    return _react2.default.createElement(_DividerTouch2.default, {
	      divider: divider,
	      subdivide: subdivide,
	      actions: actions,
	      key: divider.id
	    });
	  };

	  return _react2.default.createElement(
	    'div',
	    null,
	    dividers.toList().map(toBorder),
	    dividers.toList().map(toInner),
	    dividers.toList().map(toTouch)
	  );
	};

	exports.default = Dividers;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _constants = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Divider = function (_Component) {
	  _inherits(Divider, _Component);

	  function Divider(props, context) {
	    _classCallCheck(this, Divider);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Divider).call(this, props, context));

	    _this.removeListeners = function () {
	      document.removeEventListener('mouseup', _this.onMouseUp);
	    };

	    _this.onMouseUp = function () {
	      var actions = _this.props.actions;

	      actions.setDividerDown(undefined);
	      _this.removeListeners();
	    };

	    _this.onMouseDown = function (_ref) {
	      var clientX = _ref.clientX;
	      var clientY = _ref.clientY;
	      var _this$props = _this.props;
	      var actions = _this$props.actions;
	      var divider = _this$props.divider;


	      actions.setDividerDown(_extends({}, divider.toJS(), { startX: clientX, startY: clientY }));

	      document.addEventListener('mouseup', _this.onMouseUp);
	    };
	    return _this;
	  }

	  _createClass(Divider, [{
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.removeListeners();
	    }
	  }, {
	    key: 'dividerStyle',
	    value: function dividerStyle() {
	      var _props$divider = this.props.divider;
	      var width = _props$divider.width;
	      var height = _props$divider.height;
	      var top = _props$divider.top;
	      var left = _props$divider.left;
	      var direction = _props$divider.direction;
	      var touchMargin = this.props.subdivide.touchMargin;

	      var touch = {
	        width: width,
	        height: height,
	        top: top,
	        left: left,
	        //     backgroundColor: 'rgba(0,0,0,0.5)',
	        position: 'absolute'
	      };

	      if (direction === _constants.COL) {
	        touch.cursor = 'row-resize';
	        touch.top -= touchMargin;
	        touch.height += touchMargin * 2;
	      } else {
	        touch.cursor = 'col-resize';
	        touch.left -= touchMargin;
	        touch.width += touchMargin * 2;
	      }

	      return { touch: touch };
	    }
	  }, {
	    key: 'render',
	    value: function render() {

	      var styles = this.dividerStyle();

	      return _react2.default.createElement(
	        'div',
	        {
	          style: styles.touch,
	          onMouseDown: this.onMouseDown,
	          className: 'divider' },
	        _react2.default.createElement(
	          'div',
	          { style: styles.border },
	          _react2.default.createElement('div', { style: styles.inner })
	        )
	      );
	    }
	  }]);

	  return Divider;
	}(_react.Component);

	exports.default = Divider;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var reqAnimFrame = requestAnimationFrame || function (fn) {
	  return setTimeout(fn, 1000 / 60);
	};

	var AnimationFrame = function AnimationFrame() {
	  var _this = this;

	  _classCallCheck(this, AnimationFrame);

	  this.counter = 0;

	  this.incCounter = function () {
	    _this.counter += 1;
	    _this.id = reqAnimFrame(_this.incCounter);
	  };

	  this.stop = function () {
	    if (requestAnimationFrame) {
	      cancelAnimationFrame(_this.id);
	    } else {
	      clearTimeout(_this.id);
	    }
	  };

	  this.throttle = function (fn) {
	    var lastCall = _this.counter;
	    return function (e) {
	      if (_this.counter !== lastCall) {
	        fn(e);
	        lastCall = _this.counter;
	      }
	    };
	  };

	  this.incCounter();
	};

	exports.default = AnimationFrame;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setState = setState;
	exports.setPaneProps = setPaneProps;
	exports.setSplitRatio = setSplitRatio;
	exports.split = split;
	exports.join = join;
	exports.setSize = setSize;
	exports.setBlock = setBlock;
	exports.setCornerHover = setCornerHover;
	exports.setCornerDown = setCornerDown;
	exports.setDividerDown = setDividerDown;

	var _constants = __webpack_require__(4);

	function setState(state) {
	  return {
	    type: _constants.SET_STATE,
	    state: state
	  };
	}

	function setPaneProps(id, props) {
	  return {
	    type: _constants.SET_PANE_PROPS,
	    id: id,
	    props: props
	  };
	}

	function setSplitRatio(id, splitRatio) {
	  return {
	    type: _constants.SET_SPLIT_RATIO,
	    splitRatio: splitRatio,
	    id: id
	  };
	}

	function split(id, splitType, startX, startY) {
	  return {
	    type: _constants.SPLIT,
	    id: id,
	    splitType: splitType,
	    startX: startX,
	    startY: startY
	  };
	}

	function join(retainId, removeId) {
	  return {
	    type: _constants.JOIN,
	    retainId: retainId,
	    removeId: removeId
	  };
	}

	function setSize(width, height) {
	  return {
	    type: _constants.SET_SIZE,
	    width: width,
	    height: height
	  };
	}

	function setBlock(displayBlock) {
	  return {
	    type: _constants.SET_BLOCK,
	    displayBlock: displayBlock
	  };
	}

	function setCornerHover(cornerHover) {
	  return {
	    type: _constants.SET_CORNER_HOVER,
	    cornerHover: cornerHover
	  };
	}

	function setCornerDown(cornerDown) {
	  return {
	    type: _constants.SET_CORNER_DOWN,
	    cornerDown: cornerDown
	  };
	}

	function setDividerDown(divider) {
	  return {
	    type: _constants.SET_DIVIDER_DOWN,
	    divider: divider
	  };
	}

/***/ }
/******/ ])
});
;