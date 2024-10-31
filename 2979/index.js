const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);
}).on('close', function() {
    const [A, B, C] = input[0].split(' ').map(Number);

    const time = new Array(100).fill(0);

    for (let i = 1; i <= 3; i++) {
        const [start, end] = input[i].split(' ').map(Number);
        for (let j = start; j < end; j++) {  
            time[j]++;
        }
    }

    let totalCost = 0;
    for (let t = 1; t <= 100; t++) {
        if (time[t] === 1) totalCost += A;  
        else if (time[t] === 2) totalCost += B * 2;  
        else if (time[t] === 3) totalCost += C * 3; 
    }

    console.log(totalCost);
    process.exit();
});
