/*
* Notes:
- Build an application that is a simple Tetris game
- simple grid based game -> user has to navigate 5 shapes or tetrominoes down to the bottom of the grid 
- the aim of the game is to get the highest score by filling up rows on the grid in order for them to disappear and gain points
- user can rotate shapes 
- have insider knowledge of what shape is coming up next thanks to the grid side of your grid previewing the shape to come next
- won't be levels in this just basic version of the game 
- will be using HTML, JavaScript, & CSS
- will setup code as a bonus as a spellchecker -> check code for mistakes and bump me to change things in order for it work 
- HTML -> hyper text markup language
- CSS -> cascading Style sheet
    -> add font's, styles, and colors to the web document
*/

/*
//************************************************************
& Recap for Understanding Variables
var -> function and globally scoped
global scope variable
var name = 'RoRo';

function showAlert() {
    this is a local scope
    var name = 'RoRo';

    alert('Hi ' + name);
}

showAlert();

function otherFunction() {
    this will not work since the variable is not a global var -> it is out of my reach since the var is inside the showAlert function
    alert('Hi ' + name);
}

otherFunction();

~ let -> declare variables whose value that you may want to change later
-> can only work w/i it's scope
-> blocked scope variable 

~ const -> declare a variable whose value will remain unchanged
-> once defined cannot change it later on
-> block scope var that cannot be reassigned
*/

//************************************************************
/*
& Arrays
-> special var that can hold more than one value at one time
-> list of variables
-> can loop through vars to find a specific one 
-> can house many different values under one name and can access said value through an index
-> 1st value is index 0
-> last value is the length of the array minus 1


& functions
-> Main building block of most languages
-> this allows you to write a block of code a define it with a name and execute it/ invoke it as many times as you would like 
-> recycling code with functions
-> name should depict what is happening in code block also for readability
-> naming conventions are very important
-> params -> whatever args you have are the same amount that needs to be passed in
    -> if 1 param need to pass in one and need to be reflected in the code
    -> if try to pass in more than one the others will be ignored

? Ex.
~ 1.
function showAlert(firstName ) {
    block of code

    alert('Peek-a-boo, You have been alerted');
}
invoke the function
showAlert('RoRo');

The 2nd param will be ignored
showAlert('RoRo', 'Becky');

~ 2. 
it is the same if try to past in last name and not add last name, will get undefined 
function showAlert(firstName, lastName) {
    block of code
    alert('firstName' + ' ' + 'lastName' + ' Peek-a-boo, You have been alerted');
}
invoke the function but no last name is passed in
showAlert('RoRo');


? arrow functions
-> allow us to write shorter versions of code -> a lot cleaner

? Ex.
~ 1.
hello = function () {
    return 'Hello World';
}

~ arrow function
hello = () => 'Hello World';

~ 2. If have params pass them through the {}'s
hello = (var) => 'Hello World' + val;

hello = var => 'Hello World' + val;


& .forEach
-> provides a callback function once for each item in an array in ascending order

cb is invoked with 3 args.
-> value -> value of the element
-> index -> the index of the element 
-> object -> the array object being traversed 
-> gonna get an array with a several values and apply logic to each one

& Use keycodes -> there are keycodes assigned to the keys on keyboard accessible through JavaScript
-> will use this to make the tetromino move left [keycode 37], right [keycode 39], up [keycode 38], down [keycode 40]
-> use JS to make magic happen if press down btn
-> will assign keycodes to functions

& will be passing events into functions so that i can use them
? Ex. Arrow Function
~ an array of names 
let names = ['RoRo', 'Lee', 'Akira', 'Aiko'];

name of the array
    built-in method that allows cb function
            can name this anything and js knows I am talking about an item from my array
names.forEach(name => {
                    add this to each item in the array 
    console.log(name + ' is top tier!');
})

~ Increment operator
++
y = 5
y++
y = 6
* there is also a decrement operator -- 
y = 5
y++
y = 4



? Mini grid to display upcoming shapes
-> build a grid
-> pick out elements to style in style sheet
-> pick out elements to add functionality to
-> work with arrays to pick next shape
*/


/*
? .splice() 
-> can remove items from an array or remove & replace them with new ones
-> it mutates the array -> changes it
 */

var planets = ['Mars', 'Saturn', 'Pluto', 'Earth'];

//~ what if want to remove pluto from the array 
// pass through the index of the item to be removed
// splice(startIndex, deleteCount)
// 0 in deleteCount will remove nothing 
// console.log(planets.splice(2, 1));
// console.log(planets);

// want to re-add pluto as well as uranus
// console.log(planets.splice(1, 0, 'Pluto', 'Uranus'));
// console.log(planets);

// want to remove everything after Mars
// do this by passing in the index # into splice
// console.log(planets.splice(1));
// console.log(planets);

//? Concat
var tetrominoes = ['tTetromino', 'zTetromino', 'lTetromino', 'oTetromino', 'iTetromino'];
var shapes = ['circle', 'square', 'triangle'];
console.log(tetrominoes.concat(shapes));

//? for loop
// use for loop to loop over length of the array and to loop over each item one by one
// get a list of all the shapes 
for (let i = 0; i < shapes.length; i++) {
    console.log(shapes[i]);
    
}


