module ModuleDefinition {

    export class LocalStorage {
        private _LSPrefix: string = "SGPP_";

        containsItem = (key: string): boolean => {
            return localStorage.getItem(this._LSPrefix + key) != null;
        }

        getItem = (key: string, defaultValue?: any) => {
            return JSON.parse(localStorage.getItem(this._LSPrefix + key) || null) || defaultValue;
        }

        setItem = (key: string, value: any): void => {
            localStorage.setItem(this._LSPrefix + key, JSON.stringify(value));
        }

        clear = () => {
            SGPP.log("Removing all SGPP entries from LocalStorage.");
            Object.keys(localStorage).forEach(
                (key: string) => {
                    if (key.indexOf(this._LSPrefix) == 0) {
                        localStorage.removeItem(key);
                    }
                });
        }
    }

}