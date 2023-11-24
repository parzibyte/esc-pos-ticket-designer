declare module '@sqlite.org/sqlite-wasm' {
    export function constructor(options: { print?: (message: string) => void; printErr?: (message: string) => void }): Promise<any>;

}
