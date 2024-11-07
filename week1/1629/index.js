const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.on('line', function(line) {
    const [A, B, C] = line.split(' ').map(BigInt); 
    console.log(getRest(A, B, C).toString());       
    readline.close();
});

function getRest(a, b, c) {
    if (b === BigInt(1)) return a % c;  

    const half = getRest(a, b / BigInt(2), c);

    if (b % BigInt(2) === BigInt(0)) {
        return (half * half) % c;
    } else {
        return (half * half * a) % c;
    }
}
