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
    };

    // TODO(crookse) When the game restarts, should the field clear to its
    // initial state?
    resetField() { }

    // Prints the game field
    print(){
        for(let i = 0; i < this.field.length; i++){
            const joinSections = this.field[i].join('');
            console.log(joinSections);
        }
    }

    // random Field generator
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

const playingGame = () => {
    console.log('========= NOW PLAYING GAME ==========')
    console.log('TO RESET GAME: Type reset or use command CTRL+C');
    console.log('---');
    while (inGame) {
        // Print the field with player path
        myField.print();
        // Prompt user for move input
        let moveInput = prompt('Which direction? (R/L/U/D): ');
        moveInput = moveInput.toUpperCase();
        // Move in specified direction AND return moveIndex
        moveDirection(moveInput);
        // If moveIndex === XYZ, then do something
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
            console.log('==========')
            console.log('Invalid direction/input. Try again.');
    }
    return moveIndex;
}

let checkNewPosition = (moveIndex, myField) => {
    const fieldPositiveY = myField.field[moveIndex[0]];
    const fieldPositiveX = myField.field[moveIndex[1]];

    // The value of `moveIndex[0]` could be `-1` which means `myField.field[-1]`
    // could be accessed when it does not exist. Since arrays never have a
    // negative index, checking to see if a negative index is about to be used
    // on an array would protect the program from breaking. This situation is
    // called an edge case since it is assumed that the user will never go
    // outside the bounds of the game. In practice, you will probably see
    // something similar to the following:
    //
    //   const field = myField.field[moveIndex[0]];
    //   if (field && field === hole) { /* dead */ }
    //
    //   The `if (field` part is just checking if the `field` variable is a
    //   truthy value. If it is not truthy, then the program does not execute
    //   the conditional further and moves on to the next set of code -- safely
    //   keeping the program running.
    //
    if (
        fieldPositiveX 
        && fieldPositiveY 
        && myField.field[moveIndex[0]][moveIndex[1]] === hole){
        console.log('You fell into a hole and died.');
        console.log('==================');
        inGame = false;
        resetGame();
    

    } else if (
        !fieldPositiveX 
        || !fieldPositiveY
        ){
        console.log('You fell off of a cliff and died.')
        console.log('==================');
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