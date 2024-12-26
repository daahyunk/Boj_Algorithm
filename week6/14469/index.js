const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

// 입력 처리
readline.on("line", (line) => {
    input.push(line.trim());
}).on("close", () => {
    const N = Number(input[0]); // 소의 수
    const cows = input.slice(1).map((str) => {
        const [arrival, checkTime] = str.split(" ").map(Number);
        return { arrival, checkTime };
    });

    // 도착 시간을 기준으로 정렬
    cows.sort((a, b) => a.arrival - b.arrival);

    let currentTime = 0; // 현재 시간

    for (const cow of cows) {
        if (currentTime < cow.arrival) {
            // 현재 시간이 도착 시간보다 이르면 기다림
            currentTime = cow.arrival;
        }
        // 검문 시간 추가
        currentTime += cow.checkTime;
    }

    console.log(currentTime);
    process.exit();
});
