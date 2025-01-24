const 뽑기박스 = document.getElementById(' 뽑기박스 '); // id로 박스 요소 선택
const resultArea = document.getElementById('result'); // id로 결과 표시 영역 요소 선택

const fruits = ['사과', '바나나', '딸기', '오렌지', '포도', '수박', '키위']; // 과일 목록 배열

뽑기박스.addEventListener('click', function() { // 박스 클릭 이벤트 리스너 추가
    const randomIndex = Math.floor(Math.random() * fruits.length); // 0 ~ 과일 목록 길이-1 범위의 랜덤 정수 생성
    const selectedFruit = fruits[randomIndex]; // 랜덤 인덱스에 해당하는 과일 선택

    resultArea.textContent = selectedFruit; // 결과 표시 영역에 선택된 과일 이름 표시
});