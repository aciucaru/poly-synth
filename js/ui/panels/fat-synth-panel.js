class FatSynthPanel
{
    #onOffButton = null;

    #oscillatorOctavesOffsetKnob = null;
    #oscillatorSemitonesOffsetKnob = null;

    #oscillatorCountKnob = null;
    #oscillatorSpreadKnob = null;

    #oscillatorTypeRadioGroup = null;
    #noteDurationRadioGroup = null;

    constructor()
    {
        this.#onOffButton = new ToggleButton("fatsynth-on-off-button", false);
        this.#onOffButton.setOnToggleChange((isEnabled) =>
            {
                console.log(isEnabled);
                appData.getFatSynth().setEnabled(isEnabled);
            });

        const knob1Options = new KnobOptions();
        knob1Options.minValue = -2;
        knob1Options.maxValue = 2;
        knob1Options.initialValue = 0;
        knob1Options.step = 1;
        knob1Options.decimals = 0;
        this.#oscillatorOctavesOffsetKnob = new Knob("fatsynth-octaves-knob", knob1Options);
        this.#oscillatorOctavesOffsetKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFatSynth().setOctavesOffset(newValue);
            });

        const knob2Options = new KnobOptions();
        knob2Options.minValue = -12;
        knob2Options.maxValue = 12;
        knob2Options.initialValue = 0;
        knob2Options.step = 1;
        knob2Options.decimals = 0;
        this.#oscillatorSemitonesOffsetKnob = new Knob("fatsynth-semitones-knob", knob2Options);
        this.#oscillatorSemitonesOffsetKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFatSynth().setSemitonesOffset(newValue);
            });

        const knob3Options = new KnobOptions();
        knob3Options.minValue = 1;
        knob3Options.maxValue = 7;
        knob3Options.initialValue = 3;
        knob3Options.step = 1;
        knob3Options.decimals = 0;
        this.#oscillatorCountKnob = new Knob("fatsynth-count-knob", knob3Options);
        this.#oscillatorCountKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFatSynth().setCount(newValue);
            });

        const knob4Options = new KnobOptions();
        knob4Options.minValue = 0.0; // spread is in cents
        knob4Options.maxValue = 50.0; // spread is in cents
        knob4Options.initialValue = 30.0; // spread is in cents
        knob4Options.step = 0.1;
        this.#oscillatorSpreadKnob = new Knob("fatsynth-spread-knob", knob4Options);
        this.#oscillatorSpreadKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFatSynth().setSpread(newValue);
            });

        this.#oscillatorTypeRadioGroup = new RadioButtonGroup("fatsynth-osc-type");
        this.#oscillatorTypeRadioGroup.setOnOptionChange((oscType) =>
            {
                console.log(oscType);
                appData.getFatSynth().setShape(oscType);
            });

        this.#noteDurationRadioGroup = new RadioButtonGroup("fatsynth-note-duration");
        this.#noteDurationRadioGroup.setOnOptionChange((noteDuration) =>
            {
                console.log(noteDuration);
                appData.getFatSynth().setNoteDuration(noteDuration);
            });
    }
}

const fatSynthPanel = new FatSynthPanel();