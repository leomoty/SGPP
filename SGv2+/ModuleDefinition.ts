/// <reference path="SGLocation.ts" />

module ModuleDefinition {
    export interface SteamGiftsModule {
        init(): void;
        render(): void;
        name(): string;
        shouldRun(location: SGLocation): boolean;
        style: string;
    }
}