// 이미지 슬라이드 쇼 만들기
const slides = document.querySelectorAll('#slides > img');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

console.log(slides);

// 슬라이드 쇼에 있는 이미지 3개 중에서 하나가 표시되면 나머지 이미지는 모두 감춤
// 이전 또는 다음 버튼을 클릭하면 이전 이미지나 다음 이미지를 보여줌
// 슬라이드 번호를 저장할 변수 current 선언
let current = 0;

// current 값에 따라 현재 이미지를 보여주는 showSlide() 함수를 만듬
function showSlide(n) {
  // 지정 이미지 보여주기 전에 우선 모든 이미지를 화면에서 감춤
  slides.forEach(function (slideEl) {
    slideEl.style.display = 'none';
    // style => css를 조작 가능 display를 none처리한다.
  });

  // n번째 이미지만 화면에 표시
  slides[n].style.display = 'block';
}
// 각 인덱스를 입력하면 해당 이미지가 보임
// showSlide(1);

// 이전 이미지를 보여주는 prevSlide() 함수
function prevSlide() {
  // current 값이 0 보다 크면 이전 인덱스로
  // 그렇지 않으면(첫번째 이미지이므로) 마지막 인덱스로
  if (current > 0) {
    current = current - 1;
  } else {
    // current = 2; // 하드코딩은 지양
    current = slides.length - 1; // 배열에서 마지막 인덱스 구할 때 많이 씀
  }

  showSlide(current);
}


// 다음 이미지를 보여주는 nextSlide() 함수
function nextSlide() {
  // current 값이 2보다 작으면 다음 인덱스로
  // 그렇지 않으면(마지막 이미지이므로) 첫번째 인덱스로
  // if (current < 2) { // 하드코딩 지양

  if (current < slides.length - 1) {
    current = current + 1;
  } else {
    current = 0;
  }

  showSlide(current);
}

showSlide(current); //현재 이미지를 표시
prev.addEventListener('click', prevSlide); // 이전 이미지 표시
next.addEventListener('click', nextSlide); // 다음 이미지 표시