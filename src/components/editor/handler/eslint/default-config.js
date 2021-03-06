import { linter } from "./eslint.js"
import v3config from "./v3-config"

export default Object.freeze({
    globals: Object.freeze({
        Array: false,
        ArrayBuffer: false,
        Boolean: false,
        constructor: false,
        DataView: false,
        Date: false,
        decodeURI: false,
        decodeURIComponent: false,
        encodeURI: false,
        encodeURIComponent: false,
        Error: false,
        escape: false,
        eval: false,
        EvalError: false,
        Float32Array: false,
        Float64Array: false,
        Function: false,
        hasOwnProperty: false,
        Infinity: false,
        Int16Array: false,
        Int32Array: false,
        Int8Array: false,
        isFinite: false,
        isNaN: false,
        isPrototypeOf: false,
        JSON: false,
        Map: false,
        Math: false,
        NaN: false,
        Number: false,
        Object: false,
        parseFloat: false,
        parseInt: false,
        Promise: false,
        propertyIsEnumerable: false,
        Proxy: false,
        RangeError: false,
        ReferenceError: false,
        Reflect: false,
        RegExp: false,
        Set: false,
        String: false,
        Symbol: false,
        SyntaxError: false,
        toLocaleString: false,
        toString: false,
        TypeError: false,
        Uint16Array: false,
        Uint32Array: false,
        Uint8Array: false,
        Uint8ClampedArray: false,
        undefined: false,
        unescape: false,
        URIError: false,
        valueOf: false,
        WeakMap: false,
        WeakSet: false,
        AutocompleteErrorEvent: false,
        CDATASection: false,
        ClientRect: false,
        ClientRectList: false,
        CSSAnimation: false,
        CSSTransition: false,
        CSSUnknownRule: false,
        CSSViewportRule: false,
        Debug: false,
        DocumentTimeline: false,
        DOMSettableTokenList: false,
        ElementTimeControl: false,
        FederatedCredential: false,
        FileError: false,
        HTMLAppletElement: false,
        HTMLBlockquoteElement: false,
        HTMLIsIndexElement: false,
        HTMLKeygenElement: false,
        HTMLLayerElement: false,
        IDBEnvironment: false,
        InputMethodContext: false,
        MediaKeyError: false,
        MediaKeyEvent: false,
        MediaKeys: false,
        opera: false,
        PasswordCredential: false,
        ReadableByteStream: false,
        SharedKeyframeList: false,
        showModalDialog: false,
        SiteBoundCredential: false,
        SVGAltGlyphDefElement: false,
        SVGAltGlyphElement: false,
        SVGAltGlyphItemElement: false,
        SVGAnimateColorElement: false,
        SVGAnimatedPathData: false,
        SVGAnimatedPoints: false,
        SVGColor: false,
        SVGColorProfileElement: false,
        SVGColorProfileRule: false,
        SVGCSSRule: false,
        SVGCursorElement: false,
        SVGDocument: false,
        SVGElementInstance: false,
        SVGElementInstanceList: false,
        SVGEvent: false,
        SVGExternalResourcesRequired: false,
        SVGFilterPrimitiveStandardAttributes: false,
        SVGFitToViewBox: false,
        SVGFontElement: false,
        SVGFontFaceElement: false,
        SVGFontFaceFormatElement: false,
        SVGFontFaceNameElement: false,
        SVGFontFaceSrcElement: false,
        SVGFontFaceUriElement: false,
        SVGGlyphElement: false,
        SVGGlyphRefElement: false,
        SVGHKernElement: false,
        SVGICCColor: false,
        SVGLangSpace: false,
        SVGLocatable: false,
        SVGMissingGlyphElement: false,
        SVGPaint: false,
        SVGPathSeg: false,
        SVGPathSegArcAbs: false,
        SVGPathSegArcRel: false,
        SVGPathSegClosePath: false,
        SVGPathSegCurvetoCubicAbs: false,
        SVGPathSegCurvetoCubicRel: false,
        SVGPathSegCurvetoCubicSmoothAbs: false,
        SVGPathSegCurvetoCubicSmoothRel: false,
        SVGPathSegCurvetoQuadraticAbs: false,
        SVGPathSegCurvetoQuadraticRel: false,
        SVGPathSegCurvetoQuadraticSmoothAbs: false,
        SVGPathSegCurvetoQuadraticSmoothRel: false,
        SVGPathSegLinetoAbs: false,
        SVGPathSegLinetoHorizontalAbs: false,
        SVGPathSegLinetoHorizontalRel: false,
        SVGPathSegLinetoRel: false,
        SVGPathSegLinetoVerticalAbs: false,
        SVGPathSegLinetoVerticalRel: false,
        SVGPathSegList: false,
        SVGPathSegMovetoAbs: false,
        SVGPathSegMovetoRel: false,
        SVGRenderingIntent: false,
        SVGStylable: false,
        SVGTests: false,
        SVGTransformable: false,
        SVGTRefElement: false,
        SVGURIReference: false,
        SVGViewSpec: false,
        SVGVKernElement: false,
        SVGZoomAndPan: false,
        SVGZoomEvent: false,
        TimeEvent: false,
        XDomainRequest: false,
        XMLHttpRequestProgressEvent: false,
        XPathException: false,
        XPathNamespace: false,
        XPathNSResolver: false,
        addEventListener: false,
        alert: false,
        AnalyserNode: false,
        Animation: false,
        AnimationEffectReadOnly: false,
        AnimationEffectTiming: false,
        AnimationEffectTimingReadOnly: false,
        AnimationEvent: false,
        AnimationPlaybackEvent: false,
        AnimationTimeline: false,
        applicationCache: false,
        ApplicationCache: false,
        ApplicationCacheErrorEvent: false,
        atob: false,
        Attr: false,
        Audio: false,
        AudioBuffer: false,
        AudioBufferSourceNode: false,
        AudioContext: false,
        AudioDestinationNode: false,
        AudioListener: false,
        AudioNode: false,
        AudioParam: false,
        AudioProcessingEvent: false,
        AudioScheduledSourceNode: false,
        BarProp: false,
        BaseAudioContext: false,
        BatteryManager: false,
        BeforeUnloadEvent: false,
        BiquadFilterNode: false,
        Blob: false,
        blur: false,
        btoa: false,
        BlobEvent: false,
        BroadcastChannel: false,
        BudgetService: false,
        ByteLengthQueuingStrategy: false,
        Cache: false,
        caches: false,
        CacheStorage: false,
        cancelAnimationFrame: false,
        cancelIdleCallback: false,
        CanvasCaptureMediaStreamTrack: false,
        CanvasGradient: false,
        CanvasPattern: false,
        CanvasRenderingContext2D: false,
        ChannelMergerNode: false,
        ChannelSplitterNode: false,
        CharacterData: false,
        clearInterval: false,
        clearTimeout: false,
        clientInformation: false,
        ClipboardEvent: false,
        close: false,
        closed: false,
        CloseEvent: false,
        Comment: false,
        CompositionEvent: false,
        confirm: false,
        console: false,
        ConstantSourceNode: false,
        ConvolverNode: false,
        createImageBitmap: false,
        Credential: false,
        CredentialsContainer: false,
        CountQueuingStrategy: false,
        Crypto: false,
        crypto: false,
        CryptoKey: false,
        CSS: false,
        CSSConditionRule: false,
        CSSFontFaceRule: false,
        CSSGroupingRule: false,
        CSSImportRule: false,
        CSSKeyframeRule: false,
        CSSKeyframesRule: false,
        CSSMediaRule: false,
        CSSNamespaceRule: false,
        CSSPageRule: false,
        CSSRule: false,
        CSSRuleList: false,
        CSSStyleDeclaration: false,
        CSSStyleRule: false,
        CSSStyleSheet: false,
        CSSSupportsRule: false,
        CustomElementRegistry: false,
        customElements: false,
        CustomEvent: false,
        DataTransfer: false,
        DataTransferItem: false,
        DataTransferItemList: false,
        defaultStatus: false,
        defaultstatus: false,
        DelayNode: false,
        DeviceMotionEvent: false,
        DeviceOrientationEvent: false,
        devicePixelRatio: false,
        dispatchEvent: false,
        document: false,
        Document: false,
        DocumentFragment: false,
        DocumentType: false,
        DOMError: false,
        DOMException: false,
        DOMImplementation: false,
        DOMMatrix: false,
        DOMMatrixReadOnly: false,
        DOMParser: false,
        DOMPoint: false,
        DOMPointReadOnly: false,
        DOMQuad: false,
        DOMRect: false,
        DOMRectReadOnly: false,
        DOMStringList: false,
        DOMStringMap: false,
        DOMTokenList: false,
        DragEvent: false,
        DynamicsCompressorNode: false,
        Element: false,
        ErrorEvent: false,
        event: false,
        Event: false,
        EventSource: false,
        EventTarget: false,
        external: false,
        fetch: false,
        File: false,
        FileList: false,
        FileReader: false,
        find: false,
        focus: false,
        FocusEvent: false,
        FontFace: false,
        FontFaceSetLoadEvent: false,
        FormData: false,
        frameElement: false,
        frames: false,
        GainNode: false,
        Gamepad: false,
        GamepadButton: false,
        GamepadEvent: false,
        getComputedStyle: false,
        getSelection: false,
        HashChangeEvent: false,
        Headers: false,
        history: false,
        History: false,
        HTMLAllCollection: false,
        HTMLAnchorElement: false,
        HTMLAreaElement: false,
        HTMLAudioElement: false,
        HTMLBaseElement: false,
        HTMLBodyElement: false,
        HTMLBRElement: false,
        HTMLButtonElement: false,
        HTMLCanvasElement: false,
        HTMLCollection: false,
        HTMLContentElement: false,
        HTMLDataElement: false,
        HTMLDataListElement: false,
        HTMLDetailsElement: false,
        HTMLDialogElement: false,
        HTMLDirectoryElement: false,
        HTMLDivElement: false,
        HTMLDListElement: false,
        HTMLDocument: false,
        HTMLElement: false,
        HTMLEmbedElement: false,
        HTMLFieldSetElement: false,
        HTMLFontElement: false,
        HTMLFormControlsCollection: false,
        HTMLFormElement: false,
        HTMLFrameElement: false,
        HTMLFrameSetElement: false,
        HTMLHeadElement: false,
        HTMLHeadingElement: false,
        HTMLHRElement: false,
        HTMLHtmlElement: false,
        HTMLIFrameElement: false,
        HTMLImageElement: false,
        HTMLInputElement: false,
        HTMLLabelElement: false,
        HTMLLegendElement: false,
        HTMLLIElement: false,
        HTMLLinkElement: false,
        HTMLMapElement: false,
        HTMLMarqueeElement: false,
        HTMLMediaElement: false,
        HTMLMenuElement: false,
        HTMLMetaElement: false,
        HTMLMeterElement: false,
        HTMLModElement: false,
        HTMLObjectElement: false,
        HTMLOListElement: false,
        HTMLOptGroupElement: false,
        HTMLOptionElement: false,
        HTMLOptionsCollection: false,
        HTMLOutputElement: false,
        HTMLParagraphElement: false,
        HTMLParamElement: false,
        HTMLPictureElement: false,
        HTMLPreElement: false,
        HTMLProgressElement: false,
        HTMLQuoteElement: false,
        HTMLScriptElement: false,
        HTMLSelectElement: false,
        HTMLShadowElement: false,
        HTMLSlotElement: false,
        HTMLSourceElement: false,
        HTMLSpanElement: false,
        HTMLStyleElement: false,
        HTMLTableCaptionElement: false,
        HTMLTableCellElement: false,
        HTMLTableColElement: false,
        HTMLTableElement: false,
        HTMLTableRowElement: false,
        HTMLTableSectionElement: false,
        HTMLTemplateElement: false,
        HTMLTextAreaElement: false,
        HTMLTimeElement: false,
        HTMLTitleElement: false,
        HTMLTrackElement: false,
        HTMLUListElement: false,
        HTMLUnknownElement: false,
        HTMLVideoElement: false,
        IDBCursor: false,
        IDBCursorWithValue: false,
        IDBDatabase: false,
        IDBFactory: false,
        IDBIndex: false,
        IDBKeyRange: false,
        IDBObjectStore: false,
        IDBOpenDBRequest: false,
        IDBRequest: false,
        IDBTransaction: false,
        IDBVersionChangeEvent: false,
        IdleDeadline: false,
        IIRFilterNode: false,
        Image: false,
        ImageBitmap: false,
        ImageBitmapRenderingContext: false,
        ImageCapture: false,
        ImageData: false,
        indexedDB: false,
        innerHeight: false,
        innerWidth: false,
        InputEvent: false,
        IntersectionObserver: false,
        IntersectionObserverEntry: false,
        Intl: false,
        isSecureContext: false,
        KeyboardEvent: false,
        KeyframeEffect: false,
        KeyframeEffectReadOnly: false,
        length: false,
        localStorage: false,
        location: false,
        Location: false,
        locationbar: false,
        matchMedia: false,
        MediaDeviceInfo: false,
        MediaDevices: false,
        MediaElementAudioSourceNode: false,
        MediaEncryptedEvent: false,
        MediaError: false,
        MediaKeyMessageEvent: false,
        MediaKeySession: false,
        MediaKeyStatusMap: false,
        MediaKeySystemAccess: false,
        MediaList: false,
        MediaQueryList: false,
        MediaQueryListEvent: false,
        MediaSource: false,
        MediaRecorder: false,
        MediaSettingsRange: false,
        MediaStream: false,
        MediaStreamAudioDestinationNode: false,
        MediaStreamAudioSourceNode: false,
        MediaStreamEvent: false,
        MediaStreamTrack: false,
        MediaStreamTrackEvent: false,
        menubar: false,
        MessageChannel: false,
        MessageEvent: false,
        MessagePort: false,
        MIDIAccess: false,
        MIDIConnectionEvent: false,
        MIDIInput: false,
        MIDIInputMap: false,
        MIDIMessageEvent: false,
        MIDIOutput: false,
        MIDIOutputMap: false,
        MIDIPort: false,
        MimeType: false,
        MimeTypeArray: false,
        MouseEvent: false,
        moveBy: false,
        moveTo: false,
        MutationEvent: false,
        MutationObserver: false,
        MutationRecord: false,
        name: false,
        NamedNodeMap: false,
        NavigationPreloadManager: false,
        navigator: false,
        Navigator: false,
        NetworkInformation: false,
        Node: false,
        NodeFilter: false,
        NodeIterator: false,
        NodeList: false,
        Notification: false,
        OfflineAudioCompletionEvent: false,
        OfflineAudioContext: false,
        offscreenBuffering: false,
        onabort: true,
        onafterprint: true,
        onanimationend: true,
        onanimationiteration: true,
        onanimationstart: true,
        onappinstalled: true,
        onauxclick: true,
        onbeforeinstallprompt: true,
        onbeforeprint: true,
        onbeforeunload: true,
        onblur: true,
        oncancel: true,
        oncanplay: true,
        oncanplaythrough: true,
        onchange: true,
        onclick: true,
        onclose: true,
        oncontextmenu: true,
        oncuechange: true,
        ondblclick: true,
        ondevicemotion: true,
        ondeviceorientation: true,
        ondeviceorientationabsolute: true,
        ondrag: true,
        ondragend: true,
        ondragenter: true,
        ondragleave: true,
        ondragover: true,
        ondragstart: true,
        ondrop: true,
        ondurationchange: true,
        onemptied: true,
        onended: true,
        onerror: true,
        onfocus: true,
        ongotpointercapture: true,
        onhashchange: true,
        oninput: true,
        oninvalid: true,
        onkeydown: true,
        onkeypress: true,
        onkeyup: true,
        onlanguagechange: true,
        onload: true,
        onloadeddata: true,
        onloadedmetadata: true,
        onloadstart: true,
        onlostpointercapture: true,
        onmessage: true,
        onmessageerror: true,
        onmousedown: true,
        onmouseenter: true,
        onmouseleave: true,
        onmousemove: true,
        onmouseout: true,
        onmouseover: true,
        onmouseup: true,
        onmousewheel: true,
        onoffline: true,
        ononline: true,
        onpagehide: true,
        onpageshow: true,
        onpause: true,
        onplay: true,
        onplaying: true,
        onpointercancel: true,
        onpointerdown: true,
        onpointerenter: true,
        onpointerleave: true,
        onpointermove: true,
        onpointerout: true,
        onpointerover: true,
        onpointerup: true,
        onpopstate: true,
        onprogress: true,
        onratechange: true,
        onrejectionhandled: true,
        onreset: true,
        onresize: true,
        onscroll: true,
        onsearch: true,
        onseeked: true,
        onseeking: true,
        onselect: true,
        onstalled: true,
        onstorage: true,
        onsubmit: true,
        onsuspend: true,
        ontimeupdate: true,
        ontoggle: true,
        ontransitionend: true,
        onunhandledrejection: true,
        onunload: true,
        onvolumechange: true,
        onwaiting: true,
        onwheel: true,
        open: false,
        openDatabase: false,
        opener: false,
        Option: false,
        origin: false,
        OscillatorNode: false,
        outerHeight: false,
        outerWidth: false,
        PageTransitionEvent: false,
        pageXOffset: false,
        pageYOffset: false,
        PannerNode: false,
        parent: false,
        Path2D: false,
        PaymentAddress: false,
        PaymentRequest: false,
        PaymentRequestUpdateEvent: false,
        PaymentResponse: false,
        performance: false,
        Performance: false,
        PerformanceEntry: false,
        PerformanceLongTaskTiming: false,
        PerformanceMark: false,
        PerformanceMeasure: false,
        PerformanceNavigation: false,
        PerformanceNavigationTiming: false,
        PerformanceObserver: false,
        PerformanceObserverEntryList: false,
        PerformancePaintTiming: false,
        PerformanceResourceTiming: false,
        PerformanceTiming: false,
        PeriodicWave: false,
        Permissions: false,
        PermissionStatus: false,
        personalbar: false,
        PhotoCapabilities: false,
        Plugin: false,
        PluginArray: false,
        PointerEvent: false,
        PopStateEvent: false,
        postMessage: false,
        Presentation: false,
        PresentationAvailability: false,
        PresentationConnection: false,
        PresentationConnectionAvailableEvent: false,
        PresentationConnectionCloseEvent: false,
        PresentationConnectionList: false,
        PresentationReceiver: false,
        PresentationRequest: false,
        print: false,
        ProcessingInstruction: false,
        ProgressEvent: false,
        PromiseRejectionEvent: false,
        prompt: false,
        PushManager: false,
        PushSubscription: false,
        PushSubscriptionOptions: false,
        RadioNodeList: false,
        Range: false,
        ReadableStream: false,
        removeEventListener: false,
        RemotePlayback: false,
        Request: false,
        requestAnimationFrame: false,
        requestIdleCallback: false,
        resizeBy: false,
        ResizeObserver: false,
        ResizeObserverEntry: false,
        resizeTo: false,
        Response: false,
        RTCCertificate: false,
        RTCDataChannel: false,
        RTCDataChannelEvent: false,
        RTCIceCandidate: false,
        RTCPeerConnection: false,
        RTCPeerConnectionIceEvent: false,
        RTCRtpContributingSource: false,
        RTCRtpReceiver: false,
        RTCSessionDescription: false,
        RTCStatsReport: false,
        screen: false,
        Screen: false,
        screenLeft: false,
        ScreenOrientation: false,
        screenTop: false,
        screenX: false,
        screenY: false,
        ScriptProcessorNode: false,
        scroll: false,
        scrollbars: false,
        scrollBy: false,
        scrollTo: false,
        scrollX: false,
        scrollY: false,
        SecurityPolicyViolationEvent: false,
        Selection: false,
        self: false,
        ServiceWorker: false,
        ServiceWorkerContainer: false,
        ServiceWorkerRegistration: false,
        sessionStorage: false,
        setInterval: false,
        setTimeout: false,
        ShadowRoot: false,
        SharedWorker: false,
        SourceBuffer: false,
        SourceBufferList: false,
        speechSynthesis: false,
        SpeechSynthesisEvent: false,
        SpeechSynthesisUtterance: false,
        StaticRange: false,
        status: false,
        statusbar: false,
        StereoPannerNode: false,
        stop: false,
        Storage: false,
        StorageEvent: false,
        StorageManager: false,
        styleMedia: false,
        StyleSheet: false,
        StyleSheetList: false,
        SubtleCrypto: false,
        SVGAElement: false,
        SVGAngle: false,
        SVGAnimatedAngle: false,
        SVGAnimatedBoolean: false,
        SVGAnimatedEnumeration: false,
        SVGAnimatedInteger: false,
        SVGAnimatedLength: false,
        SVGAnimatedLengthList: false,
        SVGAnimatedNumber: false,
        SVGAnimatedNumberList: false,
        SVGAnimatedPreserveAspectRatio: false,
        SVGAnimatedRect: false,
        SVGAnimatedString: false,
        SVGAnimatedTransformList: false,
        SVGAnimateElement: false,
        SVGAnimateMotionElement: false,
        SVGAnimateTransformElement: false,
        SVGAnimationElement: false,
        SVGCircleElement: false,
        SVGClipPathElement: false,
        SVGComponentTransferFunctionElement: false,
        SVGDefsElement: false,
        SVGDescElement: false,
        SVGDiscardElement: false,
        SVGElement: false,
        SVGEllipseElement: false,
        SVGFEBlendElement: false,
        SVGFEColorMatrixElement: false,
        SVGFEComponentTransferElement: false,
        SVGFECompositeElement: false,
        SVGFEConvolveMatrixElement: false,
        SVGFEDiffuseLightingElement: false,
        SVGFEDisplacementMapElement: false,
        SVGFEDistantLightElement: false,
        SVGFEDropShadowElement: false,
        SVGFEFloodElement: false,
        SVGFEFuncAElement: false,
        SVGFEFuncBElement: false,
        SVGFEFuncGElement: false,
        SVGFEFuncRElement: false,
        SVGFEGaussianBlurElement: false,
        SVGFEImageElement: false,
        SVGFEMergeElement: false,
        SVGFEMergeNodeElement: false,
        SVGFEMorphologyElement: false,
        SVGFEOffsetElement: false,
        SVGFEPointLightElement: false,
        SVGFESpecularLightingElement: false,
        SVGFESpotLightElement: false,
        SVGFETileElement: false,
        SVGFETurbulenceElement: false,
        SVGFilterElement: false,
        SVGForeignObjectElement: false,
        SVGGElement: false,
        SVGGeometryElement: false,
        SVGGradientElement: false,
        SVGGraphicsElement: false,
        SVGImageElement: false,
        SVGLength: false,
        SVGLengthList: false,
        SVGLinearGradientElement: false,
        SVGLineElement: false,
        SVGMarkerElement: false,
        SVGMaskElement: false,
        SVGMatrix: false,
        SVGMetadataElement: false,
        SVGMPathElement: false,
        SVGNumber: false,
        SVGNumberList: false,
        SVGPathElement: false,
        SVGPatternElement: false,
        SVGPoint: false,
        SVGPointList: false,
        SVGPolygonElement: false,
        SVGPolylineElement: false,
        SVGPreserveAspectRatio: false,
        SVGRadialGradientElement: false,
        SVGRect: false,
        SVGRectElement: false,
        SVGScriptElement: false,
        SVGSetElement: false,
        SVGStopElement: false,
        SVGStringList: false,
        SVGStyleElement: false,
        SVGSVGElement: false,
        SVGSwitchElement: false,
        SVGSymbolElement: false,
        SVGTextContentElement: false,
        SVGTextElement: false,
        SVGTextPathElement: false,
        SVGTextPositioningElement: false,
        SVGTitleElement: false,
        SVGTransform: false,
        SVGTransformList: false,
        SVGTSpanElement: false,
        SVGUnitTypes: false,
        SVGUseElement: false,
        SVGViewElement: false,
        TaskAttributionTiming: false,
        Text: false,
        TextDecoder: false,
        TextEncoder: false,
        TextEvent: false,
        TextMetrics: false,
        TextTrack: false,
        TextTrackCue: false,
        TextTrackCueList: false,
        TextTrackList: false,
        TimeRanges: false,
        toolbar: false,
        top: false,
        Touch: false,
        TouchEvent: false,
        TouchList: false,
        TrackEvent: false,
        TransitionEvent: false,
        TreeWalker: false,
        UIEvent: false,
        URL: false,
        URLSearchParams: false,
        ValidityState: false,
        VisualViewport: false,
        visualViewport: false,
        VTTCue: false,
        WaveShaperNode: false,
        WebAssembly: false,
        WebGL2RenderingContext: false,
        WebGLActiveInfo: false,
        WebGLBuffer: false,
        WebGLContextEvent: false,
        WebGLFramebuffer: false,
        WebGLProgram: false,
        WebGLQuery: false,
        WebGLRenderbuffer: false,
        WebGLRenderingContext: false,
        WebGLSampler: false,
        WebGLShader: false,
        WebGLShaderPrecisionFormat: false,
        WebGLSync: false,
        WebGLTexture: false,
        WebGLTransformFeedback: false,
        WebGLUniformLocation: false,
        WebGLVertexArrayObject: false,
        WebSocket: false,
        WheelEvent: false,
        Window: false,
        window: false,
        Worker: false,
        WritableStream: false,
        XMLDocument: false,
        XMLHttpRequest: false,
        XMLHttpRequestEventTarget: false,
        XMLHttpRequestUpload: false,
        XMLSerializer: false,
        XPathEvaluator: false,
        XPathExpression: false,
        XPathResult: false,
        XSLTProcessor: false,
    }),

    rules: Object.freeze(
        (() => {
            const rules = {}
            const ignoreRules = v3config.ignoreRules
            for (const [name, rule] of linter.getRules()) {
                const enabled =
                    name.startsWith("vue/") ||
                    rule.meta.docs.recommended ||
                    name === "object-shorthand"
                rules[name] = enabled ? 2 : 0
                 if (ignoreRules && $.inArray(name, ignoreRules) >= 0) {
                     rules[name] = 0;
                 }
            }
            return rules
        })(),
    ),

    parser: "vue-eslint-parser",
    parserOptions: Object.freeze({
        parser: "espree",
        ecmaVersion: 2019,
        sourceType: "module",
        ecmaFeatures: Object.freeze({ jsx: true }),
    }),
})
