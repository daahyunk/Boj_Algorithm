const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.on('line', (line) => {
    const X = Number(line.trim());
    let count = 0;
    let value = X;

    while (value > 0) {
        count += value & 1; // 가장 오른쪽 비트가 1인지 확인
        value >>= 1;        // 오른쪽으로 1비트 이동 (value를 2로 나눈 것과 같음)
    }

    console.log(count);
    readline.close();
});
