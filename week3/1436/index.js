// 브루트포스 알고리즘은 가능한 모든 경우의 수를 탐색하여 정답을 찾음
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
    const N = parseInt(input[0]);  
    let num = 666;  // 첫 번째 종말의 수
    let cnt = 1;  // 첫번째 종말의 수를 포함하니까 cnt는 1부터 시작

    // count가 N이 될 때까지 종말의 수 찾기
    while (cnt !== N) {
        num++;  // 다음 수로 이동
        if (String(num).includes("666")) { 
            cnt++;  
        }
    }

    // N번째 종말의 수 출력
    console.log(num);
    process.exit();
});
