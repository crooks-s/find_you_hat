
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let inGame = false;
let currentIndex = [0,0];
let moveIndex = [0,0];
const randomNum = Math.floor(Math.random()*50);


function generateField(height, width){
    let randomField = [];
    for (let i = 0; i < height; i++){
        let row = [];
        for (let j=0; j < width; j++){
            let x = Math.floor(Math.random() * 2);
            if (x === 0){
                row.push(hole);
            } else {
                row.push(fieldCharacter);
            }
        }
        randomField.push(row);
    }
    return randomField;
}

console.log(generateField(3,3));



// =========================================================

// place under declared variables
const randomSpot = (intA, intB) => {
    let x = Math.floor(Math.random() * intA);
    let y = Math.floor(Math.random() * intB);
    let z = [x, y];
    return z;
}

// place in Field class
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



// place starterField
const newField = Field.generateField(3,3);

// add after Field class
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


 //add to case'reset'
 inGame = false;
 resetGame(); 
 checkNewPosition (HOLE and HAT)