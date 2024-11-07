const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];
const gather = ['a', 'e', 'i', 'o', 'u']; // 모음 목록
const allowedStr = ['ee', 'oo']; // 예외 허용 문자열

readline.on('line', function(line) {
    input.push(line);
}).on('close', function () {
    
    // 마지막 입력 "end"를 제외한 모든 단어 검사
    for (let i = 0; i < input.length - 1; i++) {
        const word = input[i]; // 현재 검사할 단어
        let vowelCount = 0;  // 연속된 모음 개수
        let consonantCount = 0; // 연속된 자음 개수
        let isAcceptable = true;  // 현재 단어가 조건을 만족하는지 (기본값은 true)

        // 모음 포함 여부 검사
        if (!gather.some(vowel => word.includes(vowel))) {
            console.log(`<${word}> is not acceptable.`);
            continue;
        }

        // 단어 내 문자 검사
        for (let j = 0; j < word.length; j++) {
            const currentChar = word[j];
            const nextChar = word[j + 1];

            // 연속된 같은 문자 검사 (ee랑 oo는 예외)
            if (currentChar === nextChar && !allowedStr.includes(currentChar + nextChar)) {
                console.log(`<${word}> is not acceptable.`);
                isAcceptable = false;
                break;
            }

            // 모음/자음 연속 검사
            if (gather.includes(currentChar)) { // 현재 문자가 모음인 경우
                consonantCount = 0; // 자음 연속 개수 초기화
                vowelCount++;
                if (vowelCount >= 3) { // 모음 3개 연속이면 비밀번호 불가능
                    console.log(`<${word}> is not acceptable.`);
                    isAcceptable = false;
                    break;
                }
            } else { // 현재 문자가 자음인 경우
                vowelCount = 0; // 모음 연속 개수 초기화
                consonantCount++;
                if (consonantCount >= 3) { // 자음 3개 연속이면 비밀번호 불가능
                    console.log(`<${word}> is not acceptable.`);
                    isAcceptable = false;
                    break;
                }
            }
        }
        
        // 모든 조건을 통과한 경우
        if (isAcceptable) {
            console.log(`<${word}> is acceptable.`);
        }
    }

    process.exit();
});
