class ChebyshevEffectPanel
{
    #polynomialOrderKnob = null;
    #effectAmountKnob = null;

    constructor()
    {
        const knob1Options = new KnobOptions();
        knob1Options.minValue = 1;
        knob1Options.maxValue = 100;
        knob1Options.initialValue = 1;
        knob1Options.step = 1;
        knob1Options.decimals = 0;
        this.#polynomialOrderKnob = new Knob("chebyshev-effect-polynomial-order-knob", knob1Options);
        this.#polynomialOrderKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getChebyshevEffect().setPolynomialOrder(newValue);
            });

        const knob2Options = new KnobOptions();
        knob2Options.minValue = 0.0;
        knob2Options.maxValue = 1.0;
        knob2Options.initialValue = 0.0;
        knob2Options.step = 0.01;
        knob2Options.decimals = 2;
        this.#effectAmountKnob = new Knob("chebyshev-effect-wet-level-knob", knob2Options);
        this.#effectAmountKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getChebyshevEffect().setWetLevel(newValue);
            });
    }
}

const chebyshevEffectPanel = new ChebyshevEffectPanel();