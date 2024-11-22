const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
    const [N, K] = input[0].split(' ').map(Number); // N -> 수열 길이 K -> 구간 길이
    const arr = input[1].split(' ').map(Number); // 수열 배열
    
    let currentSum = 0; // 현재 구간의 합
    // 배열의 첫구간(0번부터 K-1번까지)의 값을 합산
    for (let i = 0; i < K; i++) { 
        currentSum += arr[i]; 
    }

    // 처음에는 다른 구간합과 비교할 값이 없으므로 첫 번째 구간합을 기준 값으로 설정
    let maxSum = currentSum;

    for (let i = K; i < N; i++) {
        currentSum += arr[i] - arr[i - K]; // 슬라이딩 윈도우.. 구간의 합을 갱신
        maxSum = Math.max(maxSum, currentSum); // 최대값 업데이트
    }

    console.log(maxSum);
    process.exit();
});