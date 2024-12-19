const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];
readline.on('line', (line) => {
    input.push(line.trim());
}).on('close', () => {
    const N = Number(input.shift());
    const board = input.map(row => row.split(''));

    let minTails = Infinity;

    // 모든 행 뒤집기 경우 탐색 (2^N 경우)
    for (let bitmask = 0; bitmask < (1 << N); bitmask++) {
        let totalTails = 0;

        // 열 기준으로 탐색
        for (let col = 0; col < N; col++) {
            let tails = 0;

            for (let row = 0; row < N; row++) {
                const isFlipped = (bitmask & (1 << row)) !== 0;
                const cell = isFlipped ? (board[row][col] === 'H' ? 'T' : 'H') : board[row][col];
                if (cell === 'T') tails++;
            }

            // 열 뒤집기 고려 (최소값 선택)
            totalTails += Math.min(tails, N - tails);
        }

        minTails = Math.min(minTails, totalTails);
    }

    console.log(minTails);
});
