const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
   // R: 행 개수, C: 열 개수
    let [R, C] = input[0].split(" ").map(Number);

    // 보드 초기화
    let board = new Array(R);
    for (let i = 0; i < R; i++) {
    board[i] = input[i + 1].trim().split("");
    }

    // 알파벳 방문 여부를 기록하는 배열
    let visit = new Array(26).fill(false);

    // 결과값
    let ans = 0;

    // 방향 배열 (상, 하, 좌, 우)
    let dx = [0, 0, 1, -1];
    let dy = [1, -1, 0, 0];

    // DFS 함수 정의
    function DFS(x, y, cnt) {
    // 현재까지의 최대 경로 길이 갱신
    ans = Math.max(ans, cnt);

    // 상하좌우 탐색
    for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        // 보드 범위 내에 있고, 방문하지 않은 알파벳이라면
        if (nx >= 0 && ny >= 0 && nx < R && ny < C) {
        let charIndex = board[nx][ny].charCodeAt() - 65;
        if (!visit[charIndex]) {
            visit[charIndex] = true; // 방문 처리
            DFS(nx, ny, cnt + 1);   // 재귀 호출
            visit[charIndex] = false; // 백트래킹 (방문 해제)
        }
        }
    }
    }

    // 시작 위치 방문 처리
    visit[board[0][0].charCodeAt() - 65] = true;

    // DFS 시작
    DFS(0, 0, 1);

    // 결과 출력
    console.log(ans);
});