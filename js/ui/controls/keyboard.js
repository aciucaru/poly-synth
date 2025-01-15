class Keyboard
{
    // represents which octave is the first octave of the keyboard
    #startOctave = 2;

    #keyboardContainer = null;

    #isKeyPressed = false;
    #isMousePressed = false;

    // the external event handler called when a key is pressed (but not yet released)
    #onNoteOn = (note) => { };

    // the external event handler called when a key is released
    #onNoteOff = (note) => { };

    constructor(keyboardContainerId, startOctave, onNoteOn, onNoteOff)
    {
        this.#startOctave = startOctave;

        // set event handlers
        this.#onNoteOn = onNoteOn;
        this.#onNoteOff = onNoteOff;

        this.#keyboardContainer = document.getElementById(keyboardContainerId);

        const onKeyDownBinded = this.#onKeyDown.bind(this);
        const onKeyUpBinded = this.#onKeyUp.bind(this);

        // add the event handlers
        window.addEventListener("keydown", onKeyDownBinded);
        window.addEventListener("keyup", onKeyUpBinded);
    }

    #convertNoteToString(octaves, semitones)
    {
        let octaveString = `${octaves}`;
        let semitoneString = "";

        switch (semitones)
        {
            case 0: semitoneString = "C"; break;
            case 1: semitoneString = "C#"; break;
            case 2: semitoneString = "D"; break;
            case 3: semitoneString = "D#"; break;
            case 4: semitoneString = "E"; break;
            case 5: semitoneString = "F"; break;
            case 6: semitoneString = "F#"; break;
            case 7: semitoneString = "G"; break;
            case 8: semitoneString = "G#"; break;
            case 9: semitoneString = "A"; break;
            case 10: semitoneString = "A#"; break;
            case 11: semitoneString = "B"; break;
            default: break;
        }

        return `${semitoneString}${octaveString}`;
    }

    #determineMouseEventNote(noteString)
    {
        // the 'noteString' pattern is note-octave-semitone (e.g. note-0-1, note-4-11, etc.)
        // so we split the string by the '-' character to get individual octave and semitone numbers
        const noteStringWords = noteString.split('-');
        
        // convert the octave and semitone strings into real numbers
        const octave = parseInt(noteStringWords[1]);
        const semitone = parseInt(noteStringWords[2]);

        return this.#convertNoteToString(octave, semitone);
    }

    #onMouseDown(event)
    {
        console.log(`onMouseDown(): pressed note`);

        const target = event.target;

        /* each SVG "key" (a shape) may contain multiple classes, but the first class always represents
        ** the pressed key (e.g: note-0-0, note-0-1), so we get the first class of the clicked element */
        const noteString = target.classList[0];

        if (noteString !== undefined && this.#isMousePressed === false)
        {
            // mark the mouse as being pressed 
            this.#isMousePressed = true;

            target.addEventListener('mouseup', onMouseUp);
            window.addEventListener('mouseup', onMouseUp);

            // target.removeEventListener('click', onClick);

            // required for browser compliance so the audio is resumed after an user interaction
            // voice.resume();

            // Convert the note to be played into Tone.js string format
            const note = this.#determineMouseEventNote(noteString);
            console.log(`onMouseDown(): pressed note: ${noteString}, note: ${note}`);

            // call the event handler (callback) associated with 'key down' event
            this.#onNoteOn(note);
        }
    }

    #onMouseUp(event)
    {
        console.log(`onMouseUp(): released note`);

        if (this.#isMousePressed === true)
        {
            // mark the mouse as not being pressed 
            this.#isMousePressed = false;

            const target = event.target;

            /* each SVG "key" (a shape) may contain multiple classes, but the first class always represents
            ** the pressed key (e.g: note-0-0, note-0-1), so we get the first class of the clicked element */
            const noteString = target.classList[0];

            // Convert the note to be played into Tone.js string format
            const note = this.#determineMouseEventNote(noteString);
            console.log(`onMouseUp(): pressed note: ${noteString}, note: ${note}`);

            this.#onNoteOff(note);

            target.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseup', onMouseUp);

            // target.addEventListener('click', onClick);
        }
    }

    #onKeyDown(event)
    {
        let note = "";
        
        // 'key' is deprecated but still higly supported by browsers, so we try this first
        if (event.key !== undefined && this.#isKeyPressed === false)
        {
            this.#isKeyPressed = true;

            switch(event.key)
            {
                case "a": case "A":
                    note = this.#convertNoteToString(2, 0);
                    this.#onNoteOn(note);
                    break;

                case "w": case "W":
                    note = this.#convertNoteToString(2, 1);
                    this.#onNoteOn(note);
                    break;

                case "s": case "S":
                    note = this.#convertNoteToString(2, 2);
                    this.#onNoteOn(note);
                    break;

                case "e": case "E":
                    note = this.#convertNoteToString(2, 3);
                    this.#onNoteOn(note);
                    break;

                case "d": case "D":
                    note = this.#convertNoteToString(2, 4);
                    this.#onNoteOn(note);
                    break;

                case "f": case "F":
                    note = this.#convertNoteToString(2, 5);
                    this.#onNoteOn(note);
                    break;

                case "t": case "T":
                    note = this.#convertNoteToString(2, 6);
                    this.#onNoteOn(note);
                    break;

                case "g": case "G":
                    note = this.#convertNoteToString(2, 7);
                    this.#onNoteOn(note);
                    break;

                case "y": case "Y":
                    note = this.#convertNoteToString(2, 8);
                    this.#onNoteOn(note);
                    break;

                case "h": case "H":
                    note = this.#convertNoteToString(2, 9);
                    this.#onNoteOn(note);
                    break;

                case "u": case "U":
                    note = this.#convertNoteToString(2, 10);
                    this.#onNoteOn(note);
                    break;

                case "j": case "J":
                    note = this.#convertNoteToString(2, 11);
                    this.#onNoteOn(note);
                    break;

                case "k": case "K":
                    note = this.#convertNoteToString(3, 0);
                    this.#onNoteOn(note);
                    break;

                case "o": case "O":
                    note = this.#convertNoteToString(3, 1);
                    this.#onNoteOn(note);
                    break;

                case "l": case "L":
                    note = this.#convertNoteToString(3, 2);
                    this.#onNoteOn(note);
                    break;

                default:
                    break;
            }
        }
        else if (event.keyCode !== undefined && this.#isKeyPressed === false)
        {
            switch (event.keyCode)
            {
                case 65: // "A":
                    note = this.#convertNoteToString(2, 0);
                    this.#onNoteOn(note);
                    break;

                case 87: // "W":
                    note = this.#convertNoteToString(2, 1);
                    this.#onNoteOn(note);
                    break;

                case 83: // "S":
                    note = this.#convertNoteToString(2, 2);
                    this.#onNoteOn(note);
                    break;

                case 69: // "E":
                    note = this.#convertNoteToString(2, 3);
                    this.#onNoteOn(note);
                    break;

                case 44: // "D":
                    note = this.#convertNoteToString(2, 4);
                    this.#onNoteOn(note);
                    break;

                case 46: // "F":
                    note = this.#convertNoteToString(2, 5);
                    this.#onNoteOn(note);
                    break;

                case 54: // "T":
                    note = this.#convertNoteToString(2, 6);
                    this.#onNoteOn(note);
                    break;

                case 47: // "G":
                    note = this.#convertNoteToString(2, 7);
                    this.#onNoteOn(note);
                    break;

                case 89: // "Y":
                    note = this.#convertNoteToString(2, 8);
                    this.#onNoteOn(note);
                    break;

                case 48: // "H":
                    note = this.#convertNoteToString(2, 9);
                    this.#onNoteOn(note);
                    break;

                case 55: // "U":
                    note = this.#convertNoteToString(2, 10);
                    this.#onNoteOn(note);
                    break;

                case 74: // "J":
                    note = this.#convertNoteToString(2, 11);
                    this.#onNoteOn(note);
                    break;

                case 75: // "K":
                    note = this.#convertNoteToString(3, 0);
                    this.#onNoteOn(note);
                    break;

                case 79: // "O":
                    note = this.#convertNoteToString(3, 1);
                    this.#onNoteOn(note);
                    break;

                case 96: // "L":
                    note = this.#convertNoteToString(3, 2);
                    this.#onNoteOn(note);
                    break;

                default:
                    break;
            }
        }
    }

    #onKeyUp(event)
    {
        console.log(`onKeyeUp(): released key`);

        if (this.#isKeyPressed === true)
        {
            this.#isKeyPressed = false;

        let note = "";
        // 'key' is deprecated but still higly supported by browsers, so we try this first
        if (event.key !== undefined)
            {
                switch(event.key)
                {
                    case "a": case "A":
                        note = this.#convertNoteToString(2, 0);
                        this.#onNoteOff(note);
                        break;
    
                    case "w": case "W":
                        note = this.#convertNoteToString(2, 1);
                        this.#onNoteOff(note);
                        break;
    
                    case "s": case "S":
                        note = this.#convertNoteToString(2, 2);
                        this.#onNoteOff(note);
                        break;
    
                    case "e": case "E":
                        note = this.#convertNoteToString(2, 3);
                        this.#onNoteOff(note);
                        break;
    
                    case "d": case "D":
                        note = this.#convertNoteToString(2, 4);
                        this.#onNoteOff(note);
                        break;
    
                    case "f": case "F":
                        note = this.#convertNoteToString(2, 5);
                        this.#onNoteOff(note);
                        break;
    
                    case "t": case "T":
                        note = this.#convertNoteToString(2, 6);
                        this.#onNoteOff(note);
                        break;
    
                    case "g": case "G":
                        note = this.#convertNoteToString(2, 7);
                        this.#onNoteOff(note);
                        break;
    
                    case "y": case "Y":
                        note = this.#convertNoteToString(2, 8);
                        this.#onNoteOff(note);
                        break;
    
                    case "h": case "H":
                        note = this.#convertNoteToString(2, 9);
                        this.#onNoteOn(note);
                        break;
    
                    case "u": case "U":
                        note = this.#convertNoteToString(2, 10);
                        this.#onNoteOff(note);
                        break;
    
                    case "j": case "J":
                        note = this.#convertNoteToString(2, 11);
                        this.#onNoteOff(note);
                        break;
    
                    case "k": case "K":
                        note = this.#convertNoteToString(3, 0);
                        this.#onNoteOff(note);
                        break;
    
                    case "o": case "O":
                        note = this.#convertNoteToString(3, 1);
                        this.#onNoteOff(note);
                        break;
    
                    case "l": case "L":
                        note = this.#convertNoteToString(3, 2);
                        this.#onNoteOff(note);
                        break;
    
                    default:
                        break;
                }
            }
            else if (event.keyCode !== undefined)
            {
                switch (event.keyCode)
                {
                    case 65: // "A":
                        note = this.#convertNoteToString(2, 0);
                        this.#onNoteOff(note);
                        break;
    
                    case 87: // "W":
                        note = this.#convertNoteToString(2, 1);
                        this.#onNoteOff(note);
                        break;
    
                    case 83: // "S":
                        note = this.#convertNoteToString(2, 2);
                        this.#onNoteOff(note);
                        break;
    
                    case 69: // "E":
                        note = this.#convertNoteToString(2, 3);
                        this.#onNoteOff(note);
                        break;
    
                    case 44: // "D":
                        note = this.#convertNoteToString(2, 4);
                        this.#onNoteOff(note);
                        break;
    
                    case 46: // "F":
                        note = this.#convertNoteToString(2, 5);
                        this.#onNoteOff(note);
                        break;
    
                    case 54: // "T":
                        note = this.#convertNoteToString(2, 6);
                        this.#onNoteOff(note);
                        break;
    
                    case 47: // "G":
                        note = this.#convertNoteToString(2, 7);
                        this.#onNoteOff(note);
                        break;
    
                    case 89: // "Y":
                        note = this.#convertNoteToString(2, 8);
                        this.#onNoteOff(note);
                        break;
    
                    case 48: // "H":
                        note = this.#convertNoteToString(2, 9);
                        this.#onNoteOff(note);
                        break;
    
                    case 55: // "U":
                        note = this.#convertNoteToString(2, 10);
                        this.#onNoteOff(note);
                        break;
    
                    case 74: // "J":
                        note = this.#convertNoteToString(2, 11);
                        this.#onNoteOff(note);
                        break;
    
                    case 75: // "K":
                        note = this.#convertNoteToString(3, 0);
                        this.#onNoteOff(note);
                        break;
    
                    case 79: // "O":
                        note = this.#convertNoteToString(3, 1);
                        this.#onNoteOff(note);
                        break;
    
                    case 96: // "L":
                        note = this.#convertNoteToString(3, 2);
                        this.#onNoteOff(note);
                        break;
    
                    default:
                        break;
                }
            }
        }
        // window.removeEventListener('keyup', onKeyUp);
    }
}