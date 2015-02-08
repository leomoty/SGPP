//Typing for http://dinbror.dk/bpopup/ jQuery.bPopup.js

declare class bPopup {
    close(): void;
    reposition(animateSpeed: Number): void;
}

interface bPopupSettings {
    amsl?: Number
    appending?: Boolean
    appendTo?: String
    autoClose?: Boolean
    closeClass?: String
    content?: String
    contentContainer?: Boolean
    easing?: String
    escClose?: Boolean
    follow?: [Boolean, Boolean]
    followEasing?: String
    followSpeed?: Number
    iframeAttr?: String
    loadCallback?: Boolean
    loadData?: Boolean
    loadUrl?: Boolean
    modal?: Boolean
    modalClose?: Boolean
    modalColor?: String
    onClose?: Boolean
    onOpen?: Boolean
    opacity?: Number
    position?: [String, String]
    positionStyle?: String
    scrollBar?: Boolean
    speed?: Boolean
    transition?: String
    transitionClose?: Boolean
    zIndex?: Number
}

interface JQuery {

    bPopup(params: bPopupSettings);

    bPopup(): bPopup;
   
}