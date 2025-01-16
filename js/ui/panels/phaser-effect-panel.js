class PhaserEffectPanel
{
    #frequencyKnob = null;
    #baseFrequencyKnob = null;
    #qFactorKnob = null;
    #octavesKnob = null;
    #effectAmountKnob = null;

    constructor()
    {
        const knob1Options = new KnobOptions();
        knob1Options.minValue = 0.001;
        knob1Options.maxValue = 5.0;
        knob1Options.initialValue = 0.001;
        knob1Options.step = 0.01;
        knob1Options.decimals = 2;
        this.#frequencyKnob = new Knob("phaser-effect-frequency-knob", knob1Options);
        this.#frequencyKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getPhaserEffect().setFrequency(newValue);
            });

        const knob2Options = new KnobOptions();
        knob2Options.minValue = 1.0;
        knob2Options.maxValue = 2000;
        knob2Options.initialValue = 1000.0;
        knob2Options.step = 1.0;
        knob2Options.decimals = 2;
        this.#baseFrequencyKnob = new Knob("phaser-effect-base-frequency-knob", knob2Options);
        this.#baseFrequencyKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getPhaserEffect().setBaseFrequency(newValue);
            });

        const knob3Options = new KnobOptions();
        knob3Options.minValue = 0;
        knob3Options.maxValue = 10;
        knob3Options.initialValue = 0;
        knob3Options.step = 1;
        knob3Options.decimals = 0;
        this.#qFactorKnob = new Knob("phaser-effect-octaves-knob", knob3Options);
        this.#qFactorKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getPhaserEffect().setOctaves(newValue);
            });


        const knob4Options = new KnobOptions();
        knob4Options.minValue = 0.001;
        knob4Options.maxValue = 100.0;
        knob4Options.initialValue = 0.001;
        knob4Options.step = 1.0;
        knob4Options.decimals = 0;
        this.#octavesKnob = new Knob("phaser-effect-qfactor-knob", knob4Options);
        this.#octavesKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getPhaserEffect().setQfactor(newValue);
            });

        const knob5Options = new KnobOptions();
        knob5Options.minValue = 0.0;
        knob5Options.maxValue = 1.0;
        knob5Options.initialValue = 0.0;
        knob5Options.step = 0.01;
        knob5Options.decimals = 2;
        this.#effectAmountKnob = new Knob("phaser-effect-wet-level-knob", knob5Options);
        this.#effectAmountKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getPhaserEffect().setWetLevel(newValue);
            });
    }
}

const phaserEffectPanel = new PhaserEffectPanel();