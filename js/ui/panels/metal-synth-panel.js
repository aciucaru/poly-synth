class MetalSynthPanel
{
    #onOffButton = null;

    #harmonicityKnob = null;
    #resonanceKnob = null;

    #modulationIndexKnob = null;
    #octavesKnob = null;

    constructor()
    {
        this.#onOffButton = new ToggleButton("metalsynth-on-off-button", false);
        this.#onOffButton.setOnToggleChange((isEnabled) =>
            {
                console.log(isEnabled);
                appData.getMetalSynth().setEnabled(isEnabled);
            });

        const knob1Options = new KnobOptions();
        knob1Options.minValue = 0.1;
        knob1Options.maxValue = 10.0;
        knob1Options.initialValue = 6.0;
        knob1Options.step = 0.1;
        this.#harmonicityKnob = new Knob("metalsynth-harmonicity-knob", knob1Options);
        this.#harmonicityKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getMetalSynth().setHarmonicity(newValue);
            });

        const knob2Options = new KnobOptions();
        knob2Options.minValue = 0.0;
        knob2Options.maxValue = 7000.0;
        knob2Options.initialValue = 800.0;
        knob2Options.step = 10;
        knob2Options.decimals = 0;
        this.#resonanceKnob = new Knob("metalsynth-resonance-knob", knob2Options);
        this.#resonanceKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getMetalSynth().setResonance(newValue);
            });

        const knob3Options = new KnobOptions();
        knob3Options.minValue = 1;
        knob3Options.maxValue = 100;
        knob3Options.initialValue = 20;
        knob3Options.step = 1;
        knob3Options.decimals = 0;
        this.#modulationIndexKnob = new Knob("metalsynth-modulation-index-knob", knob3Options);
        this.#modulationIndexKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getMetalSynth().setModulationIndex(newValue);
            });

        const knob4Options = new KnobOptions();
        knob4Options.minValue = 0;
        knob4Options.maxValue = 8;
        knob4Options.initialValue = 1;
        knob4Options.step = 1;
        knob4Options.decimals = 0;
        this.#octavesKnob = new Knob("metalsynth-octaves-knob", knob4Options);
        this.#octavesKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getMetalSynth().setOctaves(newValue);
            });
    }
}

// const metalSynthPanel = new MetalSynthPanel();