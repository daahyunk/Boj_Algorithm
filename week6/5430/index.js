const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on("line", (line) => {
    input.push(line.trim());
}).on("close", () => {
    const T = Number(input.shift()); // 테스트 케이스 개수

    for (let t = 0; t < T; t++) {
        const commands = input.shift(); // 함수 명령어
        const n = Number(input.shift()); // 배열 길이
        let array = JSON.parse(input.shift()); // 배열

        let isReverse = false; // 뒤집힘 여부 플래그
        let isError = false; // 에러 여부 플래그

        for (let i = 0; i < commands.length; i++) {
            if (commands[i] === "R") {
                isReverse = !isReverse; // 뒤집힘 상태 토글
            } else if (commands[i] === "D") {
                if (array.length === 0) {
                    isError = true; // 배열이 비었으면 에러
                    break;
                }
                if (isReverse) {
                    array.pop(); // 뒤집힌 상태 -> 뒤에서 제거
                } else {
                    array.shift(); // 정상 상태 -> 앞에서 제거
                }
            }
        }

        if (isError) {
            console.log("error");
        } else {
            if (isReverse) {
                array.reverse(); // 최종 상태에서 뒤집기
            }
            console.log(`[${array.join(",")}]`);
        }
    }
    process.exit();
});
