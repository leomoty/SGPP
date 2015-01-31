declare module Markdown {

    export class Converter {
        constructor(options?: any);
        makeHtml(text: string): string;
    }

}   