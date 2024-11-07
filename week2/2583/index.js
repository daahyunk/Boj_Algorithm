const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line.trim());  
}).on('close', function() {
    // M: 세로 길이, N: 가로 길이, K: 직사각형 개수
    const [M, N, K] = input[0].split(' ').map(Number);
    
    // MxN 크기의 격자 생성하고 초기화
    const graph = Array.from({ length: M }, () => Array(N).fill(0));
    const visited = Array.from({ length: M }, () => Array(N).fill(false));

    // 직사각형 채우기
    for (let i = 1; i <= K; i++) {
        // x1, y1는 직사각형의 왼쪽 아래 꼭짓점 좌표, x2, y2는 오른쪽 위 꼭짓점 좌표
        const [x1, y1, x2, y2] = input[i].split(' ').map(Number);
        
        // (x1, y1)에서 (x2, y2) 범위의 모든 좌표 순회
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                graph[y][x] = 1; // 직사각형 부분을 1로 표시
            }
        }
    }

    // 상하좌우
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    // DFS로 영역의 넓이 계산
    function dfs(x, y) {
        // 탐색할 위치를 순서대로 저장
        const stack = [[x, y]];
        // 시작 위치를 방문 처리 -> 다시 방문 못하게
        visited[x][y] = true; 
        // 현재 영역의 넓이를 계산하는 변수
        let areaSize = 1;

        while (stack.length > 0) {
            // 현재 위치
            const [curX, curY] = stack.pop();

            // 상하좌우로 이동하면서 새로운 좌표 계산
            for (const [dx, dy] of directions) {
                const newX = curX + dx;
                const newY = curY + dy;

                // 새로운 위치가 범위 내에 있고, 방문하지 않은 공간인 경우
                if (newX >= 0 && newX < M && newY >= 0 && newY < N && graph[newX][newY] === 0 && !visited[newX][newY]) {
                    visited[newX][newY] = true; // 방문 처리
                    stack.push([newX, newY]);
                    areaSize++; // 영역 넓이 증가
                }
            }
        }
        return areaSize; // 최종으로 계산된 영역의 넓이 
    }

    const areas = []; // 각 영역의 넓이를 저장할 배열
    let areaCount = 0; // 영역의 개수

    // 전체 순회하면서 새로운 빈 영역 발견하면 dfs 호출
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (graph[i][j] === 0 && !visited[i][j]) {
                const areaSize = dfs(i, j); // 새로운 영역의 넓이 계산
                areas.push(areaSize); // 넓이를 배열에 추가
                areaCount++; // 새로운 영역 발견하면 증가
            }
        }
    }

    // 오름차순으로 정렬 
    areas.sort((a, b) => a - b);
    console.log(areaCount); // 영역 개수 출력
    console.log(areas.join(' ')); // 각 영역의 넓이 출력
    process.exit();
});
