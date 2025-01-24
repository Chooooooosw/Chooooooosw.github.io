const categoryItems = document.querySelectorAll('.category-item');
const 뽑기박스 = document.getElementById(' 뽑기박스 ');
const resultArea = document.getElementById('result');
const resultHistoryArea = document.getElementById('result-history');
const categoryFruits = {
    rule: [
        { name: '원딜전(악몽)' },
        { name: '강제전' },
        { name: '신세계 보상치기' },
        { name: '변질된 악몽' },
        { name: '인생의 고도' }
    ],
    random: [
        '나미 초월', '로빈 초월', '타시기 초월', '도플라밍고 초월', '루치 초월',
        '조로 초월', '루피 초월', '루피-기어포스', '티치 초월', '바질 초월',
        '키자루 초월', '브룩 초월', '사보 초월', '상디 초월', '샹크스 초월',
        '시라호시 초월', '료쿠규 초월', '아카이누 초월', '야마토 초월', '우솝 초월',
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
    rank: { min: 0, max: 4 }
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
        const categoryName = this.textContent;
        뽑기박스.textContent = `${categoryName} 뽑기`;
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
    const categoryData = categoryFruits[currentCategory];
    let selectedItem;

    console.log("선택된 카테고리 데이터:", categoryData);

    spinningInterval = setInterval(function() {
        if (Array.isArray(categoryData)) {
            const randomIndex = Math.floor(Math.random() * categoryData.length);
            if (typeof categoryData[randomIndex] === 'object' && categoryData[randomIndex].name) {
                selectedItem = categoryData[randomIndex].name;
            } else {
                selectedItem = categoryData[randomIndex];
            }
        } else if (typeof categoryData === 'object' && categoryData.min !== undefined && categoryData.max !== undefined) {
            const min = categoryData.min;
            const max = categoryData.max;
            selectedItem = Math.floor(Math.random() * (max - min + 1)) + min;
            console.log("랜덤 숫자 생성:", selectedItem);
        } else {
            selectedItem = '오류';
            console.error('잘못된 카테고리 데이터:', categoryData);
            clearInterval(spinningInterval);
            return;
        }
        resultArea.textContent = selectedItem;
        spinCount++;

        if (spinCount >= totalSpins) {
            clearInterval(spinningInterval);

            let finalFruit;
            if (Array.isArray(categoryData)) {
                const finalRandomIndex = Math.floor(Math.random() * categoryData.length);
                if (typeof categoryData[finalRandomIndex] === 'object' && categoryData[finalRandomIndex].name) {
                    finalFruit = categoryData[finalRandomIndex].name;
                } else {
                    finalFruit = categoryData[finalRandomIndex];
                }
                console.log(`[최종 결과] 최종 랜덤 인덱스: ${finalRandomIndex}, 최종 선택된 항목: ${finalFruit}`);
            } else if (typeof categoryData === 'object' && categoryData.min !== undefined && categoryData.max !== undefined) {
                const min = categoryData.min;
                const max = categoryData.max;
                finalFruit = Math.floor(Math.random() * (max - min + 1)) + min;
                console.log(`[최종 결과] 최종 랜덤 숫자: ${finalFruit}`);
            } else {
                finalFruit = '오류';
            }

            resultHistory.push(finalFruit);
            updateResultHistory();

            setTimeout(function() {
                resultArea.textContent = finalFruit;
                console.log("결과 표시:", finalFruit, resultArea);
            }, 200);
        }
    }, spinDuration);
});

function updateResultHistory() {
    let historyText = "결과: ";
    if (resultHistory.length > 0) {
        historyText += resultHistory.join(', ');
        historyText = "결과: " + resultHistory.join(', ');
    }
    resultHistoryArea.textContent = historyText;
}