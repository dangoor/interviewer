export interface BabelResult {
    code: string;
}

export interface Babel {
    transform: (input: string, options: any) => BabelResult;
}

