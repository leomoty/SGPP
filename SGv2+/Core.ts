/// <reference path="ModuleDefinition.ts" />

module ModuleDefinition{

    export class Core implements SteamGiftsModule {

        init(): void {
          
        }

        render(): void {
            
        }

        name(): string {
            return "Core";
        }

        log(msg: string): void {
            console.log("[" + new Date() + "] SGV2+ - " + msg);
        }
    }

} 