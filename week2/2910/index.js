const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line); 
}).on('close', function() {
    // 입력에서 첫 줄 제거, 필요없음
    input.shift();

    // 등장 횟수를 기록할 객체
    const table = {};
    // 숫자 목록을 배열로 만듦
    const arr = input[0].split(' ');

    // 각 숫자의 등장 횟수를 기록
    arr.forEach(number => {
        // number가 처음 나오면 1로 시작, 이미 있으면 +1
        table[number] = (table[number] || 0) + 1;  
    });

    // 등장 횟수와 순서를 기준으로 정렬
    const sorted = Object.entries(table).sort((a, b) => {
        // 등장 횟수가 다를 때는 등장 횟수가 많은 순서대로
        if (a[1] !== b[1]) return b[1] - a[1];
        // 등장 횟수가 같으면 처음 등장한 순서대로
        else return arr.indexOf(a[0]) - arr.indexOf(b[0]);
    });

    // 최종 결과 배열
    let result = [];
    sorted.forEach(([number, count]) => {
        // count만큼 number를 배열에 채움
        const repeatedNumbers = Array(count).fill(number);
        // 결과에 추가
        result = result.concat(repeatedNumbers);
    });
    
    console.log(result.join(' '));
    process.exit();
});
