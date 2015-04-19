module ModuleDefinition {

    export interface SGLocation {
        pageKind: string;
        code: string;
        description: string;
        subpage: string;
        hash: string;
        parameters: any;
    } 

    export interface SteamGiftsModule {
        init(): void;
        render(): void;
        name(): string;
        shouldRun(location: SGLocation): boolean;
        style: string;
    }

    export interface GiveawaysFilter {
        renderControl(element: Element): void;
    }

}