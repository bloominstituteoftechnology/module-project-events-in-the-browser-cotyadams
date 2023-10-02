// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      
      square.addEventListener('click', () => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        //deselect previous square 
        let grid = document.querySelectorAll('.square')
        grid.forEach(s => {
          s.classList.remove('targeted')
        })
        //select new square
        square.classList.add('targeted')
        //keeps straight what square it ends at for arrow keys
        current_square = document.querySelector('.square.targeted');
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })
  current_square = document.querySelector('.square.targeted');
  
  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    // for up arrow
    let current_index = Array.from(allSquares).indexOf(current_square)
    if (evt.key === 'ArrowUp' && current_index > 4) {
      current_index -= 5;
    }
    //untargets previous square
    current_square.classList.remove('targeted')
    //targets new square
    allSquares[current_index].classList.add('targeted')
    //resets current square to targeted square
    current_square = document.querySelector('.square.targeted');
    
    //for down arrow
    current_index = Array.from(allSquares).indexOf(current_square)
    if (evt.key === 'ArrowDown' && current_index < 20) {
      current_index += 5;
    }
    //untargets previous square
    current_square.classList.remove('targeted')
    //targets new square
    allSquares[current_index].classList.add('targeted')
    //resets current square to targeted square
    current_square = document.querySelector('.square.targeted');

    //for left arrow
    current_index = Array.from(allSquares).indexOf(current_square)
    if (evt.key === 'ArrowLeft' && current_index > 0) {
      current_index -= 1;
    }
    //untargets previous square
    current_square.classList.remove('targeted')
    //targets new square
    allSquares[current_index].classList.add('targeted')
    //resets current square to targeted square
    current_square = document.querySelector('.square.targeted');

    //for right arrow
    current_index = Array.from(allSquares).indexOf(current_square)
    if (evt.key === 'ArrowRight' && current_index < 24) {
      current_index += 1;
    }
    //untargets previous square
    current_square.classList.remove('targeted')
    //targets new square
    allSquares[current_index].classList.add('targeted')
    //resets current square to targeted square
    current_square = document.querySelector('.square.targeted');
    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    let count = 0;
    document.addEventListener('keydown', evt => {
      let mosquito = current_square.querySelector('img[data-status="alive"]');
      if (evt.key === keys.space && mosquito && count < 5) {
        current_square.style.backgroundColor = 'red'
        count++;
        if (count === 5) {
          // End the game and display the time taken
          let finish = document.querySelector('.info');
          finish.textContent = `Extermination completed in ${getTimeElapsed()/1000} seconds!`
        }
      }
    }
    )
    // 👉 TASK 5 - End the game 👈
  })
  
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
