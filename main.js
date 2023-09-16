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





startGame();