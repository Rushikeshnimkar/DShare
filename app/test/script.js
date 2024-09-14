document.addEventListener('DOMContentLoaded', () => {
    const colorButton = document.getElementById('colorButton');
    const countDisplay = document.getElementById('count');
    let count = 0;

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    colorButton.addEventListener('click', () => {
        document.body.style.backgroundColor = getRandomColor();
        count++;
        countDisplay.textContent = count;
    });
});