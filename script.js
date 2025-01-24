const categoryItems = document.querySelectorAll('.category-item');
const 뽑기박스 = document.getElementById(' 뽑기박스 ');
const resultArea = document.getElementById('result');
const resultHistoryArea = document.getElementById('result-history');
const categoryFruits = {
    rule: ['원딜전(악몽)', '강제전', '신세계 보상치기', '변질된 악몽', '인생의 고도', '랜덤 유닛전', '너의 상위는'], // "오늘의 룰" 카테고리 (기존 문자열 배열 방식 유지)
    random: [
        '나미 초월', '로빈 초월', '타시기 초월', '도플라밍고 초월', '루치 초월',
        '조로 초월', '루피 초월', '루피-기어포스', '티치 초월', '바질 초월',
        '키자루 초월', '브룩 초월', '사보 초월', '상디 초월', '샹크스 초월',
        '시라호시 초월', '로쿠규 초월', '아카이누 초월', '야마토 초월', '우솝 초월',
        '보니 초월', '징베 초월', '쵸파 초월', '코비 초월', '아오키지 초월',
        '키드 초월', '로우 초월', '프랑키 초월', '후지토라 초월',
        '로져 불멸', '시키 불멸', '거프 불멸', '드래곤 불멸', '빅 맘 불멸',
        '센고쿠 불멸', '가반 불멸', '레일리 불멸', '흰수염 불멸', '제트 불멸',
        '카이도 불멸',
        '비비 영원함', '니카 영원함', '류마 영원함', '버기 영원함', '핸콕 영원함',
        '우타 영원함', '미호크 영원함', '카벤딧슈 영원함', '오뎅 영원함', '에이스 영원함',
        '레베카 제한됨', '마르코 제한됨', '카타쿠리 제한됨', '시노부 제한됨', '아인 제한됨',
        '알비다 제한됨', '에넬 제한됨', '크로커다일 제한됨', '킹 제한됨', '레드필드 제한됨'
    ],
    gamble: { min: 1, max: 10 },
    rank: { min: 0, max: 4 } // "너의 상위는" 카테고리 - 숫자 범위 지정! (배열 대신 객체)
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
        const categoryName = this.textContent; // 클릭된 카테고리 아이템 텍스트 내용 가져오기
        뽑기박스.textContent = `${categoryName} 뽑기`; // 뽑기 버튼 텍스트 변경 (예: "오늘의 룰 뽑기")
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
            updateResultHistory(); // 함수 이름 변경!
            // updateResultHistoryDisplay(); // 기존 함수 호출 주석 처리 또는 삭제

            setTimeout(function() {
                resultArea.textContent = finalFruit;
                console.log("결과 표시:", finalFruit, resultArea); // ★ 추가: 최종 결과 및 resultArea 로그 출력
            }, 200);
        }
    }, spinDuration);
});

function updateResultHistory() {
    let historyText = "결과: ";
    if (resultHistory.length > 0) {
        historyText += resultHistory.join(', ');
        historyText = "결과: " + resultHistory.join(', '); // 결과 텍스트 생성 (쉼표로 구분)
    }
    resultHistoryArea.textContent = historyText; // 결과 영역 내용 업데이트 (줄바꿈 적용)
}