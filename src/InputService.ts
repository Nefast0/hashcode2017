import fs = require('fs');

export const INPUT_KITTENS = 'input/kittens.in';

export class _InputService {

    private currentLineNumber: number = 0;

    public read(filename: string) {

        this.currentLineNumber = 0;
        const thisReference = this;

        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(filename)
        });

        lineReader.on('line', function (line) {

            console.log(thisReference.currentLineNumber);

            if (this.currentLineNumber === 0) {
                console.log(line);
            }

            console.log(thisReference.currentLineNumber);

            this.currentLineNumber++;
        });
    }
}

export const InputService = new _InputService();