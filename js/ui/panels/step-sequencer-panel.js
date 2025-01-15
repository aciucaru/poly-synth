class StepNote
{
    isEnabled = false;

    // The HTML object grphically representing an instance of this class
    // This is usually a <button> element
    noteObj = null;

    constructor() { }
}

/* This class describes a single step out of a sequence of steps.
** The step sequencer will contain multiple such steps (normally 16).
** A single "Step" instance will contain an array of multiple "StepNote" instance;  */
class Step
{
    // the order of this step, in the sequence of steps
    index = 0;
    isEnabled = false;
    semitonesOffset = 0;
    showOnAnimation = false; // should show this step while animating ?

    /* The array of available notes; each element of the array corresponds to one note. The array contains all possible
    ** notes for one single step, as boolean values.
    ** This array is not used for any logic, is only for display purposes, to allow the generation of UI steps
    ** by using for loops instead of manually writing each of the 13 x 16 total number of steps. */
    displayNotes = []; // array of booleans

    constructor(containerId, index)
    {
        this.index = index;
        const containerObj = document.getElementById(containerId);

        // Populate array of notes
        const NOTES_PER_SEQUENCER_STEP = 13;
        let noteButton = null;
        // this.dummyDisplayNotes = new Array<boolean>(Settings.notesPerSequencerStep);
        for (let noteIndex = 0; noteIndex < NOTES_PER_SEQUENCER_STEP; noteIndex++)
        {
            // Createa the <button> element
            noteButton = document.createElement("button");
            noteButton.classList.add("button-reset");
            noteButton.classList.add("step-sequencer-step-note");
            noteButton.classList.add("step-sequencer-step-note-off");
            noteButton.classList.add("unselectable");
            noteButton.style.gridColumn = `${this.index + 5} / ${this.index + 6}`;
            noteButton.style.gridRow = `${15 - noteIndex} / ${16 - noteIndex}`;
            noteButton.addEventListener("click", (event) => { this.#setSingleStepNote(noteIndex); });

            // Add the button element to the internal class array
            this.displayNotes.push(noteButton);

            // Add the button to the HTML container
            containerObj.appendChild(noteButton);
        }
    }

        /* This function sets the note of a sequencer step. The sequencer is monophonic, so there can be only
        ** a single note per each step. */
        #setSingleStepNote(noteIndex)
        {
            console.log(`stepNoteToggle(${noteIndex})`);

            // toggle the note to determine the visual aspects of the note (this is for display purposes only)
            // this must be done before we reset all the notes of this step
            const noteVisualState = !(this.displayNotes[noteIndex]);

            // reset all notes of this step
            for (let i = 0; i < this.displayNotes.length; i++)
            {
                this.displayNotes[i] = false;
            }

            // set the visual aspects of the note (this is for display purposes only)
            this.displayNotes[noteIndex] = noteVisualState;

            // set the actual note of the specified step:
            /* compute the note position (notes start from bottom to top, but the 'noteIndex' starts from top to bottom,
            ** so we need to make a conversion) */
            const notesPerStep = 13;
            // this.semitonesOffset = notesPerStep - noteIndex;
            this.semitonesOffset = noteIndex;

            console.log(`stepNoteToggle(): semitones offset = ${this.semitonesOffset}`);
        }

        /* this function toggles a complete step on/off, it basically enables/disables a step regardless of
        ** the note of that step */
        #toggleStep(stepIndex)
        {
            logger.debug(`stepToggle(${stepIndex})`);
        }
}

class StepSequencer
{
    // is the sequencer enabled?
    #isSequencerEnabled = false;

    #isPlaying = false;

    // the tempo of the sequencer, in BPM
    #tempo = 120.0;

    /* the multiplier/divider of the tempo, expressed as an exponent, where the base is 2
    ** For example:
    ** - an exponent of 0 means a multiplier of 2^0 = 1 (no multiplication/change of the tempo)
    ** - an exponent of -1 means a multiplier of 2^(-1) = 0.5, so it's actually a divider and the tempo
    **   will be half as samll
    ** - an exponent of 1 means amultiplier of 2^1 = 2, so the tempo is doubled */ 
    #tempoMultiplierExponent = 0.0;

    // how many steps should be played out of the total number of possible steps
    // default is 8 out of 16
    #playedStepsCount = 8;

    // should the sequencer play without a note being pressed? 
    #latch = false;

    // What note is currently last scheduled?
    #currentNoteIndex = 0;

    // how frequently to call scheduling function (in milisec)
    #lookAheadTime = 25.0; // 25 miliseconds

    /* How far ahead to schedule audio (seconds).
    ** This is calculated from lookahead, and overlaps with next interval (in case the timer is late) */
    #scheduleAheadTime = 0.1; // 0.1 sec = 100 milisec

    // when the next sequencer step is due
    #nextNoteTime = 0.0;

    // the notes that have been put into the web audio, and may or may not have played yet
    // #notesInQueue: Array<{noteIndex: number, time: number}> = new Array<{noteIndex: number, time: number}>();
    #notesInQueue = [];

    /* The main array of on/off steps; this array keeps track of which steps are enabled/disabled and also keeps track
    ** of the currently animated step.
    ** This array is used for the logic of the sequencer and, sometimes, for display purposes. */
    // #sequencerSteps: Array<SequencerStep> = new Array<SequencerStep>(Settings.maxSequencerSteps);
    #sequencerSteps = [];

    static #sequencerStepsCount = 16;

    constructor(containerId)
    {

        this.#initSequencerStepsArray(containerId);
    }

    // initialize the sequencer steps array
    #initSequencerStepsArray(containerId)
    {
        for (let stepIndex = 0; stepIndex < StepSequencer.#sequencerStepsCount; stepIndex++)
        {
            this.#sequencerSteps.push(new Step(containerId, stepIndex));
        }
    }
}

const seq1 = new StepSequencer("dousynth-step-sequencer");