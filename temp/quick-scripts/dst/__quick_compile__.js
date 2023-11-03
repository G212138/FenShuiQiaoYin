
(function () {
var scripts = [{"deps":{"./assets/frame/scripts/Manager/ListenerManager":2,"./assets/game/scripts/SkeletonExt":3,"./assets/frame/scripts/Data/FrameMsgType":8,"./assets/frame/scripts/SDK/GameMsg":9,"./assets/frame/scripts/UI/AdaptiveScreen":15,"./assets/frame/scripts/UI/Item/Tip":18,"./assets/frame/scripts/UI/BindNode":19,"./assets/game/scripts/Data/EventType":21,"./assets/frame/scripts/Utils/HitTest":31,"./assets/frame/scripts/Utils/Tools":32,"./assets/frame/scripts/Utils/BoundingBoxHelp":33,"./assets/frame/scripts/Utils/MathUtils":34,"./assets/frame/scripts/Data/FrameSyncData":35,"./assets/game/scripts/Manager/GameManager":40,"./assets/game/scripts/Data/ConstValue":42,"./assets/game/scripts/Manager/EditorManager":43,"./assets/game/scripts/Data/CustomSyncData":45,"./assets/frame/scripts/Data/FrameConstValue":47,"./assets/game/scripts/UI/Item/SoundConfig":50,"./assets/frame/scripts/UI/Item/TeacherPanelLoading":1,"./assets/frame/scripts/SDK/T2M":5,"./assets/frame/scripts/Utils/AudioPlayExtension":7,"./assets/frame/scripts/Manager/UIManager":10,"./assets/game/scripts/UI/Item/GameUI":4,"./assets/frame/scripts/UI/BaseUI":11,"./assets/frame/scripts/UI/GameMain":12,"./assets/frame/scripts/UI/BaseFrameUI":14,"./assets/frame/scripts/UI/Panel/AffirmTips":6,"./assets/frame/scripts/Utils/BoundingBoxDemo":36,"./assets/frame/scripts/Utils/UIHelp":37,"./assets/frame/scripts/UI/Item/MaskGlobal":13,"./assets/frame/scripts/UI/Item/TitleNode":16,"./assets/frame/scripts/UI/Panel/BaseGamePanel":17,"./assets/frame/scripts/UI/Panel/OverTips":20,"./assets/frame/scripts/UI/Item/MaskRecover":22,"./assets/frame/scripts/UI/Item/replayBtn":23,"./assets/frame/scripts/UI/Panel/LoadingUI":24,"./assets/frame/scripts/UI/Panel/ErrorPanel":25,"./assets/frame/scripts/UI/Panel/StarCount":26,"./assets/frame/scripts/UI/Panel/SubmissionPanel":27,"./assets/frame/scripts/UI/Panel/TipUI":28,"./assets/frame/scripts/UI/Panel/BaseTeacherPanel":29,"./assets/frame/scripts/UI/Panel/UploadAndReturnPanel":30,"./assets/frame/scripts/Http/NetWork":41,"./assets/game/scripts/UI/panel/TeacherPanel":38,"./assets/game/scripts/UI/Components/ButtonSync":39,"./assets/frame/scripts/Manager/SoundManager":44,"./assets/frame/scripts/Manager/SyncDataManager":49,"./assets/frame/scripts/Manager/ReportManager":48,"./assets/game/scripts/UI/panel/GamePanel":46},"path":"preview-scripts/__qc_index__.js"},{"deps":{"../../Manager/ListenerManager":2,"../../Data/FrameMsgType":8,"../BindNode":19},"path":"preview-scripts/assets/frame/scripts/UI/Item/TeacherPanelLoading.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Manager/ListenerManager.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/SkeletonExt.js"},{"deps":{"../../../../frame/scripts/Manager/SoundManager":44,"../../../../frame/scripts/Utils/Tools":32,"../../../../frame/scripts/Manager/ListenerManager":2,"../../../../frame/scripts/Utils/UIHelp":37,"../../../../frame/scripts/Manager/SyncDataManager":49,"../../Data/EventType":21,"./SoundConfig":50},"path":"preview-scripts/assets/game/scripts/UI/Item/GameUI.js"},{"deps":{"../Data/FrameMsgType":8,"../Http/NetWork":41,"../Manager/ListenerManager":2,"../Manager/SyncDataManager":49,"../Utils/UIHelp":37,"./GameMsg":9},"path":"preview-scripts/assets/frame/scripts/SDK/T2M.js"},{"deps":{"../../Data/FrameMsgType":8,"../../Utils/UIHelp":37,"../BaseFrameUI":14,"../../SDK/T2M":5},"path":"preview-scripts/assets/frame/scripts/UI/Panel/AffirmTips.js"},{"deps":{"./../Manager/SoundManager":44},"path":"preview-scripts/assets/frame/scripts/Utils/AudioPlayExtension.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameMsgType.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/SDK/GameMsg.js"},{"deps":{"../UI/BaseUI":11},"path":"preview-scripts/assets/frame/scripts/Manager/UIManager.js"},{"deps":{"./BindNode":19,"../Data/FrameConstValue":47,"../Manager/ListenerManager":2},"path":"preview-scripts/assets/frame/scripts/UI/BaseUI.js"},{"deps":{"../../../game/scripts/Manager/EditorManager":43,"../Http/NetWork":41,"../Manager/SyncDataManager":49,"../Data/FrameMsgType":8,"../Manager/ReportManager":48,"../Manager/SoundManager":44,"../Manager/ListenerManager":2,"../SDK/GameMsg":9,"../Manager/UIManager":10,"../Utils/UIHelp":37,"../SDK/T2M":5},"path":"preview-scripts/assets/frame/scripts/UI/GameMain.js"},{"deps":{"../../Data/FrameMsgType":8,"../../Manager/UIManager":10,"../../Manager/ListenerManager":2,"../../Utils/UIHelp":37,"../BindNode":19},"path":"preview-scripts/assets/frame/scripts/UI/Item/MaskGlobal.js"},{"deps":{"../Data/FrameConstValue":47,"./BaseUI":11},"path":"preview-scripts/assets/frame/scripts/UI/BaseFrameUI.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/AdaptiveScreen.js"},{"deps":{"../../Data/FrameMsgType":8,"../../Manager/ListenerManager":2},"path":"preview-scripts/assets/frame/scripts/UI/Item/TitleNode.js"},{"deps":{"../../../../game/scripts/Manager/EditorManager":43,"../../Data/FrameMsgType":8,"../../Http/NetWork":41,"../../../../game/scripts/Data/ConstValue":42,"../../Manager/ReportManager":48,"../../Manager/SoundManager":44,"../../Manager/ListenerManager":2,"../../Manager/UIManager":10,"../../Manager/SyncDataManager":49,"../../SDK/GameMsg":9,"../../Utils/UIHelp":37,"../../SDK/T2M":5,"../BaseUI":11},"path":"preview-scripts/assets/frame/scripts/UI/Panel/BaseGamePanel.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/Item/Tip.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/BindNode.js"},{"deps":{"./../../Manager/SoundManager":44,"../../Utils/Tools":32,"../../Data/FrameMsgType":8,"../../Utils/UIHelp":37,"../BaseFrameUI":14,"../../../../game/scripts/Data/ConstValue":42,"../../SDK/T2M":5,"../../Manager/UIManager":10},"path":"preview-scripts/assets/frame/scripts/UI/Panel/OverTips.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/EventType.js"},{"deps":{"../../Data/FrameMsgType":8,"../../Manager/UIManager":10,"../../Manager/ListenerManager":2,"../BindNode":19},"path":"preview-scripts/assets/frame/scripts/UI/Item/MaskRecover.js"},{"deps":{"../../Data/FrameMsgType":8,"../../SDK/T2M":5},"path":"preview-scripts/assets/frame/scripts/UI/Item/replayBtn.js"},{"deps":{"../../../../game/scripts/UI/panel/GamePanel":46,"../../../../game/scripts/UI/panel/TeacherPanel":38,"../../Manager/SoundManager":44,"../../../../game/scripts/Data/ConstValue":42,"../BaseFrameUI":14,"../../SDK/GameMsg":9,"../../Manager/UIManager":10,"../../Http/NetWork":41},"path":"preview-scripts/assets/frame/scripts/UI/Panel/LoadingUI.js"},{"deps":{"../../Utils/UIHelp":37,"./../../Manager/SoundManager":44,"./../../SDK/GameMsg":9,"./../BaseFrameUI":14},"path":"preview-scripts/assets/frame/scripts/UI/Panel/ErrorPanel.js"},{"deps":{"../../Utils/Tools":32,"./../../Manager/SoundManager":44,"../BaseFrameUI":14,"../../../../game/scripts/Data/ConstValue":42,"../../Manager/ReportManager":48,"../../../../game/scripts/Manager/EditorManager":43,"../../Utils/UIHelp":37},"path":"preview-scripts/assets/frame/scripts/UI/Panel/StarCount.js"},{"deps":{"../../Http/NetWork":41,"../../../../game/scripts/Manager/EditorManager":43,"../../../../game/scripts/Data/ConstValue":42,"../BaseFrameUI":14,"../../Utils/UIHelp":37},"path":"preview-scripts/assets/frame/scripts/UI/Panel/SubmissionPanel.js"},{"deps":{"../BaseFrameUI":14,"../Item/Tip":18},"path":"preview-scripts/assets/frame/scripts/UI/Panel/TipUI.js"},{"deps":{"../../../../game/scripts/Manager/EditorManager":43,"../../Http/NetWork":41,"../../../../game/scripts/Data/ConstValue":42,"../BaseUI":11,"../../Utils/UIHelp":37},"path":"preview-scripts/assets/frame/scripts/UI/Panel/BaseTeacherPanel.js"},{"deps":{"../../Manager/ReportManager":48,"./../../Manager/ListenerManager":2,"../BaseFrameUI":14,"../../Data/FrameMsgType":8,"../../Utils/UIHelp":37,"../../Manager/SoundManager":44,"../../../../game/scripts/Manager/EditorManager":43,"../../SDK/T2M":5},"path":"preview-scripts/assets/frame/scripts/UI/Panel/UploadAndReturnPanel.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/HitTest.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/Tools.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/BoundingBoxHelp.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/MathUtils.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameSyncData.js"},{"deps":{"./BoundingBoxHelp":33},"path":"preview-scripts/assets/frame/scripts/Utils/BoundingBoxDemo.js"},{"deps":{"../../../game/scripts/UI/panel/GamePanel":46,"../../../game/scripts/UI/panel/TeacherPanel":38,"../Data/FrameMsgType":8,"../UI/Panel/ErrorPanel":25,"../Manager/UIManager":10,"../Manager/ListenerManager":2,"../UI/Panel/AffirmTips":6,"../UI/Panel/OverTips":20,"../UI/Panel/StarCount":26,"../UI/Panel/UploadAndReturnPanel":30,"../UI/Panel/TipUI":28,"../UI/Panel/SubmissionPanel":27},"path":"preview-scripts/assets/frame/scripts/Utils/UIHelp.js"},{"deps":{"../../../../frame/scripts/Manager/ListenerManager":2,"../../../../frame/scripts/Data/FrameMsgType":8,"../../../../frame/scripts/Manager/ReportManager":48,"../../../../frame/scripts/UI/Panel/BaseTeacherPanel":29,"../../../../frame/scripts/Manager/UIManager":10,"../../Manager/EditorManager":43,"../../../../frame/scripts/Utils/UIHelp":37,"./GamePanel":46},"path":"preview-scripts/assets/game/scripts/UI/panel/TeacherPanel.js"},{"deps":{"../../../../frame/scripts/SDK/T2M":5},"path":"preview-scripts/assets/game/scripts/UI/Components/ButtonSync.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Manager/GameManager.js"},{"deps":{"../../../game/scripts/Data/ConstValue":42,"../Utils/UIHelp":37,"../Manager/UIManager":10,"../SDK/GameMsg":9},"path":"preview-scripts/assets/frame/scripts/Http/NetWork.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/ConstValue.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Manager/EditorManager.js"},{"deps":{"../Data/FrameMsgType":8,"../Data/FrameConstValue":47,"../SDK/GameMsg":9,"../Http/NetWork":41,"./ListenerManager":2,"./UIManager":10},"path":"preview-scripts/assets/frame/scripts/Manager/SoundManager.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/CustomSyncData.js"},{"deps":{"../../../../frame/scripts/Manager/ListenerManager":2,"../../../../frame/scripts/Manager/SyncDataManager":49,"../../../../frame/scripts/UI/Panel/BaseGamePanel":17,"../../Data/EventType":21},"path":"preview-scripts/assets/game/scripts/UI/panel/GamePanel.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameConstValue.js"},{"deps":{"../../../game/scripts/Data/ConstValue":42,"../SDK/GameMsg":9,"../../../game/scripts/Manager/EditorManager":43},"path":"preview-scripts/assets/frame/scripts/Manager/ReportManager.js"},{"deps":{"../../../frame/scripts/Data/FrameSyncData":35,"../../../game/scripts/Data/CustomSyncData":45,"../../../frame/scripts/Manager/ReportManager":48},"path":"preview-scripts/assets/frame/scripts/Manager/SyncDataManager.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/UI/Item/SoundConfig.js"}];
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
    