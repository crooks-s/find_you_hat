const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let inGame = false;
let currentIndex = [0,0];
let moveIndex = [0,0];
// this will be used for number of holes later in project
const randomNum = Math.floor(Math.random()*50);

const randomSpot = (intA, intB) => {
    let x = Math.floor(Math.random() * intA);
    let y = Math.floor(Math.random() * intB);
    let z = [x, y];
    return z;
}

class Field {
    constructor(field) {
        this.field = field;
        this.originalArray = JSON.parse(JSON.stringify(field)); // creates deep copy of field
    };

    // Resets the field to its original state
    resetField() {
        this.field = JSON.parse(JSON.stringify(this.originalArray));
     }

    // Prints the game field by iterating through each item
    print(){
        for(let i = 0; i < this.field.length; i++){
            const joinSections = this.field[i].join('');
            console.log(joinSections);
        }
    }

    // random Field generator that takes a height and width to fill a 2-D array with the required game pieces
    static generateField(height, width){
        let randomField = [];
        for (let i = 0; i < height; i++){
            let row = [];
            for (let j=0; j < width; j++){
                let x = Math.floor(Math.random() * 3);
                if (x === 0){
                    row.push(hole);
                } else {
                    row.push(fieldCharacter);
                }
            }
            randomField.push(row);
        }
        let pathMark, hatMark;
        pathMark = randomSpot(height, width);
        randomField[pathMark[0]][pathMark[1]] = pathCharacter;
        hatMark = randomSpot(height, width); 
        randomField[hatMark[0]][hatMark[1]] = hat;
        return new Field(randomField);
    }
};

// Instantiate a new Field. Use this for starterField
const myField = new Field([
//    0    1    2
    ['*', '░', 'O'], // 0
    ['░', 'O', '░'], // 1
    ['░', '^', '░'], // 2
//    0    1    2
  ]);

const resetGame = () => {
    myField.resetField();
    currentIndex = [0,0];
    moveIndex = [0,0];
    while (!inGame){
        let replayInput = prompt('Would you like to play again? Y/N: ');
        replayInput = replayInput.toUpperCase();
        switch(replayInput){
            case 'Y':
                inGame = true;
                playingGame();
                break;
            case 'N':
                console.log('Exiting game.');
                process.exit();
                break;
            default:
                console.log('Invalid choice. Please use single letter.');
        }
   }
 }  

const startGame = () => {
    while (!inGame) {
        let startInput = prompt('Would you like to play? Y/N: ');
        startInput = startInput.toUpperCase();
        switch(startInput){
            case 'Y':
                inGame = true;
                playingGame();
                break;
            case 'N':
                console.log('Exiting game.');
                process.exit();
                break;
            default:
                console.log('Invalid choice. Please use single letter.');
        }
    }
}

const gameTitleText = () => {
    console.log('========= NOW PLAYING GAME ==========')
    console.log('TO RESET GAME: Type reset or use command CTRL+C');
    console.log('---');
}

const playingGame = () => {
    gameTitleText();
    while (inGame) {
        // Print the field with necessary game pieces
        myField.print();
        // Prompt user for move input
        let moveInput = prompt('Which direction? (R/L/U/D): ');
        moveInput = moveInput.toUpperCase();
        // Move in specified direction and return moveIndex
        moveDirection(moveInput);
        // If moveIndex === ABC, then do XYZ,
        // then repeat loop.
        checkNewPosition(moveIndex, myField);
    }
}


let moveDirection = (moveInput) => {
    switch(moveInput){
        case 'R':
            moveIndex = [moveIndex[0], moveIndex[1] + 1]
            break;
        case 'L':
            moveIndex = [moveIndex[0], moveIndex[1] - 1]
            break;
        case 'U':
            moveIndex = [moveIndex[0] - 1, moveIndex[1]]
            break;
        case 'D':
            moveIndex = [moveIndex[0] + 1, moveIndex[1]]
            break;
        case 'RESET':
            inGame = false;
            resetGame();
            break;
        default:
            console.log('Invalid direction/input. Try again.');
    }
    return moveIndex;
}

let checkNewPosition = (moveIndex, myField) => {
    const fieldPositiveY = myField.field[moveIndex[0]];
    const fieldPositiveX = myField.field[moveIndex[1]];

    if (
        fieldPositiveX 
        && fieldPositiveY 
        && myField.field[moveIndex[0]][moveIndex[1]] === hole){
        console.log('You fell into a hole and died.');
        inGame = false;
        resetGame();
    } else if (
        !fieldPositiveX 
        || !fieldPositiveY
        ){
        console.log('You fell off of a cliff and died.')
        inGame = false;
        resetGame();
    } else if (myField.field[moveIndex[0]][moveIndex[1]] === hat){
        console.log('You found the sorting hat!\nGRYFFINDOR!');
        inGame = false;
        resetGame();
    } else {
        myField.field[moveIndex[0]][moveIndex[1]] = pathCharacter;
        currentIndex = moveIndex;
        return currentIndex;
    }
};

startGame();