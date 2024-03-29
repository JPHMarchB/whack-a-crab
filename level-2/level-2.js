const holes = document.querySelectorAll('.hole-level-2')
const scoreBoard = document.querySelector('.score')
const moles = document.querySelectorAll('.capybara')
let lastHole;
let timeUp = false
let score = 0

// Create a function that gives a random time between a max and a min value
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

// Create a function to get a random hole
function randomHole(holes) {

    // Get the index of the hole
    const index = Math.floor(Math.random() * holes.length)

    // Log that hole at the current index
    const hole = holes[index]

    // If the new generated hole is the same as the last skip it and generate a new one
    if (hole === lastHole) {
        console.log('Skipping duplicate hole')
        return randomHole(holes)
    }
    // The last hole is equal to the current hole selected for late use
    lastHole = hole
    // Return the hole that meets the requirements
    return hole
}

// Create a function that makes a crab pop up at the hole we got from the 'randomHole' function
function pop() {

    // Give a min and max time the crab can stay up for *generated by randomTime function*
    const time = randomTime(200, 800)

    // Get a randomHole from the randomHole function
    const hole = randomHole(holes)

    // Use CSS class to make the crab go up at the generated 'hole'
    hole.classList.add('up')

    // Specify how long the crab will stay up for
    setTimeout(() => {
        // Remove crab from its hole after being hit or its time has passes
        hole.classList.remove('up')
        // After it's done pop up a new crab
        if (!timeUp) pop()
    }, time)
}

// Create a function to start the game
function startGame() {

    // Set the score board to reset to 0
    scoreBoard.textContent = 0

    // Set the game state to active
    timeUp = false

    // Set the active score to 0 for a new game
    score = 0

    // Pop up a crab to be hit
    pop()

    // Specify how long the game will go on (10 seconds here)
    setTimeout(() => timeUp = true, 10000)
}

// Create a function that takes an event to log the score of how many crabs hit
function whack(e) {

    // Check if the event is trusted (when player clicks) if not trusted, exit the function to prevent cheating
    if(!e.isTrusted) return

    // Increase the player's score by 1
    score++

    // Hide the crab from the player if they've scored
    this.parentNode.classList.remove('up')

    // Update the score board
    scoreBoard.textContent = score
}

// Call the whack function everytime someone clicks the crab
moles.forEach(mole => mole.addEventListener('click', whack))
