const categoryItems = document.querySelectorAll('.category-item');
const 뽑기박스 = document.getElementById(' 뽑기박스 ');
const resultArea = document.getElementById('result');
const resultHistoryArea = document.getElementById('result-history'); // 결과 기록 영역 요소 선택!
const categoryFruits = {
    breakfast: ['토스트', '오트밀', '요거트', '과일', '시리얼', '샌드위치', '스크램블 에그'],
    lunch: ['김치찌개', '비빔밥', '파스타', '샐러드', '샌드위치', '라면', '볶음밥'],
    dinner: ['스테이크', '파스타', '초밥', '피자', '샐러드', '닭볶음탕', '삼겹살']
};

let currentCategory = null;
let spinningInterval;
let resultHistory = []; // 뽑기 결과 기록을 저장할 배열! (초기화)

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
    const selectedFruits = categoryFruits[currentCategory];

    spinningInterval = setInterval(function() {
        const randomIndex = Math.floor(Math.random() * selectedFruits.length);
        resultArea.textContent = selectedFruits[randomIndex];
        spinCount++;

        if (spinCount >= totalSpins) {
            clearInterval(spinningInterval);

            const finalRandomIndex = Math.floor(Math.random() * selectedFruits.length);
            const finalFruit = selectedFruits[finalRandomIndex];

            // ★ 결과 기록 및 화면 업데이트 부분 ★
            resultHistory.push(finalFruit); // 결과를 history 배열에 추가!
            updateResultHistoryDisplay(); // 결과 기록 화면 업데이트 함수 호출!

            setTimeout(function() {
                resultArea.textContent = finalFruit;
            }, 200);
        }
    }, spinDuration);
});

function updateResultHistoryDisplay() { // 결과 기록 화면 업데이트 함수
    const historyText = "결과: " + resultHistory.join(', '); // 배열 내용을 쉼표로 구분된 문자열로 변환
    resultHistoryArea.textContent = historyText; // #result-history 요소 내용 업데이트!
}