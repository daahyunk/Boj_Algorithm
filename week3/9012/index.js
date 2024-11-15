const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);
}).on('close', function() {
    const caseCount = Number(input[0]);
    
    for (let i = 1; i <= caseCount; i += 1) {
        const cases = input[i];
        const stack = [];
        let result = 'YES';

        for (let j = 0; j < cases.length; j += 1) {
            if (cases[j] === '(') {
                stack.push(1);  // 여는 괄호 나오면 스택에 1 추가
            } else {
                // 닫는 괄호가 나왔는데 스택이 비어 있으면 NO로 설정하고 멈춤
                if (!stack.pop()) {
                    result = 'NO';
                    break;
                } 
            }
        }

        // 반복문이 끝났는데 스택이 비어 있지 않으면 여는 괄호가 남은 상태니까 NO
        if (stack.length !== 0) {
            result = 'NO';
        }

        console.log(result);
    }

    process.exit();
});
