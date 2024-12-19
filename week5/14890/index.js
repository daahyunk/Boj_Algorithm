const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];
readline.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    const [N, L] = input.shift().split(' ').map(Number);
    const map = input.map(row => row.split(' ').map(Number));
    
    let result = 0;

    // 경사로 설치 가능한지 확인하는 함수
    function canPass(road) {
        const used = Array(N).fill(false); // 경사로 설치 여부 기록

        for (let i = 0; i < N - 1; i++) {
            const diff = road[i + 1] - road[i];
            
            if (diff === 0) continue; // 높이 같음 -> 넘어감
            
            if (diff === 1) { // 오르막길
                for (let j = 0; j < L; j++) {
                    if (i - j < 0 || road[i] !== road[i - j] || used[i - j]) return false;
                    used[i - j] = true; // 경사로 설치
                }
            } else if (diff === -1) { // 내리막길
                for (let j = 1; j <= L; j++) {
                    if (i + j >= N || road[i + 1] !== road[i + j] || used[i + j]) return false;
                    used[i + j] = true; // 경사로 설치
                }
            } else {
                return false; // 높이 차이가 1 초과
            }
        }
        return true; // 길 지나갈 수 있음
    }

    // 행 검사
    for (let i = 0; i < N; i++) {
        if (canPass(map[i])) result++;
    }

    // 열 검사
    for (let i = 0; i < N; i++) {
        const column = map.map(row => row[i]);
        if (canPass(column)) result++;
    }

    console.log(result);
});
