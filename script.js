const categoryItems = document.querySelectorAll('.category-item'); // 카테고리 아이템들 선택
const 뽑기박스 = document.getElementById(' 뽑기박스 '); // 뽑기 버튼 선택
const resultArea = document.getElementById('result'); // 결과 영역 선택

const categoryFruits = { // 카테고리별 과일 목록
    breakfast: ['토스트', '오트밀', '요거트', '과일', '시리얼', '샌드위치', '스크램블 에그'],
    lunch: ['김치찌개', '비빔밥', '파스타', '샐러드', '샌드위치', '라면', '볶음밥'],
    dinner: ['스테이크', '파스타', '초밥', '피자', '샐러드', '닭볶음탕', '삼겹살']
};

let currentCategory = null; // 현재 선택된 카테고리 저장 변수
let spinningInterval; // setInterval 저장 변수

categoryItems.forEach(item => { // 각 카테고리 아이템에 이벤트 리스너 추가
    item.addEventListener('click', function() {
        categoryItems.forEach(otherItem => otherItem.classList.remove('selected')); // 다른 카테고리 선택 효과 제거
        this.classList.add('selected'); // 현재 카테고리 선택 효과 (선택 사항, CSS 스타일 변경 필요)
        currentCategory = this.dataset.category; // data-category 속성 값 가져와 currentCategory 에 저장
        뽑기박스.classList.add('show'); // 뽑기 버튼 보이게
        resultArea.textContent = ''; // 결과 영역 초기화
        clearInterval(spinningInterval); // 이전 애니메이션 중지
        console.log(`카테고리 선택: ${currentCategory}`); // (선택 사항) 콘솔에 카테고리 로그 출력
    });
});

뽑기박스.addEventListener('click', function() { // 뽑기 버튼 클릭 이벤트 리스너
    if (!currentCategory) { // 카테고리 선택 안 된 경우
        alert('먼저 카테고리를 선택해주세요!'); // 경고 메시지 표시 (선택 사항)
        return; // 함수 종료
    }

    clearInterval(spinningInterval); // 이전 애니메이션 중지
    resultArea.textContent = ''; // 결과 영역 초기화

    let spinCount = 0;
    const totalSpins = 15;
    const spinDuration = 100;
    const selectedFruits = categoryFruits[currentCategory]; // 현재 카테고리에 맞는 과일 목록 가져오기

    spinningInterval = setInterval(function() {
        const randomIndex = Math.floor(Math.random() * selectedFruits.length);
        resultArea.textContent = selectedFruits[randomIndex];
        spinCount++;

        if (spinCount >= totalSpins) {
            clearInterval(spinningInterval);

            const finalRandomIndex = Math.floor(Math.random() * selectedFruits.length);
            const finalFruit = selectedFruits[finalRandomIndex];

            setTimeout(function() {
                resultArea.textContent = finalFruit;
            }, 200);
        }
    }, spinDuration);
});