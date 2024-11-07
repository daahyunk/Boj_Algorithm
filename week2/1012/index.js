const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line.trim());  
}).on('close', function() {
    let inputIndex = 0;
    // 테스트 케이스 수
    const T = Number(input[inputIndex++]);
    // 테스트 케이스의 결과 저장
    const results = [];

    // 테스트 케이스별로 처리
    for (let t = 0; t < T; t++) {
        // 가로크기, 세로 크기, 배추 개수를 숫자 배열로 변환해서 M,N,K에 저장
        const [M, N, K] = input[inputIndex++].split(' ').map(Number);

        // graph는 NxM 크기의 2차원 배열, 각 위치에 배추가 있는지 없는지 저장
        // 모든 위치 0으로 초기화
        const graph = Array.from({ length: N }, () => Array(M).fill(0));

        // 배추 위치 저장
        for (let k = 0; k < K; k++) {
            const [x, y] = input[inputIndex++].split(' ').map(Number);
            graph[y][x] = 1;
        }

        // 상하좌우
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

        // BFS 탐색 함수 
        // 시작 위치에서부터 BFS 탐색해서 연결된 모든 배추를 방문 처리함
        function bfs(rStart, cStart) {
            // 방문할 배추 위치를 순서대로 저장
            const queue = [[rStart, cStart]];
            
            while (queue.length > 0) {
                // 현재 위치 큐에서 꺼냄 
                const [currentR, currentC] = queue.shift();

                // 현재 위치가 0이면 이미 방문한 배추 or 배추 없는 땅 -> 넘어감
                if (graph[currentR][currentC] === 0) continue;
                // 현재 위치 0으로 변경 -> 여기 방문했어요
                graph[currentR][currentC] = 0;

                // 상하좌우 인접한 배추 위치 탐색
                for (const [dr, dc] of directions) {
                    const newRow = currentR + dr;
                    const newCol = currentC + dc;

                    // 새 위치가 범위 내에 있고, 배추가 심어져 있는 경우 큐에 추가
                    if (newRow >= 0 && newRow < N && newCol >= 0 && newCol < M && graph[newRow][newCol] === 1) {
                        queue.push([newRow, newCol]);
                    }
                }
            }
        }

        // 지렁이 세는 변수
        let wormCount = 0;

        // 그래프 순회하며 각 배추 군집 탐색
        // 1이 있는 곳 찾으면 bfs 호출 -> 해당 군집 전부 방문 처리
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                if (graph[i][j] === 1) { // 방문하지 않은 배추가 있는 경우
                    bfs(i, j); // 새로운 군집 탐색
                    wormCount++; // 새 군집 찾았으니까 지렁이 수 증가
                }
            }
        }

        results.push(wormCount);
    }

    console.log(results.join('\n'));
    process.exit();
});
