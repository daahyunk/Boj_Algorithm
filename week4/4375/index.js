const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
    const results = [];

    for (const line of input) {
        const N = Number(line); // 입력된 수 N
        let num = 1;
        let count = 1; // 1의 자릿수

        while (num % N !== 0) {
            num = (num * 10 + 1) % N; // N으로 나눌 때 나머지 계산
            count++; // 자릿수 증가
        }

        results.push(count);
    }

    console.log(results.join('\n'));
    process.exit();
});