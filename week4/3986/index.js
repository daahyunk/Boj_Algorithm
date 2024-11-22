const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
    const N = Number(input[0]); // 단어 개수
    let goodWords = 0;

    for (let i = 1; i <= N; i++) {
        const stack = [];
        const word = input[i];
        
        for (const char of word) {
            if (stack.length && stack[stack.length - 1] === char) {
                stack.pop(); // 스택의 마지막 문자와 같으면 제거
            } else {
                stack.push(char); // 아니면 추가
            }
        }

        if (stack.length === 0) goodWords++; // 스택이 비었으면 좋은 단어
    }

    console.log(goodWords);
    process.exit();
});