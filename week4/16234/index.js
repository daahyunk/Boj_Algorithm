const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
    const [N, L, R] = input[0].split(' ').map(Number);
    const map = input.slice(1).map(line => line.split(' ').map(Number));
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    const bfs = (x, y, visited) => {
        const queue = [[x, y]];
        const union = [[x, y]];
        visited[x][y] = true;
        let totalPopulation = map[x][y];

        while (queue.length) {
            const [curX, curY] = queue.shift();

            for (const [dx, dy] of directions) {
                const nx = curX + dx, ny = curY + dy;

                if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[nx][ny]) {
                    const diff = Math.abs(map[curX][curY] - map[nx][ny]);
                    if (diff >= L && diff <= R) {
                        visited[nx][ny] = true;
                        queue.push([nx, ny]);
                        union.push([nx, ny]);
                        totalPopulation += map[nx][ny];
                    }
                }
            }
        }

        // 연합 정보 반환
        return { union, totalPopulation };
    };

    let days = 0;

    while (true) {
        const visited = Array.from({ length: N }, () => Array(N).fill(false));
        let moved = false;

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (!visited[i][j]) {
                    const { union, totalPopulation } = bfs(i, j, visited);
                    if (union.length > 1) {
                        moved = true;
                        const newPopulation = Math.floor(totalPopulation / union.length);
                        for (const [ux, uy] of union) {
                            map[ux][uy] = newPopulation;
                        }
                    }
                }
            }
        }

        if (!moved) break;
        days++;
    }

    console.log(days);
    process.exit();
});