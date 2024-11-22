const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
    const [H, W] = input[0].split(' ').map(Number);
    const map = input.slice(1).map(line => line.split(''));
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let maxDistance = 0;

    // BFS 함수 정의
    const bfs = (startX, startY) => {
        const queue = [[startX, startY, 0]]; // [x, y, 거리]
        const visited = Array.from({ length: H }, () => Array(W).fill(false));
        visited[startX][startY] = true;
        let maxLocal = 0;

        while (queue.length) {
            const [x, y, dist] = queue.shift();
            maxLocal = Math.max(maxLocal, dist);

            for (const [dx, dy] of directions) {
                const nx = x + dx, ny = y + dy;
                if (nx >= 0 && nx < H && ny >= 0 && ny < W && !visited[nx][ny] && map[nx][ny] === 'L') {
                    visited[nx][ny] = true;
                    queue.push([nx, ny, dist + 1]);
                }
            }
        }
        return maxLocal;
    };

    // 모든 'L'에서 BFS 실행
    for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
            if (map[i][j] === 'L') {
                maxDistance = Math.max(maxDistance, bfs(i, j));
            }
        }
    }

    console.log(maxDistance);
    process.exit();
});