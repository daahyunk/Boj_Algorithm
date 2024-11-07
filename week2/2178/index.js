const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
    // 첫째줄에서 N과 M을 가져옴, 나머지 줄을 2차원 배열로 변환
    const [N, M] = input.shift().split(' ').map(Number);
    const maze = input.map((row) => row.split('').map(Number));

    // 방문 기록하는 배열 생성
    const visited = Array.from({ length: N }, () => Array(M).fill(0));
    
    // 상하좌우 배열
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    // BFS 탐색 함수 
    // (startX, startY) 위치에서부터 탐색 시작
    // startX는 시작 행, startY는 시작 열
    function bfs(startX, startY) {
        // queue에 탐색할 위치를 순서대로 저장
        // 첫번쨰로 startX, startY 좌표를 큐에 넣어 시작 위치 탐색할 준비
        const queue = [[startX, startY]];
        // 시작 위치 1로 설정 -> 시작점에서 한 칸 이동한 상태
        visited[startX][startY] = 1;  

        // 탐색 시작
        while (queue.length) {
            // 현재 위치
            const [x, y] = queue.shift();

            // 상하좌우 탐색
            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;

                // 이동 가능한지 확인
                // 미로 범위 내에 있어야 하고, 이동 가능한 칸이며, 아직 방문하지 않은 경우만 이동
                if (nx >= 0 && nx < N && ny >= 0 && ny < M && maze[nx][ny] === 1 && visited[nx][ny] === 0) {
                    visited[nx][ny] = visited[x][y] + 1; // 이동 횟수 기록
                    queue.push([nx, ny]); // 큐에 다음 위치 추가
                }
            }
        }
    }

    // (0, 0)에서 시작해 (N-1, M-1)까지의 최단 경로 탐색
    bfs(0, 0);

    // 도착 위치까지의 이동 칸 수 출력
    console.log(visited[N - 1][M - 1]);
    process.exit();
});
