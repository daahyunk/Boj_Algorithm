const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
    const T = Number(input[0]);
    let idx = 1;

    for (let t = 0; t < T; t++) {
        const n = Number(input[idx]); // 의상 개수
        idx++;
        const clothes = {};
        
        for (let i = 0; i < n; i++) {
            const [_, type] = input[idx].split(' '); // 의상 종류
            idx++;
            clothes[type] = (clothes[type] || 0) + 1;
        }

        let combinations = 1;

        for (const count of Object.values(clothes)) {
            combinations *= (count + 1); // 각 종류별 (입지 않음 포함) 곱
        }

        console.log(combinations - 1); // 모든 옷을 입지 않는 경우 제외
    }

    process.exit();
});