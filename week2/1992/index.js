const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line.trim());  
}).on('close', function () {
    // 영상 크기
    const N = Number(input[0]);
    // 두번째줄부터 마지막줄까지 데이터를 2차원 배열로 변환
    const video = input.slice(1).map(row => row.split('').map(Number)); 
    
    // 쿼드 트리 함수 -> (x,y) 위치에서 시작하는 sizexsize 영역을 압축해서 결과 반환
    function quadTree(x, y, size) {
        // 현재 구역이 모두 같은 값인지 확인하기 위한 첫 번째 값
        const startValue = video[x][y];
        
        // 현재 구역의 모든 값이 같은지 확인
        let allSame = true;
        for (let i = x; i < x + size; i++) {
            for (let j = y; j < y + size; j++) {
                if (video[i][j] !== startValue) {
                    allSame = false;
                    break;
                }
            }
            if (!allSame) break;
        }
        
        // 현재 구역이 모두 같은 값 -> 해당 값을 문자열로 반환
        if (allSame) {
            return String(startValue);
        }
        
        // 값이 섞여 있으면 4등분하여 재귀 호출
        const half = size / 2;
        const topLeft = quadTree(x, y, half);            // 왼쪽 위
        const topRight = quadTree(x, y + half, half);     // 오른쪽 위
        const bottomLeft = quadTree(x + half, y, half);   // 왼쪽 아래
        const bottomRight = quadTree(x + half, y + half, half); // 오른쪽 아래
        
        // 4개의 결과를 괄호로 묶어 반환
        return `(${topLeft}${topRight}${bottomLeft}${bottomRight})`;
    }

    console.log(quadTree(0, 0, N));
    process.exit();
});
