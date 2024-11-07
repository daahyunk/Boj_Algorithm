const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line.trim());  
}).on('close', function() {
    // 지역 크기 N
    const N = Number(input[0]); 
    // input 배열의 두번째줄 부터 마지막줄까지 가져와서 숫자로 변환
    // 각 지점의 높이
    const heights = input.slice(1).map(line => line.split(' ').map(Number)); 
    
    // 상하좌우 배열
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    // 최대 안전 영역 개수 변수
    let maxSafeAreas = 0;

    // x, y 위치에서 시작해 높이 h 이하의 지점이 물에 잠겼을 때 물에 잠기지 않은 영역을 dfs 방식으로 탐색
    // 중복 탐색 안 하게 visited 배열 사용
    function dfs(x, y, h, visited) {
        // 스택에 시작 위치 추가
        const stack = [[x, y]];
        // 시작 위치 방문 표시
        visited[x][y] = true;

        while (stack.length > 0) {
            // 현재 위치
            const [currentX, currentY] = stack.pop();

            // dx와 dy는 상하좌우 이동을 의미, newX와 newY는 이동한 새 위치
            for (const [dx, dy] of directions) {
                const newX = currentX + dx;
                const newY = currentY + dy;

                // 새로운 위치가 범위 내에 있고, 물에 잠기지 않았으며 방문하지 않은 경우
                if (newX >= 0 && newX < N && newY >= 0 && newY < N && heights[newX][newY] > h && !visited[newX][newY]) {
                    visited[newX][newY] = true;
                    stack.push([newX, newY]);
                }
            }
        }
    }

    // 높이 0부터 100까지 조정해가면서 모든 높이에 대해 안전 영역 계산
    for (let h = 0; h <= 100; h++) {
        // 현재 높이 h에서 방문 여부를 알게 해주는 NxN 2차원 배열 생성
        const visited = Array.from({ length: N }, () => Array(N).fill(false));
        // 현재 높이에서 안전 영역 개수
        let safeAreas = 0; 

        // heights 배열 순회 -> 물에 안 잠긴 지점 찾고, 방문하지 않은 위치에서 dfs 함수 호출
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                // 해당 지점이 물에 잠기지 않고 아직 방문하지 않은 경우 새로운 안전 영역 시작
                if (heights[i][j] > h && !visited[i][j]) {
                    dfs(i, j, h, visited);
                    safeAreas++; // 새로운 안전 영역 발견 -> 안전 영역 개수 증가
                }
            }
        }

        // safeAreas는 현재 높이에서 안전 영역 개수
        // maxSafeAreas와 비교해 더 큰 값을 저장
        maxSafeAreas = Math.max(maxSafeAreas, safeAreas);
    }

    console.log(maxSafeAreas);
    process.exit();
});
