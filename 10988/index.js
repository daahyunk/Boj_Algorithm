const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {

    const reversed = line.split('').reverse().join('');

    if (line === reversed) {
        console.log(1); 
    } else {
        console.log(0);
    }

    readline.close();
});