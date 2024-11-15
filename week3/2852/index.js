const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

readline.on('line', function(line) {
    input.push(line);  // 각 줄의 입력을 배열에 저장
}).on('close', function () {
    // 첫 줄은 득점 횟수
    const n = Number(input[0]); 
    // nums는 각 득점 정보를 담고 있음
    // team과 time을 배열 형태로 변환해서 저장
    const nums = input.slice(1).map((line) => {
        const [team, time] = line.split(" ");
        return [Number(team), time];
    });

    // A, B는 각 팀의 득점 횟수
    // aSum, bSum은 각 팀의 리드 시간
    // prev는 이전 득점 시점 -> 각 득점 시점 사이의 시간을 계산하기 위해 필요
    let A = 0, B = 0, aSum = 0, bSum = 0, prev = 0;

    // 각 득점 정보를 순회하면서 시간 계산
    for (let i = 0; i < n; i++) {
         // curScore는 득점한 팀 번호
        const curScore = nums[i][0];
        // curTime은 득점 시점을 초 단위로 변환한 값
        const curTime = changeToSeconds(nums[i][1]); 

        if (A > B) {
            aSum += curTime - prev; // 팀 1이 리드 중이면 해당 시간만큼 팀 1의 리드 시간에 누적
        } else if (B > A) {
            bSum += curTime - prev;  // 팀 2가 리드 중이면 해당 시간만큼 팀 2의 리드 시간에 누적
        }

         // 득점한 팀에 따라 A 또는 B를 증가
        curScore === 1 ? A++ : B++;
        prev = curTime;
    }

    // 경기 종료 후 마지막 리드 시간 누적
    const totalGameTime = 48 * 60;
    if (A > B) {
        aSum += totalGameTime - prev; // 팀 1이 리드 중이면 남은 시간 모두 팀 1의 리드 시간에 누적
    } else if (B > A) {
        bSum += totalGameTime - prev; // 팀 2가 리드 중이면 남은 시간 모두 팀 2의 리드 시간에 누적
    }

    // 결과 출력
    console.log(changeToMMSS(aSum));
    console.log(changeToMMSS(bSum));

    process.exit();
});

// MM:SS를 초 단위로 변환
function changeToSeconds(time) {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
}

// 초 단위 시간을 MM:SS 로 변환
function changeToMMSS(seconds) {
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
}
