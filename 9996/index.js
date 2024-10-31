const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
    const N = parseInt(input[0]);

    const [start, end] = input[1].split('*');

    for (let i = 2; i <= N + 1; i++) {
        const word = input[i];
        if (word.startsWith(start) && word.endsWith(end) && word.length >= start.length + end.length) {
            console.log("DA");  
        } else {
            console.log("NE");  
        }
    }
    process.exit();
});
