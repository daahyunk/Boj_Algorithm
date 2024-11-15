// 소인수분해를 통해 2와 5의 개수 중 작은 것이 정답
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
    const T = Number(input[0]);  // 테스트 케이스의 개수

    // 테스트 케이스별로 결과 계산
    const results = [];
    for (let i = 1; i <= T; i++) {
        let N = Number(input[i]);
        let cnt = 0;
        
        while (N >= 5) {
            // 5의 거듭 제곱으로 나누면서 몫을 누적
            N = Math.floor(N / 5);
            cnt += N;
        }

        results.push(cnt);
    }

    console.log(results.join('\n'));
    process.exit();
});