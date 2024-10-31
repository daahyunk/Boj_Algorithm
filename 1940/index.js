const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  // 한 줄 입력을 받아 배열에 저장
}).on('close', function() {
    const N = parseInt(input[0]);
    const M = parseInt(input[1]);
    const materials = input[2].split(' ').map(Number);

    materials.sort((a, b) => a - b);

    let left = 0;
    let right = N - 1;
    let count = 0;

    while (left < right) {
        const sum = materials[left] + materials[right];
        
        if (sum === M) {
            count++;          
            left++;        
            right--;
        } else if (sum < M) {
            left++;           
        } else {
            right--;        
        }
    }

    console.log(count);
    process.exit();
});
