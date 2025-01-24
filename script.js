const 뽑기박스 = document.getElementById('뽑기박스');
const resultArea = document.getElementById('result');
const fruits = ['사과', '바나나', '딸기', '오렌지', '포도', '수박', '키위'];

let spinningInterval; // setInterval을 저장할 변수

뽑기박스.addEventListener('click', function() {
    clearInterval(spinningInterval); // 혹시 이전 애니메이션이 실행 중이면 중지

    resultArea.textContent = ''; // 결과 영역 초기화 (애니메이션 시작 전에 비워줌)

    let spinCount = 0; // 스핀 횟수 카운트
    const totalSpins = 15; // 총 스핀 횟수 (조절 가능)
    const spinDuration = 100; // 스핀 간격 (ms, 작을수록 빠름)

    spinningInterval = setInterval(function() {
        const randomIndex = Math.floor(Math.random() * fruits.length);
        resultArea.textContent = fruits[randomIndex]; // 랜덤 과일 이름으로 결과 영역 텍스트 변경
        spinCount++;

        if (spinCount >= totalSpins) { // 총 스핀 횟수만큼 반복 후 멈춤
            clearInterval(spinningInterval); // setInterval 중지

            // 최종 결과 과일 선택 (기존 로직과 동일)
            const finalRandomIndex = Math.floor(Math.random() * fruits.length);
            const finalFruit = fruits[finalRandomIndex];

            setTimeout(function() { // 약간의 딜레이 후 최종 결과 표시 (선택 사항)
                resultArea.textContent = finalFruit; // 최종 과일 이름으로 결과 영역 텍스트 설정
                // 여기에 애니메이션 끝난 후 추가 동작 (예: 효과음, 클래스 추가 등) 넣을 수 있음
            }, 200); // 0.2초 딜레이 (선택 사항, 없애도 됨)
        }
    }, spinDuration);
});