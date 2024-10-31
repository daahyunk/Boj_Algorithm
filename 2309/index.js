const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(Number(line));
}).on('close', function() {
    const total = input.reduce((sum, height) => sum + height, 0)

    let exclude1, exclude2;

    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if (total - (input[i] + input[j]) === 100) {
                exclude1 = input[i];
                exclude2 = input[j];
                break;
            }
        }
        if (exclude1 !== undefined) break;  
    }

    const result = input.filter(height => height !== exclude1 && height !== exclude2);
    result.sort((a, b) => a - b);

    console.log(result.join('\n'));

    process.exit();
});
