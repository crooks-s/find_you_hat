const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

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
                console.log('Invalid choice.');
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





startGame();