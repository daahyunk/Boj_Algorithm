const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
    const ans = [];

    for (let text of input) {
        const stack = [];  // 괄호를 저장할 스택
        let isCompare = true;  // 균형 여부를 판단할 변수

        if (text === ".") break;  // . 입력되면 종료

        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            // 여는 괄호일 경우 스택에 추가
            if (char === "[" || char === "(") {
                stack.push(char);
            }
            // 닫는 대괄호일 경우
            else if (char === "]") {
                if (stack[stack.length - 1] === "[") {
                    stack.pop();  // 대괄호 짝이 맞으면 스택에서 제거
                } else {
                    isCompare = false;  // 짝이 안 맞으면 불균형
                    break;
                }
            }
            // 닫는 소괄호일 경우
            else if (char === ")") {
                if (stack[stack.length - 1] === "(") {
                    stack.pop();  // 소괄호 짝이 맞으면 스택에서 제거
                } else {
                    isCompare = false;  // 짝이 안 맞으면 불균형
                    break;
                }
            }
        }

        // 스택이 비어있고 모든 조건을 만족하면 균형 잡힘
        if (stack.length > 0 || !isCompare) {
            ans.push("no");
        } else {
            ans.push("yes");
        }
    }

    console.log(ans.join("\n"));
    process.exit();
});