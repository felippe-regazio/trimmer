"use strict";var _createClass=function(){function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var FFMPEGClient=function(){function t(e){if(_classCallCheck(this,t),this.QUEUE=[],this.BUSY=!1,this.READY=!1,this.OPTIONS=e,this.WORKER=void 0,this.MINWIDTH=e.minWidth,this.SUPPORTED=this._supported(),window.__FFMPEGCLIENT)return window.__FFMPEGCLIENT;this._init()}return _createClass(t,[{key:"_init",value:function(){this.SUPPORTED?((window.__FFMPEGCLIENT=this)._registerCallbacks(this.OPTIONS.on),this._registerWorker(this.OPTIONS.worker)):this.OPTIONS.on.notSupported(this._notSupportedWarn())}},{key:"_supported",value:function(){var e=window&&!!window.Worker,t=!this.MINWIDTH||window.innerWidth>=this.MINWIDTH;return e&&t}},{key:"_notSupportedWarn",value:function(){return{notSupported:!0,message:"Your environment doesn't supports ffmpeg-worker-client or you're not in a Browser."}}},{key:"_registerCallbacks",value:function(t){function r(){}["loading","ready","done","busy","error","message","notSupported"].forEach(function(e){t[e]||(t[e]=r)})}},{key:"_registerWorker",value:function(e){this.WORKER=new Worker(e),this._listenWorker(!1)}},{key:"_listenWorker",value:function(n){var s=this;this.WORKER.onmessage=function(e){var t=e.data.type,r=e.data;s.OPTIONS.on.message(r),s.OPTIONS.on[t](r),n&&n[t]&&n[t](r),s._onWorkerMessage(e)}}},{key:"_onWorkerMessage",value:function(e){switch(e.data.type){case"ready":this.READY=!0,this._processQueue();break;case"busy":this.BUSY=!0;break;case"done":case"error":this.BUSY=!1,this._processQueue()}}},{key:"_processQueue",value:function(){var e;this.QUEUE.length&&(e=this.QUEUE.shift(),this.ffmpeg(e))}},{key:"ffmpeg",value:function(e){return this.SUPPORTED?this.READY&&!this.BUSY?(this.WORKER.postMessage({files:e.files,args:e.args}),this._listenWorker(e.on)):void this.QUEUE.push(e):(e.on.error&&e.on.error(this._notSupportedWarn()),!1)}},{key:"run",value:function(e){return this.ffmpeg(e)}},{key:"isBusy",value:function(){return this.BUSY}},{key:"isReady",value:function(){return this.READY}},{key:"supported",value:function(){return this.SUPPORTED}}]),t}();