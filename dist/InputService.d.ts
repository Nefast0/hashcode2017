export declare const INPUT_KITTENS: string;
export interface FileStructure {
    videoCount: number;
    endpointCount: number;
    requestDescriptionCount: number;
    cacheCount: number;
    cacheSizes: number[];
}
export declare class _InputService {
    private currentLineNumber;
    read(filename: string): void;
}
export declare const InputService: _InputService;
