class DistortionEffectPanel
{
    #distortionKnob = null;
    #effectAmountKnob = null;

    constructor()
    {
        const knob1Options = new KnobOptions();
        knob1Options.minValue = 0.0;
        knob1Options.maxValue = 1.0;
        knob1Options.initialValue = 0.5;
        knob1Options.step = 0.01;
        knob1Options.decimals = 2;
        this.#distortionKnob = new Knob("distortion-effect-distortion-knob", knob1Options);
        this.#distortionKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getDistortionEffect().setDistortion(newValue);
            });

        const knob2Options = new KnobOptions();
        knob2Options.minValue = 0.0;
        knob2Options.maxValue = 1.0;
        knob2Options.initialValue = 0.0;
        knob2Options.step = 0.01;
        knob2Options.decimals = 2;
        this.#effectAmountKnob = new Knob("distortion-effect-wet-level-knob", knob2Options);
        this.#effectAmountKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getDistortionEffect().setWetLevel(newValue);
            });
    }
}

const distortionEffectPanel = new DistortionEffectPanel();