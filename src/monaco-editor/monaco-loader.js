module.exports = {
    load(srcPath, callBack) {
        const bak = callBack;
        if (window.monaco) {
            if (bak)
                bak()
            return
        }

        const config = {
            paths: { vs: srcPath + '/vs' },
            'vs/nls': {
                availableLanguages: { '*': "zh-cn" }
            }
        }

        const loaderUrl = `${config.paths.vs}/loader.js`
        const onGotAmdLoader = () => {
            if (window.LOADER_PENDING) {
                window.require.config(config)
            }
            window.require(['vs/editor/editor.main'], () => {
                bak()
            })

            if (window.LOADER_PENDING) {
                window.LOADER_PENDING = false;
                const loaderCallbacks = window.LOADER_CALLBACKS;
                if (loaderCallbacks && loaderCallbacks.length) {
                    let currentCallback = loaderCallbacks.shift();
                    while (currentCallback) {
                        currentCallback.fn.call(currentCallback.window);
                        currentCallback = loaderCallbacks.shift();
                    }
                }
            }
        }

        // Load AMD loader if necessary
        if (window.LOADER_PENDING) {
            // We need to avoid loading multiple loader.js when there are multiple editors loading concurrently
            //  delay to call callbacks except the first one
            window.LOADER_CALLBACKS = window.LOADER_CALLBACKS || [];
            window.LOADER_CALLBACKS.push({
                window: this,
                fn: onGotAmdLoader
            });
        } else {
            if (typeof window.require === 'undefined') {
                const loaderScript = window.document.createElement('script');
                loaderScript.type = 'text/javascript';
                loaderScript.src = loaderUrl;
                loaderScript.addEventListener('load', onGotAmdLoader);
                window.document.body.appendChild(loaderScript);
                window.LOADER_PENDING = true;
            } else {
                onGotAmdLoader();
            }
        }
    }
}