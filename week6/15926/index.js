const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on("line", (line) => {
    input.push(line.trim());
}).on("close", () => {
    const n = Number(input[0]); // 문자열 길이
    const brackets = input[1]; // 괄호 문자열

    let maxLength = 0; // 가장 긴 올바른 괄호 문자열의 길이
    let open = 0, close = 0; // 여는 괄호, 닫는 괄호 개수

    // 왼쪽에서 오른쪽으로 스캔
    for (let i = 0; i < n; i++) {
        if (brackets[i] === '(') {
            open++;
        } else {
            close++;
        }

        if (open === close) {
            maxLength = Math.max(maxLength, open + close);
        } else if (close > open) {
            open = 0;
            close = 0;
        }
    }

    // 오른쪽에서 왼쪽으로 스캔
    open = 0;
    close = 0;
    for (let i = n - 1; i >= 0; i--) {
        if (brackets[i] === '(') {
            open++;
        } else {
            close++;
        }

        if (open === close) {
            maxLength = Math.max(maxLength, open + close);
        } else if (open > close) {
            open = 0;
            close = 0;
        }
    }

    console.log(maxLength);
    process.exit();
});
