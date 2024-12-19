const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function (line) {
    input.push(line);
}).on('close', function () {
    // 첫 번째 줄에 있는 식재료의 개수
    const N = Number(input[0]);
    const [mp, mf, ms, mv] = input[1].split(' ').map(Number);
    const ingredients = input.slice(2).map(line => line.split(' ').map(Number));

    let minCost = Infinity;
    let bestCombination = [];

    const backtrack = (index, protein, fat, carb, vitamin, cost, selected) => {
        // 조건을 만족하면 결과를 업데이트
        if (protein >= mp && fat >= mf && carb >= ms && vitamin >= mv) {
            if (cost < minCost || (cost === minCost && selected.join(' ') < bestCombination.join(' '))) {
                minCost = cost;
                bestCombination = [...selected];
            }
        }

        // 백트래킹 종료 조건
        if (index === N) return;

        // 현재 재료를 선택하지 않는 경우
        backtrack(index + 1, protein, fat, carb, vitamin, cost, selected);

        // 현재 재료를 선택하는 경우
        const [p, f, s, v, c] = ingredients[index];
        selected.push(index + 1); // 재료 번호는 1부터 시작
        backtrack(index + 1, protein + p, fat + f, carb + s, vitamin + v, cost + c, selected);
        selected.pop(); // 선택 취소 (다음 탐색을 위해)
    };

    // 백트래킹 시작
    backtrack(0, 0, 0, 0, 0, 0, []);

    // 결과 출력
    if (minCost === Infinity) {
        console.log(-1);
    } else {
        console.log(minCost);
        console.log(bestCombination.join(' '));
    }

    process.exit();
});
