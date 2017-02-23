import fs = require('fs');

export const INPUT_KITTENS = 'input/kittens.in';

export interface FileStructure {
    videoCount: number;
    endpointCount: number;
    requestDescriptionCount: number;
    cacheCount: number;
    cacheSizes: number[];
}

export class _InputService {

    private currentLineNumber: number = 0;

    public read(filename: string) {

        this.currentLineNumber = 0;
        const thisReference = this;

        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(filename)
        });

        let fileStructure: FileStructure;

        lineReader.on('line', (line) => {

            if (this.currentLineNumber === 0) {

                const splitLine = line.split(' ');

                fileStructure = {
                    videoCount: +splitLine[0],
                    endpointCount: +splitLine[1],
                    requestDescriptionCount: +splitLine[2],
                    cacheCount: +splitLine[3],
                    cacheSizes: []
                };

                for (let x = 0; x < fileStructure.cacheCount; x++) {
                    fileStructure.cacheSizes.push(+splitLine[4]);
                }

                console.log(fileStructure);
            }

            this.currentLineNumber++;
        });
    }
}

export const InputService = new _InputService();