module ModuleDefinition {

    export class LocalStorage {
        private _LSPrefix: string = "SGPP_";

        containsItem = (key: string): boolean => {
            return localStorage.getItem(this._LSPrefix + key) != null;
        }

        getItem = (key: string): any => {
            return localStorage.getItem(this._LSPrefix + key);
        }

        setItem = (key: string, value: any): void => {
            localStorage.setItem(this._LSPrefix + key, value);
        }
    }

}