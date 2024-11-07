const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    const alphabetCount = new Array(26).fill(0);

    for (let char of line) {
        const index = char.charCodeAt(0) - 'a'.charCodeAt(0);  
        alphabetCount[index]++;
    }

    console.log(alphabetCount.join(' '));

    readline.close();
});
