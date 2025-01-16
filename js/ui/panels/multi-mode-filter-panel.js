class MultiModeFilterPanel
{
    #filterModeWeightKnob = null;
    #filterCutoffFreqKnob = null;
    #filterQFactorKnob = null;

    constructor()
    {
        const knob1Options = new KnobOptions();
        knob1Options.minValue = 0.0;
        knob1Options.maxValue = 1.0;
        knob1Options.initialValue = 0.0;
        knob1Options.step = 0.01;
        knob1Options.decimals = 2;
        this.#filterModeWeightKnob = new Knob("multimode-filter-mode-weigth-knob", knob1Options);
        this.#filterModeWeightKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getMultiModeFilter().setModeWeight(newValue);
            });

        const knob2Options = new KnobOptions();
        knob2Options.minValue = 10.0;
        knob2Options.maxValue = 8000.0;
        knob2Options.initialValue = 4000.0;
        knob2Options.step = 1;
        knob2Options.decimals = 0;
        this.#filterCutoffFreqKnob = new Knob("multimode-filter-frequency-knob", knob2Options);
        this.#filterCutoffFreqKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getMultiModeFilter().setCutoffFrequency(newValue);
            });

        const knob3Options = new KnobOptions();
        knob3Options.minValue = 0.001;
        knob3Options.maxValue = 100.0;
        knob3Options.initialValue = 0.001;
        knob3Options.step = 1.0;
        knob3Options.decimals = 0;
        this.#filterQFactorKnob = new Knob("multimode-filter-qfactor-knob", knob3Options);
        this.#filterQFactorKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getMultiModeFilter().setQFactor(newValue);
            });
    }
}

const multiModeFilterPanel = new MultiModeFilterPanel();