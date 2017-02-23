export declare const INPUT_KITTENS: string;
export declare const EXAMPLE: string;
export interface FileStructure {
    videoCount: number;
    endpointCount: number;
    requestDescriptionCount: number;
    cacheCount: number;
    cacheSizes: number[];
    videoSizes: number[];
    endpoints: Endpoint[];
}
export interface Endpoint {
    dataCenterLatency: number;
    cacheCount: number;
    connectedCacheLatencies: number[];
}
export declare class _InputService {
    read(filename: string): void;
}
export declare const InputService: _InputService;
