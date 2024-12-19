const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
    const [N, K] = input.shift().split(' ').map(Number);
    const words = input.map(word => word.trim());

    // 필수 문자
    const essential = ['a', 'n', 't', 'i', 'c'];
    const essentialMask = essential.reduce((acc, char) => acc | (1 << (char.charCodeAt() - 97)), 0);

    // K가 5보다 작으면 읽을 수 있는 단어 없음
    if (K < 5) {
        console.log(0);
        return;
    }

    // K가 26이면 모든 단어를 읽을 수 있음
    if (K === 26) {
        console.log(N);
        return;
    }

    // 각 단어를 비트마스크로 변환
    const wordMasks = words.map(word => {
        let mask = 0;
        for (const char of word) {
            mask |= (1 << (char.charCodeAt() - 97));
        }
        return mask;
    });

    // 후보 문자 (필수 문자를 제외한 나머지 알파벳)
    const candidates = [];
    for (let i = 0; i < 26; i++) {
        if (!(essentialMask & (1 << i))) {
            candidates.push(i);
        }
    }

    let maxReadable = 0;

    // 조합 생성 함수
    function combine(start, count, mask) {
        if (count === 0) {
            let readableCount = 0;

            // 모든 단어를 확인하며 읽을 수 있는지 검사
            for (const wordMask of wordMasks) {
                if ((wordMask & mask) === wordMask) {
                    readableCount++;
                }
            }

            maxReadable = Math.max(maxReadable, readableCount);
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            combine(i + 1, count - 1, mask | (1 << candidates[i]));
        }
    }

    // 조합 시작 (K - 5개의 문자를 선택)
    combine(0, K - 5, essentialMask);

    console.log(maxReadable);
});