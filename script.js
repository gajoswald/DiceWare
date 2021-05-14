// https://theworld.com/~reinhold/diceware.html

let fontSize = 24;
let words = new Map();
let phrase = [];
let helpText = "space to generate a new word, (d)igit, (s)ymbol, (r)eset, (c)amel case, (u)pper case, CTRL/CMD+C copy, (h)elp text";   
let notificationText = helpText;
function preload() {
  // const all = loadStrings('diceware8k.txt');
	loadStrings('beale.wordlist.asc.txt', createMap );
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	textSize(fontSize);
}

function createMap(strings) {
	for( let line of strings ) {
		let [key, word] = line.split('\t');
		if( key.length === 5 ) {
			words.set( key, word );
		}
	}
}

function draw() {
	background(100);
	showPassword();
	showNotificationText();	
}

function showNotificationText() {
	displayCenteredText( notificationText, 30, color('red'), 36 );
}
function showPassword() {
	displayCenteredText( phrase.join(""), height/2 );
}

function displayCenteredText( string, h, c = color('black'), desiredSize = fontSize ) {
	fill(c);
	let w = textWidth(string);
	while( w > width ) {
		desiredSize--;
		textSize(desiredSize);
		w = textWidth(phrase.join);
	}
	text( string, width/2 - w/2, h );
}

function randomWord() {
	let key = "";
	for( let i = 0; i <5; i++ ) {
		key += `${int(random(0,6))+1}`;
	}
	notificationText = key;
	return words.get( key );
}

async function copyToClipboard() {
	if( navigator.clipboard.writeText ) {
		
		t = phrase.join("");
		console.log(`copying to clipboard: ${t}`);
		navigator.clipboard.writeText(t)
			.then( () => notificationText = "copied password to clipboard",
						(e) => notificationText = `Did not write to clipboard: ${e}` );
	}
}

function keyPressed() {
	if( key === "r" ) {
		phrase = [];
	}
	if( key === "c" ) {
		if( keyIsDown(CONTROL) ) {
			copyToClipboard(); 
		} else {
			convertToCamelCase();
		}
	}
	if( key === " " ) {
		phrase.push(randomWord());
	}
	if( key === "d" ) {
		phrase.push( `${int(random(10))}` );
	}
	if( key === "u" ) {
		convertToCapitalized();
	}
	if( key === "s" ) {
		phrase.push( random( ["!","@","#","$","%","^","&","*","(",")","<",">","?","{","}","[","]","-","_","+","=","|"] ));
	}
	redraw();
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertToCapitalized() {
	phrase = phrase.map( capitalize );
}

function convertToCamelCase() {
	phrase = phrase.map( (s,i) => i > 0 ? capitalize(s) : s );
}