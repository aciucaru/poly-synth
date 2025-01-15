const onNoteOn = (note) =>
{
    console.log(`note on: ${note}`);

    appData.getPolySynth().triggerAttack(note);
};

const onNoteOff = (note) =>
{
    console.log(`note off: ${note}`);

    appData.getPolySynth().triggerRelease();
};

const keyboard = new Keyboard("keyboard", 2, onNoteOn, onNoteOff);
