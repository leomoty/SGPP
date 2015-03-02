//Typing for http://dinbror.dk/bpopup/ jQuery.bPopup.js

interface bPopupSettings {
    amsl?: number
    appending?: boolean
    appendTo?: string
    autoClose?: boolean
    closeClass?: string
    content?: string
    contentContainer?: boolean
    easing?: string
    escClose?: boolean
    follow?: [boolean, boolean]
    followEasing?: string
    followSpeed?: number
    iframeAttr?: string
    loadCallback?: boolean
    loadData?: boolean
    loadUrl?: boolean
    modal?: boolean
    modalClose?: boolean
    modalColor?: string
    onClose? (): void
    onOpen? (): void
    opacity?: number
    position?: [string, string]
    positionStyle?: string
    scrollBar?: boolean
    speed?: boolean
    transition?: string
    transitionClose?: boolean
    zIndex?: number
}

interface JQueryBPopup {
    close(): void;
    reposition(animateSpeed?: Number): void;
}

interface JQuery {

    bPopup(params: bPopupSettings, callback?: () => void): JQueryBPopup;

    bPopup(): JQueryBPopup;
   
}