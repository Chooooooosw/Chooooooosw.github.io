const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('mousedown', () => {
        box.classList.add('pressed');
    });

    box.addEventListener('mouseup', () => {
        box.classList.remove('pressed');
        setTimeout(() => {
            box.classList.remove('pressed');
        }, 80); // transition 속도와 맞춤
    });

    box.addEventListener('mouseleave', () => {
        box.classList.remove('pressed');
    });
});