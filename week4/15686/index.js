const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
    const [N, M] = input[0].split(' ').map(Number);
    const city = input.slice(1).map(line => line.split(' ').map(Number));

    const houses = [];
    const chickens = [];
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (city[i][j] === 1) houses.push([i, j]);
            if (city[i][j] === 2) chickens.push([i, j]);
        }
    }

    const getDistance = (h, c) => Math.abs(h[0] - c[0]) + Math.abs(h[1] - c[1]);

    // 조합 함수
    const combination = (arr, m) => {
        const results = [];
        if (m === 1) return arr.map(el => [el]);
        arr.forEach((fixed, idx, origin) => {
            const rest = origin.slice(idx + 1);
            const combos = combination(rest, m - 1);
            const attached = combos.map(combo => [fixed, ...combo]);
            results.push(...attached);
        });
        return results;
    };

    const chickenCombos = combination(chickens, M);

    let minDistance = Infinity;
    for (const combo of chickenCombos) {
        let cityDistance = 0;
        for (const house of houses) {
            const distances = combo.map(chicken => getDistance(house, chicken));
            cityDistance += Math.min(...distances);
        }
        minDistance = Math.min(minDistance, cityDistance);
    }

    console.log(minDistance);
    process.exit();
});