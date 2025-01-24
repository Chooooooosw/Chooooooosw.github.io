const resultImageArea = document.getElementById('result-image');
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
    rule_imageMap: {
        '원딜전(악몽)': '.png',
        '신세계 보상치기': '.png'
    },
    random: [
        { name: '나미 초월' }, { name: '로빈 초월' }, { name: '타시기 초월' },
        { name: '도플라밍고 초월' }, { name: '루치 초월' }, { name: '조로 초월' },
        { name: '루피 초월' }, { name: '루피-기어포스' }, { name: '티치 초월' },
        { name: '바질 초월' }, { name: '키자루 초월' }, { name: '브룩 초월' },
        { name: '사보 초월' }, { name: '상디 초월' }, { name: '샹크스 초월' },
        { name: '시라호시 초월' }, { name: '로쿠규 초월' }, { name: '아카이누 초월' },
        { name: '야마토 초월' }, { name: '우솝 초월' }, { name: '보니 초월' },
        { name: '징베 초월' }, { name: '쵸파 초월' }, { name: '코비 초월' },
        { name: '아오키지 초월' }, { name: '키드 초월' }, { name: '로우 초월' },
        { name: '프랑키 초월' }, { name: '후지토라 초월' }, { name: '로져 불멸' },
        { name: '시키 불멸' }, { name: '거프 불멸' }, { name: '드래곤 불멸' },
        { name: '빅 맘 불멸' }, { name: '센고쿠 불멸' }, { name: '가반 불멸' },
        { name: '레일리 불멸' }, { name: '흰수염 불멸' }, { name: '제트 불멸' },
        { name: '카이도 불멸' }, { name: '비비 영원함' }, { name: '니카 영원함' },
        { name: '류마 영원함' }, { name: '버기 영원함' }, { name: '핸콕 영원함' },
        { name: '우타 영원함' }, { name: '미호크 영원함' }, { name: '카벤딧슈 영원함' },
        { name: '오뎅 영원함' }, { name: '에이스 영원함' }, { name: '레베카 제한됨' },
        { name: '마르코 제한됨' }, { name: '카타쿠리 제한됨' }, { name: '시노부 제한됨' },
        { name: '아인 제한됨' }, { name: '알비다 제한됨' }, { name: '에넬 제한됨' },
        { name: '크로커다일 제한됨' }, { name: '킹 제한됨' }, { name: '레드필드 제한됨' }
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
    const totalSpins = 20;
    const spinDuration = 35;
    const categoryData = categoryFruits[currentCategory];
    let selectedItem;

    console.log("선택된 카테고리 데이터:", categoryData);

    spinningInterval = setInterval(function() {
        if (Array.isArray(categoryData)) {
            const randomIndex = Math.floor(Math.random() * categoryData.length);
            selectedItem = categoryData[randomIndex].name;
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
                finalFruit = categoryData[finalRandomIndex].name;
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

                let imageFilename = null;

                if (currentCategory === 'rule') {
                    const ruleImageMap = categoryFruits.rule_imageMap;
                    if (ruleImageMap && ruleImageMap[finalFruit]) {
                        imageFilename = ruleImageMap[finalFruit];
                    }
                }

                if (imageFilename) {
                    resultImageArea.src = `images/${imageFilename}`;
                    resultImageArea.style.display = 'block';
                } else {
                    resultImageArea.style.display = 'none';
                    resultImageArea.src = '';
                }
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