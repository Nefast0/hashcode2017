/// <reference types="es6-promise" />
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
    endpointRequests: EndpointRequest[];
}
export interface EndpointRequest {
    count: number;
    videoNumber: number;
    endpoint: number;
}
export interface Endpoint {
    dataCenterLatency: number;
    cacheCount: number;
    connectedCacheLatencies: number[];
}
export declare class _InputService {
    read(filename: string): Promise<FileStructure>;
}
export declare const InputService: _InputService;
