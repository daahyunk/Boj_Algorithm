const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  
}).on('close', function() {
    const n = Number(input[0]);
    const parentInfo = input[1].split(' ').map(Number);
    const eraseNode = Number(input[2]);

    // 트리 구조를 표현하기 위한 배열을 초기화
    const tree = Array.from({ length: n }, () => []);
    let rootNode;

    // 트리 생성
    parentInfo.forEach((parentNode, idx) => {
        if (parentNode === -1) {
            rootNode = idx;  // 루트 노드 설정
        } else {
            tree[parentNode].push(idx);  // 부모 노드에 자식 노드 추가
        }
    });

    // 지울 노드가 루트 노드인 경우 리프 노드는 0개
    if (rootNode === eraseNode) {
        console.log(0);
        return;
    }

    // DFS를 이용해 리프 노드의 개수를 세는 함수
    const dfs = (node) => {
        if (!tree[node].length) return 1; // 자식이 없는 경우 리프 노드

        let leafCount = 0;
        tree[node].forEach((child) => {
            if (child !== eraseNode) {
                leafCount += dfs(child); // 지우려는 노드가 아니면 재귀 탐색
            }
        });

        // 자식을 모두 지운 후 리프가 된 경우 처리
        return leafCount === 0 ? 1 : leafCount;
    };

    console.log(dfs(rootNode));
    process.exit();
});