//? all js needs to be written w/i this so that the <script> is picked up that was written in html file
                        // this fires when the initial html document is fully loaded and completely passed w/o waiting for the style sheets, imgs, & sub frames to finish loading
document.addEventListener('DOMContentLoaded', () => {
    //& query selector to look through html document & find the element or class name of grid and assign it the var grid
    // anything done to grid want it to affect the element or class grid in html file
    // built-in js method
    const grid = document.querySelector(".grid");

    //& want the js to talk to all the squares in the grid
    // use array from to use all the 200 of the div'ss and turn them into an array
    // each div will have an index #
    // is an array since we collected all the div's and pass them through array from
    let squares = Array.from(document.querySelectorAll(".grid div"));

    //& use hash to indicate looking for an id
    const scoreDisplay = document.querySelector("#score");
    const startBtn = document.querySelector("#start-btn");

    //& the width and the length of grid and squares
    const width = 10;

    //& Define next random -> need to make this global since will be using in more than 1 function
    let nextRandom = 0;

    /*
    ? Moving the tetromino 
    ~ setinterval -> make the tetromino move down every second 
    -> allows a function to be invoke after it is passed through it after an 'x' amount of time -> in milliseconds
    -> will use this so tetromino will auto move down the grid
     */
    // & this will be used to stop the setinterval in the future
    // this will be null when left blank like this 
    let timerId; 

    //& the score will now display on the page starting w/ 0
    let score = 0;

    //& assign colors to each of the tetrominoes 
    const colors = [
        // put the colors i want them to be in the same order of the tetrominoes array
        'orange',
        'pink',
        'purple',
        'salmon',
        'blue'
        // each time we add or remove the classList of Tetromino add the colors
    ];

    //? The Tetrominoes
    /*
    & make the L tetromino -> an array with 4 arrays inside
    -> each array is one of the rotations -> 4 variations
    */
    /*
    -> drawing out the shapes as if only have the grid to draw on
    -> started from 0 on the grid
   */
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, (width * 2) + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];


    //& make the Z tetromino -> 2 rotation variations 
    const zTetromino = [
        [0, width, width + 1, width + 2],
        [width + 1, width + 2, width * 2, (width * 2) + 1],
        [0, width, width + 1, width + 2],
        [width + 1, width + 2, width * 2, (width * 2) + 1],
    ];


    //& make the T tetromino -> 4 rotation variations
    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, (width * 2) + 1, width + 2],
        [width, width + 1, width + 2, (width * 2) + 1],
        [1, width, width + 1, (width + 2) + 1]
    ]


    //& make the O tetromino -> 1 rotation variation 
    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]


    //& make the I tetromino -> 2 rotation variations 
    const iTetromino = [
        [1, width + 1, (width * 2) + 1, (width * 3) + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, (width * 2) + 1, (width * 3) + 1],
        [width, width + 1, width + 2, width + 3]
    ]


    //? -> once have 4 shapes put them in an array of their own
    // -> now to add styling to them so we can see the tetrominoes
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];


    // ? Decide where want to start drawing tetromino on squares grid
    // ~ 1st square of tetrominoes rotation array will start at square w/ index 4
    let currentPosition = 4;
    let currentRotation = 0; 

    console.log(theTetrominoes[0][0]);

    // & randomly select a tetromino and it's 1st rotation'
    /*
    -> Math.random -> give a random # for array length
    -> .length -> built-in method that tells how long the array is
    -> Math.floor -> will round down to the nearest integer
     */
    let random = Math.floor(Math.random()*theTetrominoes.length);
    // console.log(random); // should get a new # every time refresh the page

    /* 
    & pick a tetromino and 1st rotation
    -> want to access the 1st array w/i tetrominoes array which is at index 0
    -> then want to access the w/i that array the array at index 0
    

    ? let current = theTetrominoes[0][0];
    -> & now replace the 0 w/ random 
    -> thus instead of passing in 0 and accessing the 1st number of the array each time -> will randomly choose a # from 0-4
    -> will give back random tetrominoes of the tetrominoes array
    -> once accessing one of the shapes always want to pick their 1st rotation
        -> with currentRotation = 0 -> will always start at the 1st rotation of any tetromino chosen at random
    */
    let current = theTetrominoes[random][currentRotation];
    // console.log(theTetrominoes);
    // console.log(theTetrominoes[0][0]); // the L tetrominoes current rotation -> my 1st shape


    // ~ draw the Tetromino
    // retrieve current array 
    function draw() {
        /*
        & for each item in that array want to add a class of tetromino that would color that item 
        -> a div w/i in the class element of div
        -> forEach will apply logic to each item of an array 
        -> use => to add code/logic to each index of the array 
        -> passing in a # to the squares array to color it dark salmon
        -> access the style sheet by using classList.add 
         */
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
            //& add the colors for the tetrominoes
            // using style and background color
            // also pass through current value of random into colors array
                // -> whatever the random tetromino is will get back it's assigned color
            squares[currentPosition + index].style.backgroundColor = colors[random];
        })
    }

    // draw();

    
    /*
    ? undraw the Tetromino
    ~ -> want to undraw the current Tetromino and it's random rotation 
    -> name a function undraw
    -> use forEach for the items in the current array and add logic to each index
    -> look at each of their current positions and add the index of the shape 
    -> pass it through the squares array
    -> this time will be removing the class of tetromino from it's current location in the grid
    -> will visibly disappear from the grid
    */
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
            //& to remove the color -> leave an empty string
            squares[currentPosition + index].style.backgroundColor = '';
        })
    }

    /*
    ? Moving the tetromino 
    ~ setinterval -> make the tetromino move down every second 
    -> allows a function to be invoke after it is passed through it after an 'x' amount of time -> in milliseconds
    -> will use this so tetromino will auto move down the grid
    & this will be used to stop the setinterval in the future
    this setInterval that invokes the moveDown function is done once the browser is loaded  
        -> only want it to be invoked when the start btn is pressed
        -> so commented this and set it as a global var and made it null
    timerId = setInterval(moveDown, 1000);
     */
    

    /*
    & assign functions to keyCodes
    if statement will decide what happens when you press a key
        -> will pass in 'e' for event
    */
    function control(e) {
        // & if press the key that === keycode 37
        // left -> want tetromino to invoke the move left function
        if (e.keyCode === 37) {
            moveLeft();
        }

        // then it will move up [keyCode 38]
        else if (e.keyCode === 38) {
            // up = rotate -> if press up want the shape to rotate
            rotate();
        }

        // will invoke move right function so tetromino moves to the right
        else if (e.keyCode === 39) {
            // right -> will be based on the same logic as the moveLeft
            moveRight();
        } 
        
        else if (e.keyCode === 40) {
            // down -> if press down want the shape to go down faster
            moveDown();
        }
    }

    /*
    ~ assign document event listener to listen for anytime we press a specified key on our keyboard
    -> listen out for which one was clicked and invoke the control function
    Event target method -> addEventListener -> makes stuff happen in your browser
        -> sets up a function that is called when the specified event is delivered to the target
        -> can do remove event listener to deactivate any event listening happening
        -> if the key is pressed invoke the control function that has been attached 
     */
    document.addEventListener('keyup', control);
    // document.addEventListener('keydown', control);


    // & moveDown function
    function moveDown() {
        // remove draw
        undraw();
        // add a width to the current position
        currentPosition += width;
        // draw again in it's new position
        draw();
        // this will stop the shape from falling out of the grid -> stop at the bottom of the page
        freeze();
    }

    /*
    & need to write a freeze function
    -> write an if statement -> using .some
    -> .some unlike .forEach -> checking it some of the logic is true in the array
    -> if get one true back the run the code 
    -> if 'True' some of the squares that make up the current tetromino -> if their index + width [checking the next space down from each square] contains a square or the class 'taken' we turn each square into the class of taken
    -> if 'False'
     */
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            //~ -> start a new tetromino falling 
            // -> that tetromino that will become current tetromino 
            //& nextRandom for the mini-grid is being passed on to the random value
            random = nextRandom;
            //& -> assign this value to the nextRandom
            // random = Math.floor(Math.random() * theTetrominoes.length);
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            //& -> pass this through the tetrominoes array and set this as current tetromino
            current = theTetrominoes[random][currentRotation];
            //& -> then put it at the current position
            currentPosition = 4;
            //& -> lastly draw this randomly new selected tetromino
            draw();
            //& display the tetromino shapes in the mini grid
            displayShape();
            //& add to the score when get a full row of tetrominoes on the page 
            addScore();
            //& the game is done once some of the square with the class 'taken' are in the original default position 
            gameOver();
        }
    }


    /*
    ~ the computer needs to know when it reaches the very left of the grid
    -> move the tetromino left, unless is at the edge or there is a blockage
    -> want the tetromino when in the square of 10, 20, 30, and so on to no longer move left and stop
    -> move the tetromino to the left by drawing it and undraw it in the squares
    */
    function moveLeft() {
        // -> removing any trace of the shape in it's current location before moving it left so that there is a clean slate
        undraw();
        // define what is the left edge
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        // only allow shape to move left only if shape at the current position in the array is not at the left edge
        // want the tetromino to stop there is already another tetromino already there
        if (!isAtLeftEdge) currentPosition -= 1;

        /*
        & not going to style this class just want to assign it to the spaces that are taken and cannot go into
        -> if some the squares in the tetromino shape suddenly go into the squares that contains a class of taken while traveling left want to push it back one space so it appears to not have moved
        -> want to do this for every index in the tetromino shape
        -> using => pass through the current position and add every index as it gets passed through
        -> add on so that it goes back to it's original position in the array
         */
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }

        // then draw the tetromino
        draw();
    }


    /*
    ~ the computer needs to know when it reaches the very right of the grid
    -> move the tetromino right, unless is at the edge or there is a blockage
    -> want the tetromino when in the square of 9, 19, 29, 39, and so on to no longer move right and stop
    -> move the tetromino to the right by drawing it and undraw it in the squares
    */
    function moveRight() {
        //& removing any trace of the shape in it's current location before moving it right so that there is a clean slate
        // -> undraw the squares that make up the tetromino from their current indexes 
        undraw();

        //& define what it means when some the squares that make up a certain current tetromino are at certain indexes 
                        // if an index is divisible by the width and it's remainder = width - 1
                        // -> the statement is true and we are at the right edge
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

        //& if not at the right edge -> can freely move each square in the tetromino + 1 down the array 
        if (!isAtRightEdge) currentPosition += 1;
        
        //& then if some of the squares that make up the tetromino are in a square w/i the class 'taken'
        // -> have to push the back a space in the array to make it visually appear as if not moved at all 
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        };

        //& re-draw the tetromino in it's new position
        draw();
        // ~ can move to the left or right edge now and the tetromino squares will not exit the screen 
    }

    //? Fix rotation of the tetrominoes at the edge
    function isAtRight() {
        return current.some(index => (currentPosition + index + 1) % width === 0);
    }

    function isAtLeft() {
        return current.some(index => (currentPosition + index) % width === 0)
    }

    function checkRotatedPosition(P) {
        //& get the current position -> then check if the piece is near the ft side 
        P = P || currentPosition;
        //& add 1 b/c the position index can be 1 less then where the piece is [with how they are indexed]
        if ((P + 1) % width < 4) {
            //& use actual position to check if it is flipped over the right side
            if (isAtRight) {
                //& if so then add one to wrap it back around
                currentPosition += 1;
                //& check again -> pass position from the start since the I block may need to move more
                checkRotatedPosition(P);
            }
        } 
        else if (P % width > 5) {
            if (isAtLeft()) {
                currentPosition -= 1;
                checkRotatedPosition(P);
            }
        }
    }

    /*
    ? The increment operator [++] will help access the next items in the tetrominoes array
    ~ need to access all rotations with just the click of the up key [keyCode 38]
    -> write a function to rotate the tetromino
        -> just skipping to the next rotation in the rotation array 
     */
    function rotate() {
        //& undraw the shape
        undraw();

        // & use the ++ to move down to the next item in the rotation array 
        currentRotation++;

        /*
        & if statement 
        -> says that if the current rotation index is === to the amount of rotations in current tetromino shape we will go back to the 1st item in the array 
        -> goes back to the 1st rotation layout again 
         */
        if (currentRotation === current.length) {
            // if the current rotation gets to 4 -> make it go back to 0
            currentRotation = 0;
        }
        //& if the statement is false -> pass through the new current rotation # into the current tetromino 
        current = theTetrominoes[random][currentRotation];
        //& check the rotated position
        checkRotatedPosition();
        //& then draw the tetromino
        draw();
    }


    /*
    ? Need to build a mini grid display on the side of the main grid to display the upcoming tetromino shapes to the user
    & pick out each square in mini-grid and call them miniSquares
    -> use query selector all -> want all the div's inside the div called mini-grid 
    */
    const displaySquares = document.querySelectorAll('.mini-grid div');

    //& now to tell JS how big the width of the mini grid is
    const displayWidth = 4;

    //& set the index at 0
    // -> JS will know that i am talking to the mini grid only
    // let displayIndex = 0;
    const displayIndex = 0;
    /*
        ~ Need another array of the 5 tetrominoes of their 1st rotations 
        -> the Tetrominoes w/o their entire rotations
        -> do not need all the rotations just need the tetromino to show
        -> this will be shown in the mini grid 
        -> the rotation will change depending on the user command in the game grid
    */
    const upNextTetrominoes = [
        //& L Tetromino 1st rotation 
        [1, displayWidth + 1, (displayWidth * 2) + 1, 2],
        //& Z Tetromino 1st rotation 
        [0, displayWidth, displayWidth + 1, (displayWidth * 2) + 1],
        //& T Tetromino 1st rotation 
        [1, displayWidth, displayWidth + 1, displayWidth + 2],
        //& O Tetromino 1st rotation 
        [0 , 1, displayWidth, displayWidth + 1],
        //& I Tetromino 1st rotation
        [1, displayWidth + 1, (displayWidth * 2) + 1, (displayWidth * 3) + 1]
    ];
    

    /*
    ~ Need to write another function that will display the shape in the mini-grid
    -> using the displaySquares that were created will use forEach to get each square/item and remove any trace of the tetromino class from the whole mini-grid 
    -> next go into the upNextTetrominoes array and use next random 
        -> for each new square that makes up now randomly selected tetromino want to add a class of tetromino to it
        -> then want to pass it through displaySquares
     */
    function displayShape() {
        //& remove any trace of the tetromino 
        displaySquares.forEach(square => {
            square.classList.remove('tetromino');
            //& remove the color of the tetromino 
            square.style.backgroundColor = '';
        })
        //& adding a class of tetromino to each new random square created
        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino');
            //& to add the color of the tetromino
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
        })
    }


    /*
    ? Want the tetromino to display in the mini-grid as soon as the game starts
    ~ To accomplish this need to hook up the start/pause btn
    -> add the start/pause function
    -> all about setting intervals and clearing intervals
    
    ~ Start/Pause btn - adding functionality
    -> move into an event listener that will be attached to the btn 
        -> will have an id of start-btn
    -> every time click this will invoke the moveDown function w/ it's setInterval 
    -> add a pause functionality as well 
     */

    //~ grab btn w/ id 'start-btn' and using the var startBtn attach an event listener
    startBtn.addEventListener('click', () => {
        //& if the btn is clicked and the timerId value is not null want to pause the game
        if (timerId) {
            //& passing in timerId through clearInterval and setting the timerId to null will pause the game 
            clearInterval(timerId);
            timerId = null;
        } else {
            //& when the start btn is pressed the tetromino will be drawn in the default current position -> 4
            draw();
            //& put the timerId on a set interval -> invoking the moveDown function every 1000 milliseconds
            timerId = setInterval(moveDown, 1000);
            //& select the next random shape and invoke the display function to display the shape in the mini-grid 
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            displayShape();
        }
    });

    /*
    ? What happens when a user fills a whole row of tetromino squares
    -> need to remove the row or array from the game grid
    -> add an increase score
    -> display the score 
    -> add a new fresh row/array to the grid so the grid does not appear to shrink in size
    -> using: 
    -> splice() -> removes and adds/replace items in an array and returns the remove items
    -> concat() -> merged to arrays together 
    -> appendChild() -> existing js function that allows add elements to an existing element
    */
    //~ add score function
    function addScore() {
        //& write a for loop -> will loop over entire grid and all it's squares every 10 squares
        // -> width by width
        for (let i = 0; i < 199; i+=width) {
            //& define what want row to be
            // i plus every squares that makes up a row 
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
            
            //& use in built method called 'every' to check if every square in the defined row contains a div with the class 'taken'
            if (row.every(index => squares[index].classList.contains('taken'))) {
                //& -> add 10 to the score 
                score += 10;
                //& -> display the score to the user 
                scoreDisplay.innerHTML = score;
                //& -> each item in the row remove the class 'taken'
                row.forEach(index => {
                    squares[index].classList.remove('taken');
                    //& remove the class tetromino so that the color of the tetrominoes that were in the squares cut off and appeared at the top of the page are not visible
                    squares[index].classList.remove('tetromino');
                    //& remove the color of the tetromino
                    squares[index].style.backgroundColor = '';
                })
                //& -> remove the row using splice
                const squaresRemoved = squares.splice(i, width);
                // console.log(squaresRemoved); // see the 10 added to score on the page and the console on the page in the inspect 

                //& re-add the squares the squares array so that the grid does not appear to be smaller
                // will append the new squares to the grid
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }
        }
    }

    /*
    ? Defining what the GameOver is
    & tetris is done when there is no more space to place anymore tetrominoes
    -> tell JS that if there is class 'taken' in the original default position -> 4
    -> then it is game over
    */
    function gameOver() {
        //& if some of current tetromino shapes that are in play are in the current default position[4] and contain the class taken it is game over
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            //& display the game is done in score display
            scoreDisplay.innerHTML = 'end';
            //& clear the games timer id's so that the auto moveDown function stops
            clearInterval(timerId);
        }
    }


})

