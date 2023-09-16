const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let inGame = false;
let currentIndex = [0,0];
let moveIndex = [0,0];

class Field {
    constructor(field) {
        this.field = field;
    };

    print(){
        for(let i = 0; i < this.field.length; i++){
            const joinSections = this.field[i].join('');
            console.log(joinSections);
        }
    }
};


// Instantiate a new Field
const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

  const startGame = () => {
    currentIndex = [0,0];
    moveIndex = [0,0];
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
        default:
            console.log('==========')
            console.log('Invalid direction/input. Try again.');
    }
    return moveIndex;
}

let checkNewPosition = (moveIndex, myField) => {
    const fieldHeight = myField.field.length;
    const fieldWidth = myField.field[0].length;
    if (moveIndex === hole){
        console.log('You fell into a hole and died. Restarting game...');
        console.log('==================');
        inGame = false;
        startGame();
    } else if (moveIndex[0] < 0 || moveIndex[1] < 0 || moveIndex[0] > fieldWidth || moveIndex[1] > fieldHeight){
        console.log('You fell off the cliff and died. Restarting game...')
        console.log('==================');
        inGame = false;
        startGame();
    } else if (moveIndex === hat){
        console.log('You found the sorting hat! GRYFFINDOR!');
        process.exit();
    } else {
        myField.field[moveIndex[0]][moveIndex[1]] = pathCharacter;
        currentIndex = moveIndex;
        return currentIndex;
    }
};



startGame();