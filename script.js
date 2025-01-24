const categoryItems = document.querySelectorAll('.category-item');
const 뽑기박스 = document.getElementById(' 뽑기박스 ');
const resultArea = document.getElementById('result');
const resultHistoryArea = document.getElementById('result-history');
const categoryFruits = {
    rule: ['원딜전(악몽)', '강제전', '신세계 보상치기', '변질된 악몽', '인생의 고도', '랜덤 유닛전', '너의 상위는'], // "오늘의 룰" 카테고리
    random: ['Easy', 'Normal', 'Hard', 'Very Hard', 'Impossible'], // "랜덤 초불영제" 카테고리
    gamble: { min: 1, max: 10 }, // "인생의 고도(5+)" 카테고리
    rank: { min: 0, max: 4 } // "너의 상위는" 카테고리
};

let currentCategory = null;
let spinningInterval;
let resultHistory = [];

categoryItems.forEach(item => {
    item.addEventListener('click', function() {
        categoryItems.forEach(otherItem => otherItem.classList.remove('selected'));
        this.classList.add('selected');
        currentCategory = this.dataset.category;
        뽑기박스.classList.add('show');
        resultArea.textContent = '';
        clearInterval(spinningInterval);
        console.log(`카테고리 선택: ${currentCategory}`);
    });
});

뽑기박스.addEventListener('click', function() {
    if (!currentCategory) {
        alert('먼저 카테고리를 선택해주세요!');
        return;
    }

    clearInterval(spinningInterval);
    resultArea.textContent = '';

    let spinCount = 0;
    const totalSpins = 15;
    const spinDuration = 100;
    const categoryData = categoryFruits[currentCategory]; // 카테고리 데이터 가져오기 (배열 또는 범위 객체)
    let selectedItem; // 뽑힐 아이템을 저장할 변수

    console.log("선택된 카테고리 데이터:", categoryData); // ★ 추가: categoryData 로그 출력

    spinningInterval = setInterval(function() {
        if (Array.isArray(categoryData)) { // ★ 배열인 경우 (기존 방식 - 문자열 뽑기)
            const randomIndex = Math.floor(Math.random() * categoryData.length);
            selectedItem = categoryData[randomIndex]; // 배열에서 랜덤 아이템 선택
        } else if (typeof categoryData === 'object' && categoryData.min !== undefined && categoryData.max !== undefined) { // ★ 범위 객체인 경우 (숫자 범위 뽑기)
            const min = categoryData.min;
            const max = categoryData.max;
            selectedItem = Math.floor(Math.random() * (max - min + 1)) + min; // min ~ max 범위의 랜덤 정수 생성
            console.log("랜덤 숫자 생성:", selectedItem); // ★ 추가: 생성된 랜덤 숫자 로그 출력
        } else { // ★ 예외 처리 (잘못된 카테고리 데이터)
            selectedItem = '오류'; // 또는 다른 기본값 설정
            console.error('잘못된 카테고리 데이터:', categoryData); // 콘솔에 에러 로그 출력
            clearInterval(spinningInterval); // 애니메이션 중지 (에러 발생 시)
            return; // setInterval 함수 종료
        }
        resultArea.textContent = selectedItem; // 선택된 아이템 (문자열 또는 숫자) 결과 영역에 표시
        spinCount++;

        if (spinCount >= totalSpins) {
            clearInterval(spinningInterval);

            let finalFruit;
            if (Array.isArray(categoryData)) { // 최종 결과 선택 (배열인 경우 - 기존 방식)
                const finalRandomIndex = Math.floor(Math.random() * categoryData.length);
                finalFruit = categoryData[finalRandomIndex];
                console.log(`[최종 결과] 최종 랜덤 인덱스: ${finalRandomIndex}, 최종 선택된 항목: ${finalFruit}`); // ★ 추가: 최종 선택된 항목 출력
            } else if (typeof categoryData === 'object' && categoryData.min !== undefined && categoryData.max !== undefined) { // 최종 결과 선택 (범위 객체인 경우 - 숫자 범위)
                const min = categoryData.min;
                const max = categoryData.max;
                finalFruit = Math.floor(Math.random() * (max - min + 1)) + min; // min ~ max 범위의 랜덤 정수 생성
                console.log(`[최종 결과] 최종 랜덤 숫자: ${finalFruit}`); // ★ 추가: 최종 랜덤 숫자 로그 출력
            } else { // 예외 처리 (잘못된 카테고리 데이터)
                finalFruit = '오류';
            }

            resultHistory.push(finalFruit);
            updateResultHistoryDisplay();

            setTimeout(function() {
                resultArea.textContent = finalFruit;
                console.log("결과 표시:", finalFruit, resultArea); // ★ 추가: 최종 결과 및 resultArea 로그 출력
            }, 200);
        }
    }, spinDuration);
});

function updateResultHistoryDisplay() {
    const maxHistoryCount = 8; // ★ 표시할 최대 결과 개수 (원하는 개수로 조절)
    const recentHistory = resultHistory.slice(-maxHistoryCount); // 최근 maxHistoryCount 개의 결과만 추출

    let historyText = "결과: ";
    if (recentHistory.length > 0) {
        historyText += recentHistory.join(', ');
    }

    resultHistoryArea.textContent = historyText; // #result-history 요소 내용 업데이트!

    // ★ 스크롤 기능 추가 (선택 사항) - HTML 구조 변경 필요
    if (resultHistory.length > maxHistoryCount) {
        resultHistoryArea.classList.add('scrollable-history'); // CSS 스크롤 스타일 적용 클래스 추가
        resultHistoryArea.innerHTML = `<p>결과:</p><div class="history-scroll-area">${recentHistory.join(', ')}</div>`; // HTML 구조 변경
    } else {
        resultHistoryArea.classList.remove('scrollable-history'); // 스크롤 스타일 제거
        resultHistoryArea.textContent = historyText; // 기존 텍스트 방식 유지
    }
}