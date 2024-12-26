const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

// 입력 처리
readline.on("line", (line) => {
    input.push(line.trim());
}).on("close", () => {
    const N = Number(input[0]); // 회의 수
    const meetings = input.slice(1).map((line) => {
        const [start, end] = line.split(" ").map(Number);
        return { start, end };
    });

    // 끝나는 시간 기준으로 정렬, 끝나는 시간이 같으면 시작 시간 기준 정렬
    meetings.sort((a, b) => a.end === b.end ? a.start - b.start : a.end - b.end);

    let count = 0; // 배정된 회의 개수
    let currentEndTime = 0; // 현재 회의의 끝나는 시간

    for (const meeting of meetings) {
        if (meeting.start >= currentEndTime) {
            // 현재 회의가 끝난 이후에 시작할 수 있는 회의라면 선택
            count++;
            currentEndTime = meeting.end; // 끝나는 시간 업데이트
        }
    }

    console.log(count); // 최대 회의 개수 출력
    process.exit();
});
