
(function () {
var scripts = [{"deps":{"./assets/frame/scripts/Data/FrameSyncData":1,"./assets/game/scripts/Manager/EditorManager":2,"./assets/game/scripts/SkeletonExt":3,"./assets/frame/scripts/Data/FrameMsgType":4,"./assets/game/scripts/Data/ConstValue":11,"./assets/frame/scripts/Utils/HitTest":12,"./assets/frame/scripts/SDK/GameMsg":14,"./assets/frame/scripts/Manager/ListenerManager":15,"./assets/frame/scripts/UI/BindNode":21,"./assets/frame/scripts/UI/AdaptiveScreen":30,"./assets/frame/scripts/UI/Item/Tip":34,"./assets/frame/scripts/Utils/Tools":35,"./assets/frame/scripts/Utils/MathUtils":39,"./assets/frame/scripts/Utils/BoundingBoxHelp":40,"./assets/game/scripts/Manager/GameManager":42,"./assets/game/scripts/Data/CustomSyncData":43,"./assets/frame/scripts/Data/FrameConstValue":46,"./assets/game/scripts/Data/EventType":47,"./assets/game/scripts/UI/Item/SoundConfig":49,"./assets/frame/scripts/SDK/T2M":7,"./assets/frame/scripts/Manager/SoundManager":8,"./assets/frame/scripts/UI/Panel/BaseTeacherPanel":5,"./assets/frame/scripts/Http/NetWork":10,"./assets/game/scripts/UI/panel/GamePanel":6,"./assets/frame/scripts/Manager/UIManager":17,"./assets/frame/scripts/UI/BaseFrameUI":18,"./assets/frame/scripts/Manager/SyncDataManager":19,"./assets/frame/scripts/UI/GameMain":20,"./assets/frame/scripts/UI/Item/MaskGlobal":9,"./assets/frame/scripts/Manager/ReportManager":25,"./assets/frame/scripts/UI/BaseUI":31,"./assets/frame/scripts/Utils/BoundingBoxDemo":38,"./assets/frame/scripts/Utils/UIHelp":41,"./assets/frame/scripts/Utils/AudioPlayExtension":45,"./assets/game/scripts/UI/Components/ButtonSync":13,"./assets/game/scripts/UI/Item/GameUI":16,"./assets/frame/scripts/UI/Item/replayBtn":22,"./assets/frame/scripts/UI/Item/MaskRecover":23,"./assets/frame/scripts/UI/Item/TitleNode":28,"./assets/frame/scripts/UI/Panel/TipUI":27,"./assets/frame/scripts/UI/Panel/AffirmTips":24,"./assets/frame/scripts/UI/Panel/UploadAndReturnPanel":26,"./assets/frame/scripts/UI/Panel/LoadingUI":29,"./assets/frame/scripts/UI/Panel/StarCount":32,"./assets/frame/scripts/UI/Panel/ErrorPanel":33,"./assets/frame/scripts/UI/Item/TeacherPanelLoading":36,"./assets/frame/scripts/UI/Panel/SubmissionPanel":37,"./assets/frame/scripts/UI/Panel/BaseGamePanel":44,"./assets/game/scripts/UI/panel/TeacherPanel":48,"./assets/frame/scripts/UI/Panel/OverTips":50},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameSyncData.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Manager/EditorManager.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/SkeletonExt.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameMsgType.js"},{"deps":{"../../../../game/scripts/Manager/EditorManager":2,"../../Http/NetWork":10,"../BaseUI":31,"../../../../game/scripts/Data/ConstValue":11,"../../Utils/UIHelp":41},"path":"preview-scripts/assets/frame/scripts/UI/Panel/BaseTeacherPanel.js"},{"deps":{"../../../../frame/scripts/Manager/ListenerManager":15,"../../../../frame/scripts/UI/Panel/BaseGamePanel":44,"../../../../frame/scripts/Manager/SyncDataManager":19,"../../Data/EventType":47},"path":"preview-scripts/assets/game/scripts/UI/panel/GamePanel.js"},{"deps":{"../Http/NetWork":10,"../Manager/ListenerManager":15,"../Data/FrameMsgType":4,"../Utils/UIHelp":41,"./GameMsg":14,"../Manager/SyncDataManager":19},"path":"preview-scripts/assets/frame/scripts/SDK/T2M.js"},{"deps":{"../Data/FrameConstValue":46,"../Http/NetWork":10,"../Data/FrameMsgType":4,"./ListenerManager":15,"../SDK/GameMsg":14,"./UIManager":17},"path":"preview-scripts/assets/frame/scripts/Manager/SoundManager.js"},{"deps":{"../../Data/FrameMsgType":4,"../BindNode":21,"../../Manager/ListenerManager":15,"../../Manager/UIManager":17,"../../Utils/UIHelp":41},"path":"preview-scripts/assets/frame/scripts/UI/Item/MaskGlobal.js"},{"deps":{"../../../game/scripts/Data/ConstValue":11,"../Manager/UIManager":17,"../SDK/GameMsg":14,"../Utils/UIHelp":41},"path":"preview-scripts/assets/frame/scripts/Http/NetWork.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/ConstValue.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/HitTest.js"},{"deps":{"../../../../frame/scripts/SDK/T2M":7},"path":"preview-scripts/assets/game/scripts/UI/Components/ButtonSync.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/SDK/GameMsg.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Manager/ListenerManager.js"},{"deps":{"../../../../frame/scripts/Utils/Tools":35,"../../../../frame/scripts/Manager/ListenerManager":15,"../../../../frame/scripts/Manager/SyncDataManager":19,"../../../../frame/scripts/Utils/UIHelp":41,"../../../../frame/scripts/Manager/SoundManager":8,"../../Data/EventType":47,"./SoundConfig":49},"path":"preview-scripts/assets/game/scripts/UI/Item/GameUI.js"},{"deps":{"../UI/BaseUI":31},"path":"preview-scripts/assets/frame/scripts/Manager/UIManager.js"},{"deps":{"./BaseUI":31,"../Data/FrameConstValue":46},"path":"preview-scripts/assets/frame/scripts/UI/BaseFrameUI.js"},{"deps":{"../../../game/scripts/Data/CustomSyncData":43,"../../../frame/scripts/Data/FrameSyncData":1,"../../../frame/scripts/Manager/ReportManager":25},"path":"preview-scripts/assets/frame/scripts/Manager/SyncDataManager.js"},{"deps":{"../Data/FrameMsgType":4,"../../../game/scripts/Manager/EditorManager":2,"../Http/NetWork":10,"../Manager/UIManager":17,"../Manager/ListenerManager":15,"../Manager/SoundManager":8,"../SDK/GameMsg":14,"../SDK/T2M":7,"../Manager/ReportManager":25,"../Manager/SyncDataManager":19,"../Utils/UIHelp":41},"path":"preview-scripts/assets/frame/scripts/UI/GameMain.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/BindNode.js"},{"deps":{"../../Data/FrameMsgType":4,"../../SDK/T2M":7},"path":"preview-scripts/assets/frame/scripts/UI/Item/replayBtn.js"},{"deps":{"../../Manager/UIManager":17,"../../Data/FrameMsgType":4,"../BindNode":21,"../../Manager/ListenerManager":15},"path":"preview-scripts/assets/frame/scripts/UI/Item/MaskRecover.js"},{"deps":{"../../Data/FrameMsgType":4,"../../SDK/T2M":7,"../../Utils/UIHelp":41,"../BaseFrameUI":18},"path":"preview-scripts/assets/frame/scripts/UI/Panel/AffirmTips.js"},{"deps":{"../../../game/scripts/Manager/EditorManager":2,"../SDK/GameMsg":14,"../../../game/scripts/Data/ConstValue":11},"path":"preview-scripts/assets/frame/scripts/Manager/ReportManager.js"},{"deps":{"./../../Manager/ListenerManager":15,"../../Data/FrameMsgType":4,"../../SDK/T2M":7,"../../Manager/ReportManager":25,"../../Manager/SoundManager":8,"../../Utils/UIHelp":41,"../../../../game/scripts/Manager/EditorManager":2,"../BaseFrameUI":18},"path":"preview-scripts/assets/frame/scripts/UI/Panel/UploadAndReturnPanel.js"},{"deps":{"../Item/Tip":34,"../BaseFrameUI":18},"path":"preview-scripts/assets/frame/scripts/UI/Panel/TipUI.js"},{"deps":{"../../Data/FrameMsgType":4,"../../Manager/ListenerManager":15},"path":"preview-scripts/assets/frame/scripts/UI/Item/TitleNode.js"},{"deps":{"../../../../game/scripts/UI/panel/GamePanel":6,"../../Manager/SoundManager":8,"../../Manager/UIManager":17,"../../../../game/scripts/UI/panel/TeacherPanel":48,"../../SDK/GameMsg":14,"../../Http/NetWork":10,"../BaseFrameUI":18,"../../../../game/scripts/Data/ConstValue":11},"path":"preview-scripts/assets/frame/scripts/UI/Panel/LoadingUI.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/AdaptiveScreen.js"},{"deps":{"../Manager/ListenerManager":15,"./BindNode":21,"../Data/FrameConstValue":46},"path":"preview-scripts/assets/frame/scripts/UI/BaseUI.js"},{"deps":{"../../Utils/Tools":35,"./../../Manager/SoundManager":8,"../../../../game/scripts/Data/ConstValue":11,"../../../../game/scripts/Manager/EditorManager":2,"../BaseFrameUI":18,"../../Utils/UIHelp":41,"../../Manager/ReportManager":25},"path":"preview-scripts/assets/frame/scripts/UI/Panel/StarCount.js"},{"deps":{"./../BaseFrameUI":18,"./../../Manager/SoundManager":8,"./../../SDK/GameMsg":14,"../../Utils/UIHelp":41},"path":"preview-scripts/assets/frame/scripts/UI/Panel/ErrorPanel.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/Item/Tip.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/Tools.js"},{"deps":{"../../Manager/ListenerManager":15,"../../Data/FrameMsgType":4,"../BindNode":21},"path":"preview-scripts/assets/frame/scripts/UI/Item/TeacherPanelLoading.js"},{"deps":{"../../Utils/UIHelp":41,"../BaseFrameUI":18,"../../Http/NetWork":10,"../../../../game/scripts/Data/ConstValue":11,"../../../../game/scripts/Manager/EditorManager":2},"path":"preview-scripts/assets/frame/scripts/UI/Panel/SubmissionPanel.js"},{"deps":{"./BoundingBoxHelp":40},"path":"preview-scripts/assets/frame/scripts/Utils/BoundingBoxDemo.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/MathUtils.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/BoundingBoxHelp.js"},{"deps":{"../../../game/scripts/UI/panel/TeacherPanel":48,"../../../game/scripts/UI/panel/GamePanel":6,"../UI/Panel/ErrorPanel":33,"../Data/FrameMsgType":4,"../Manager/ListenerManager":15,"../Manager/UIManager":17,"../UI/Panel/AffirmTips":24,"../UI/Panel/TipUI":27,"../UI/Panel/StarCount":32,"../UI/Panel/OverTips":50,"../UI/Panel/UploadAndReturnPanel":26,"../UI/Panel/SubmissionPanel":37},"path":"preview-scripts/assets/frame/scripts/Utils/UIHelp.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Manager/GameManager.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/CustomSyncData.js"},{"deps":{"../../../../game/scripts/Data/ConstValue":11,"../../../../game/scripts/Manager/EditorManager":2,"../../Manager/ListenerManager":15,"../../Manager/ReportManager":25,"../../Manager/UIManager":17,"../../Manager/SoundManager":8,"../../Data/FrameMsgType":4,"../../Manager/SyncDataManager":19,"../../Http/NetWork":10,"../../Utils/UIHelp":41,"../../SDK/T2M":7,"../../SDK/GameMsg":14,"../BaseUI":31},"path":"preview-scripts/assets/frame/scripts/UI/Panel/BaseGamePanel.js"},{"deps":{"./../Manager/SoundManager":8},"path":"preview-scripts/assets/frame/scripts/Utils/AudioPlayExtension.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameConstValue.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/EventType.js"},{"deps":{"../../../../frame/scripts/Manager/ListenerManager":15,"../../../../frame/scripts/UI/Panel/BaseTeacherPanel":5,"../../../../frame/scripts/Manager/UIManager":17,"../../../../frame/scripts/Utils/UIHelp":41,"../../../../frame/scripts/Manager/ReportManager":25,"../../../../frame/scripts/Data/FrameMsgType":4,"../../Manager/EditorManager":2,"./GamePanel":6},"path":"preview-scripts/assets/game/scripts/UI/panel/TeacherPanel.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/UI/Item/SoundConfig.js"},{"deps":{"../BaseFrameUI":18,"./../../Manager/SoundManager":8,"../../Utils/Tools":35,"../../Utils/UIHelp":41,"../../Manager/UIManager":17,"../../SDK/T2M":7,"../../Data/FrameMsgType":4,"../../../../game/scripts/Data/ConstValue":11},"path":"preview-scripts/assets/frame/scripts/UI/Panel/OverTips.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    