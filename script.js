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
    const selectedFruits = categoryFruits[currentCategory];

    spinningInterval = setInterval(function() {
        const randomIndex = Math.floor(Math.random() * selectedFruits.length);
        resultArea.textContent = selectedFruits[randomIndex];
        spinCount++;

        if (spinCount >= totalSpins) {
            clearInterval(spinningInterval);

            const finalRandomIndex = Math.floor(Math.random() * selectedFruits.length);
            const finalFruit = selectedFruits[finalRandomIndex];

            resultHistory.push(finalFruit);
            updateResultHistoryDisplay();

            setTimeout(function() {
                resultArea.textContent = finalFruit;
            }, 200);
        }
    }, spinDuration);
});

function updateResultHistoryDisplay() {
    const historyText = "결과: " + resultHistory.join(', ');
    resultHistoryArea.textContent = historyText;
}