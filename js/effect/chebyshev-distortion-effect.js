class ChebyshevDistortionEffect
{
    #chebyshevDistortion = null;

    constructor()
    {
        this.#chebyshevDistortion = new Tone.Chebyshev(1); // default polynomial order is 1 (no effect)
        this.setWetLevel(0.0);
    }

    // Returns the final node of this synth
    getOutputNode() { return this.#chebyshevDistortion; }

    // Returns the input node of this synth (it's same as above)
    getInputNode() { return this.#chebyshevDistortion; }

    setPolynomialOrder(polynomialOrder)
    {
        this.#chebyshevDistortion.order = polynomialOrder;
    }

    setWetLevel(wetLevel)
    {
        this.#chebyshevDistortion.wet.linearRampToValueAtTime(wetLevel, Tone.now());
    }
}