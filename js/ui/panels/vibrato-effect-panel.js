class VibratoEffectPanel
{
    #vibratoFrequencyKnob = null;
    #vibratoDepthKnob = null;
    #effectAmountKnob = null;

    #oscillatorTypeRadioGroup = null;

    constructor()
    {
        const knob1Options = new KnobOptions();
        knob1Options.minValue = 0.01;
        knob1Options.maxValue = 15;
        knob1Options.initialValue = 0.01;
        knob1Options.step = 0.1;
        knob1Options.decimals = 2;
        this.#vibratoFrequencyKnob = new Knob("vibrato-effect-frequency-knob", knob1Options);
        this.#vibratoFrequencyKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getVibratoEffect().setFrequency(newValue);
            });

        const knob2Options = new KnobOptions();
        knob2Options.minValue = 0.0;
        knob2Options.maxValue = 1.0;
        knob2Options.initialValue = 0.0;
        knob2Options.step = 0.01;
        knob2Options.decimals = 2;
        this.#vibratoDepthKnob = new Knob("vibrato-effect-depth-knob", knob2Options);
        this.#vibratoDepthKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getVibratoEffect().setDepth(newValue);
            });

        const knob3Options = new KnobOptions();
        knob3Options.minValue = 0.0;
        knob3Options.maxValue = 1.0;
        knob3Options.initialValue = 0.0;
        knob3Options.step = 0.01;
        knob3Options.decimals = 2;
        this.#effectAmountKnob = new Knob("vibrato-effect-wet-level-knob", knob3Options);
        this.#effectAmountKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getVibratoEffect().setWetLevel(newValue);
            });

        this.#oscillatorTypeRadioGroup = new RadioButtonGroup("vibrato-effect-osc-type");
        this.#oscillatorTypeRadioGroup.setOnOptionChange((oscType) =>
            {
                console.log(oscType);
                appData.getVibratoEffect().setOscType(oscType);
            });
    }
}

const vibratoEffectPanel = new VibratoEffectPanel();