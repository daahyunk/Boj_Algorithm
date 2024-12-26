const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on("line", (line) => {
    input.push(line.trim());
}).on("close", () => {
    const n = Number(input[0]);
    const lectures = input.slice(1).map((str) => {
        const [p, d] = str.split(" ").map(Number);
        return { p, d };
    });

    // 마감일 기준으로 정렬
    lectures.sort((a, b) => a.d - b.d);

    const minHeap = []; // 우선순위 큐 (최소 힙)
    let totalProfit = 0;

    for (const lecture of lectures) {
        // 강연료를 힙에 추가
        minHeap.push(lecture.p);
        totalProfit += lecture.p;

        // 강연 개수가 마감일을 초과하면 가장 작은 강연료 제거
        if (minHeap.length > lecture.d) {
            const minProfit = Math.min(...minHeap); // 최소 강연료
            minHeap.splice(minHeap.indexOf(minProfit), 1); // 힙에서 제거
            totalProfit -= minProfit;
        }
    }

    console.log(totalProfit);
    process.exit();
});
