var verovioToolkit = new verovio.toolkit();

function playKeyboard() {
	
	let data = [];	
	// Checking if MIDI input would work
	window.addEventListener('load', function() {   
	  navigator.requestMIDIAccess().then( 
	    onMIDISuccess, 
	    onMIDIFailure);
	});

// TODO: check/fix scoping of this with MIDI input
	function onMIDISuccess(midiAccess) {
		// TODO: make this only on chrome, otherwise give message re:midi compatability with chrome
	    // document.querySelector('.step0').innerHTML = 'Press any note to begin...';

	    var inputs = midiAccess.inputs;
	    var outputs = midiAccess.outputs;

	    Synth instanceof AudioSynth; // true

	    var testInstance = new AudioSynth;
	    testInstance instanceof AudioSynth; // true

	    testInstance === Synth
	    var piano = Synth.createInstrument('piano');

	    Synth.setVolume(.20);

	    for (var input of midiAccess.inputs.values()) {
	        input.onmidimessage = getMIDIMessage;
	    }
	}

	function onMIDIFailure() {
	    document.querySelector('.step0').innerHTML = 'Error: Could not access MIDI devices. Connect a device and refresh to try again.';
	}

	function getMIDIMessage(message) {
	    let command = message.data[0];
	    let note = message.data[1];
	    // a velocity value might not be included with a noteOff command
	    let velocity = (message.data.length > 2) ? message.data[2] : 0;
	    switch (command) {
	        case 144: // noteOn
	            if (velocity > 0) {
	                noteOnListener(note, velocity);
	            }
	            break;
	        case 128: // noteOff
	            noteOffCallback(note);
	            break;
	        // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
	    }
	}

	// Figure out which octave note to play (for MIDI inputs)
	function pitchToNote(pitch) {
	    const octave = Math.floor((pitch-24)/12);
	    const note = (pitch - 21) % 12;
	    switch (note) {
	        case 0:
	            return ['A', octave];
	        case 1:
	            return ['A#', octave];
	        case 2:
	            return ['B', octave];
	        case 3:
	            return ['C', octave];
	        case 4:
	            return ['C#', octave];
	        case 5:
	            return ['D', octave];
	        case 6:
	            return ['D#', octave];
	        case 7:
	            return ['E', octave];
	        case 8:
	            return ['F', octave];
	        case 9:
	            return ['F#', octave];
	        case 10:
	            return ['G', octave];
	        case 11:
	            return ['G#', octave];
	    }
	}


	// MIDI input in
	function noteOnListener(note, velocity) {
	    var piano = Synth.createInstrument('piano');
	    let noteToPlay = pitchToNote(note);
	    piano.play(noteToPlay[0], noteToPlay[1], 2)
	    fnPlayNote(noteToPlay[0], noteToPlay[1]);
	}

	let pressColor = '#3ca0e7'; //color when key is pressed


	const isMobile = !!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
	if(isMobile) { var evtListener = ['touchstart', 'touchend']; } else { var evtListener = ['mousedown', 'mouseup']; }

	const __audioSynth = new AudioSynth();
	__audioSynth.setVolume(0.5);
	const __octave = 4; //sets position of middle C, normally the 4th octave
	
	// Key bindings, notes to keyCodes.
	const keyboard = {
			/* ` */ 192: 'C,-2', /* 1 */ 49: 'C#,-2', /* q */ 81: 'D,-2', /* 2 */ 50: 'D#,-2',
			/* w */ 87: 'E,-2', /* e */ 69: 'F,-2', /* 4 */ 52: 'F#,-2', /* r */ 82: 'G,-2',
			/* 5 */ 53: 'G#,-2', /* t */ 84: 'A,-2', /* 6 */ 54: 'A#,-2', /* y */ 89: 'B,-2',
			/* u */ 85: 'C,-1', /* 8 */ 56: 'C#,-1', /* i */ 73: 'D,-1', /* 9 */ 57: 'D#,-1',
			/* o */ 79: 'E,-1', /* p */ 80: 'F,-1', /* - */ 189: 'F#,-1', /* [ */ 219: 'G,-1',
			/* = */ 187: 'G#,-1', /* ] */ 221: 'A,-1', /* 0 */ 48: 'A#,-1', /* \ */ 220: 'B,-1',
			/* 3 */ 51: 'C,0', /* a */ 65: 'C#,0', /* z */ 90: 'D,0', /* s */ 83: 'D#,0',
			/* x */ 88: 'E,0', /* c */ 67: 'F,0', /* f */ 70: 'F#,0', /* v */ 86: 'G,0',
			/* g */ 71: 'G#,0', /* b */ 66: 'A,0', /* h */ 72: 'A#,0', /* n */ 78: 'B,0',
			/* m */ 77: 'C,1', /* k */ 75: 'C#,1', /* , */ 188: 'D,1', /* l */ 76: 'D#,1',
			/* . */ 190: 'E,1', /* alt/option */ 18: 'F,1', /* ; */ 186: 'F#,1', /* / */ 191: 'G,1',
			/* ' */ 222: 'G#,1', /* d */ 68: 'A,1', /* j */ 74: 'A#,1', /* /\ */ 37: 'B,1',
		};
	
	let reverseLookupText = {};
	let reverseLookup = {};

	// Create a reverse lookup table
	for(let i in keyboard) {
		// TODO: clean this thoroughly.
		let val;
		switch(i|0) { //some characters don't display like they are supposed to, so need correct values

			case 186: //;
				val = 59;
				break;

			case 187: //equal sign
				val = 61; //???
				break;

			case 191: ///
				val = 47;
				break;
			
			case 188://comma
				val = 44;
				break;

			case 189:
				val = 45;
				break;

			case 219: //open bracket
				val = 91; //left window key
				break;

			case 220:
				val = 92;
				break;
			
			case 221: //close bracket
				val = 93; //select key
				break;

			case 222: //'
				val = 39;
				break;

			case 190: //.
				val = 46; //delete
				break;
			
			default:
				val = i;
				break;
		}
		reverseLookupText[keyboard[i]] = val.toString();
		reverseLookup[keyboard[i]] = i;
	}

	// Keys you've pressed down
	let keysPressed = [];

	// Generate keyboard
	let visualKeyboard = document.getElementById('keyboard');
	let selectSound = {
		value: "0" //piano
	};

	let iKeys = 0;
	let iWhite = 0;
	let notes = __audioSynth._notes; //C, C#, D....A#, B

	for (let i=-2; i <= 1; i++) {
		for (let n in notes) {
			if (n[2] != 'b') {
				let thisKey = document.createElement('div');
				if (n.length > 1) { // adding sharp sign makes 2 characters
					thisKey.className = 'black key'; // 2 classes
					thisKey.style.width = '30px';
					thisKey.style.height = '120px';
					thisKey.style.left = (40 * (iWhite - 1)) + 25 + 'px';
				} else {
					thisKey.className = 'white key';
					thisKey.style.width = '40px';
					thisKey.style.height = '200px';
					thisKey.style.left = 40 * iWhite + 'px';
					iWhite++;
				}

				let label = document.createElement('div');
				label.className = 'label';

				let s = getDispStr(n,i,reverseLookupText);

				// if we wish to have note names displayed, too: 
				label.innerHTML = '<b class="keyLabel">' + s + '</b>' + '<br /><br />' + n.substr(0,1) /*+
					/*'<span name="OCTAVE_LABEL" value="' + i + '">' + (__octave + parseInt(i)) + '</span>' + (n.substr(1,1)?n.substr(1,1):'')*/;
				thisKey.appendChild(label);
				thisKey.setAttribute('ID', 'KEY_' + n + ',' + i);
				thisKey.addEventListener(evtListener[0], (function(_temp) { return function() { fnPlayKeyboard({keyCode:_temp}); } })(reverseLookup[n + ',' + i]));
				visualKeyboard[n + ',' + i] = thisKey;
				visualKeyboard.appendChild(thisKey);
				
				iKeys++;
			}
		}
	}

	visualKeyboard.style.width = iWhite * 40 + 'px';

	window.addEventListener(evtListener[1], function() { n = keysPressed.length; while(n--) { fnRemoveKeyBinding({keyCode:keysPressed[n]}); } });
	
	//returns correct string for display (special cases)
	function getDispStr(n, i, lookup) {

		if (n ==='C' && i === -2) {
			return "~";
		} else if (n === 'F' && i === 1){ 
			return "alt/opt";
		} else if (n === 'B' && i ===1 ){
			return "<-";
		} else {
			return String.fromCharCode(lookup[n + ',' + i]);
		}

	}

	// Detect keypresses, and trigger notes to play
	var fnPlayKeyboard = function(e) {
		let i = keysPressed.length;
		while (i--) {
			if (keysPressed[i]==e.keyCode) {
				return false;	
			}
		}
		keysPressed.push(e.keyCode);

		if (keyboard[e.keyCode]) {
			if (visualKeyboard[keyboard[e.keyCode]]) {
				visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = pressColor;
				visualKeyboard[keyboard[e.keyCode]].style.boxShadow = 'none';
			}
			let arrPlayNote = keyboard[e.keyCode].split(',');
			let note = arrPlayNote[0];
			let octaveModifier = arrPlayNote[1]|0;
			fnPlayNote(note, __octave + octaveModifier);
		} else {
			return false;	
		}
	}
	// Remove key bindings once note is done.
	let fnRemoveKeyBinding = function(e) {
		let i = keysPressed.length;
		while (i--) {
			if (keysPressed[i] === e.keyCode) {
				if (visualKeyboard[keyboard[e.keyCode]]) {
					visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = '';
					visualKeyboard[keyboard[e.keyCode]].style.boxShadow = '';
				}
				keysPressed.splice(i, 1);
			}
		}
	}

	// Delete previous note if backspace is hit 
	$(window).keyup(function(event){
        if (event.keyCode == 8) {
        	data.pop();
        	let notesSVG = paeCodeRender(data, 'G-2', document.body.clientWidth, );
	    	const svgContainerDiv = $('#svgNotesContainer');
	        svgContainerDiv.html(notesSVG);
	        // Resize svg
	        let newHeight = document.getElementById('svgNotesContainer').firstChild.getBoundingClientRect().height;
	    	document.getElementById('svgNotesContainer').style.height = newHeight + "px";
        }
    });
    

	// To render the notes recorded
	function paeCodeRender(paeCode, clef, width, scalePercent) {
	    if (typeof(clef)==='undefined') clef = 'G-2';
	    if (typeof(scalePercent)==='undefined') scalePercent = 80;

	    let data = "@clef:" + clef + "\n";
	    data += "@keysig:" + " " + "\n";
	    data += "@timesig:" + " " + "\n";
	    data += "@data:" + paeCode;

	    let zoom = 80;
		let pageHeight = $(document).height() * 100 / zoom ;
        let pageWidth = $(window).width() * 90 / zoom ;

	    options = {
	        pageHeight: pageHeight,
	        pageWidth: pageWidth,
	        pageMarginRight: 100,
	        scale: scalePercent,
	        adjustPageHeight: true
	    }

	    verovioToolkit.setOptions(options);
	    let notesSVG = verovioToolkit.renderData(data, options);

	    let midiFile = verovioToolkit.renderToMIDI();
	    let song = "data:audio/midi;base64," + midiFile;

	    localStorage.setItem("song", song);

	    return notesSVG;
	}

	// Generates audio for pressed note and returns that to be played
	let fnPlayNote = function(note, octave) {

		src = __audioSynth.generate(selectSound.value, note, octave, 2);
		container = new Audio(src);
		container.addEventListener('ended', function() { container = null; });
		container.addEventListener('loadeddata', function(e) { e.target.play(); });
		container.autoplay = false;
		container.setAttribute('type', 'audio/wav');
		container.load();

		octave = parseInt(octave);
		const clef = 'G-2';
		if (octave === 2) {
			if (data.length === 0) {
				var nicks = ',';
			} else {
				var nicks = '';
			}
		} else if (octave === 3) {
			var nicks = '\'';
		} else if (octave === 4) {
			var nicks = '\'\'';
		} else {
			var nicks = '\'\'\'';
		}
       
        let noteDuration = 4;
        let selectedRadioBox = $("#NoteSelection input[type='radio']:checked");
        if (selectedRadioBox.length > 0) {
            noteDuration = selectedRadioBox.val();
        }

		if (note.length > 1) {
			data.push(nicks + 'x' + noteDuration + octave + note[0]);
		} else {
			data.push(nicks + noteDuration + octave + note);
		}

		// TODO: add time options (current only common time)
		// TODO: fix long notes stuffed in measures (should be a tie)
		
		let lastMeasure = data.slice(data.lastIndexOf('/') + 1, data.length - 1);

		let duration = (1.0 / parseInt(noteDuration));
		
		for (const note in lastMeasure) {
			duration += 1.0 / parseInt(lastMeasure[note][lastMeasure[note].length - 3]);
		}

		if (duration >= 1) {
			duration = 0;
			data.push('/');
		}

		let notesSVG = paeCodeRender(data, clef, document.body.clientWidth, 80);

        //insert thes SVG code into our div
        let svgContainerDiv = $('#svgNotesContainer');
        svgContainerDiv.html(notesSVG);

        // Resize svg
        let newHeight = document.getElementById('svgNotesContainer').firstChild.getBoundingClientRect().height;
	    document.getElementById('svgNotesContainer').style.height = newHeight + "px";

		return container;
	
	};
	window.addEventListener('keydown', fnPlayKeyboard);
	window.addEventListener('keyup', fnRemoveKeyBinding);
}
