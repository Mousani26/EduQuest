// Elements for the game (5 for demo; can expand to all)
const elements = [
  {symbol: 'H', name: 'Hydrogen', row: 1, col: 1, hint: 'Lightest element'},
  {symbol: 'He', name: 'Helium', row: 1, col: 10, hint: 'Noble gas'},
  {symbol: 'Li', name: 'Lithium', row: 2, col: 1, hint: 'Alkali metal'},
  {symbol: 'Be', name: 'Beryllium', row: 2, col: 2, hint: 'Alkaline earth metal'},
  {symbol: 'B', name: 'Boron', row: 2, col: 13, hint: 'Metalloid'}
];

let score = 0;
document.getElementById('total').textContent = elements.length;
document.getElementById('score').textContent = score;

const table = document.getElementById('periodic-table');
const pool = document.getElementById('elements-pool');

// Generate empty grid
for(let r=1; r<=3; r++){
  for(let c=1; c<=10; c++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = r;
    cell.dataset.col = c;
    table.appendChild(cell);

    cell.addEventListener('dragover', e => e.preventDefault());
    cell.addEventListener('drop', e => {
      const symbol = e.dataTransfer.getData('text/plain');
      const element = elements.find(el => el.symbol === symbol);
      if(element.row == r && element.col == c){
        cell.textContent = symbol;
        cell.classList.add('correct');
        score++;
        document.getElementById('score').textContent = score;
        e.target.classList.remove('incorrect');
      } else {
        cell.classList.add('incorrect');
        setTimeout(()=>cell.classList.remove('incorrect'),300);
        alert(`Hint: ${element.hint}`);
      }
    });
  }
}

// Generate draggable elements
elements.forEach(el => {
  const div = document.createElement('div');
  div.classList.add('element');
  div.textContent = el.symbol;
  div.draggable = true;
  div.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', el.symbol);
  });
  pool.appendChild(div);
});
