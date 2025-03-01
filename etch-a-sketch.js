const createButton = document.querySelector('.create-button');
const resetButton = document.querySelector('.reset-button');
const container = document.querySelector('.container');
let gridSize = 16;

const createGrid = () => {
    container.innerHTML = '';

    for (let i = 0; i < gridSize ** 2; i++) {
        const div = document.createElement('div');
        div.classList.add('square');
        div.dataset.darkness = 0;
        container.appendChild(div);
    }

    const squares = document.querySelectorAll('.square');
    const squareSize = `${475 / gridSize}px`;

    squares.forEach(square => {
        square.style.width = squareSize;
        square.style.height = squareSize;
        square.addEventListener('mouseover', () => {
            let darkness = parseFloat(square.dataset.darkness);
            if (darkness < 1) {
                darkness += 0.1;
                square.dataset.darkness = darkness;
                const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                square.style.backgroundColor = darkenColor(randomColor, darkness);
            }
        });
    });
};

const darkenColor = (color, darkness) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const newR = Math.floor(r * (1 - darkness));
    const newG = Math.floor(g * (1 - darkness));
    const newB = Math.floor(b * (1 - darkness));
    return `rgb(${newR}, ${newG}, ${newB})`;
};

const promptGridSize = () => {
    let choice;
    do {
        choice = prompt('¿Cuántos cuadros quieres en tu cuadrícula? (1-100)');
        if (choice === null) {
            alert('Operación cancelada');
            return null;
        } else if (isNaN(choice) || choice < 1 || choice > 100) {
            alert('Debe ingresar un número entre 1 y 100');
        }
    } while (isNaN(choice) || choice < 1 || choice > 100);
    return parseInt(choice);
};

createButton.addEventListener("click", () => {
    const newSize = promptGridSize();
    if (newSize !== null) {
        gridSize = newSize;
        createGrid();
    }
});

resetButton.addEventListener("click", () => {
    gridSize = 16;
    createGrid();
});

createGrid();
