const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
    const N = Number(input[0]);
    const A = input[1].split(' ').map(Number);
    const result = Array(N).fill(-1);  // 결과 배열을 -1로 초기화
    const stack = [];

    for (let i = 0; i < N; i++) {
        // 현재 값이 스택의 맨 위에 있는 인덱스 값보다 클 때 오큰수로 
        while (stack.length > 0 && A[stack[stack.length - 1]] < A[i]) {
            result[stack.pop()] = A[i];
        }
        stack.push(i); // 인덱스를 스택에 추가
    }

    console.log(result.join(' '));
    process.exit();
});