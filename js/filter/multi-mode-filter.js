class MultiModeFilter
{
    #lowPassFilter = null;
    #notchFilter = null;
    #highPassFilter = null;

    #lowPassFilterGain = null;
    #notchFilterGain = null;
    #highPassFilterGain = null;

    #finalGain = null;

    #notchWeight = 0.3;
    #lowPassWeight = (1.0 - this.#notchWeight) * 1.0;
    #highPassWeight = (1.0 - this.#notchWeight) * 0.0;

    constructor()
    {
        // Instantiate and set filter nodes
        this.#lowPassFilter = new Tone.Filter(4000, "lowpass");
        this.#notchFilter = new Tone.Filter(4000, "notch");
        this.#highPassFilter = new Tone.Filter(4000, "highpass");

        // Instantiate and set gain nodes
        this.#lowPassFilterGain = new Tone.Gain();
        this.#lowPassFilterGain.gain.linearRampToValueAtTime(this.#lowPassWeight, Tone.now());

        this.#notchFilterGain = new Tone.Gain();
        this.#notchFilterGain.gain.linearRampToValueAtTime(this.#notchWeight, Tone.now());

        this.#highPassFilterGain = new Tone.Gain();
        this.#highPassFilterGain.gain.linearRampToValueAtTime(this.#highPassWeight, Tone.now());

        this.#finalGain = new Tone.Gain();
        this.#finalGain.gain.linearRampToValueAtTime(1.0, Tone.now());

        // Connenct filters output to their corresponding gain nodes
        this.#lowPassFilter.connect(this.#lowPassFilterGain);
        this.#notchFilter.connect(this.#notchFilterGain);
        this.#highPassFilter.connect(this.#highPassFilterGain);

        this.#lowPassFilterGain.connect(this.#finalGain);
        this.#notchFilterGain.connect(this.#finalGain);
        this.#highPassFilterGain.connect(this.#finalGain);
    }

    // Returns the final node of this synth
    getOutputNode() { return this.#finalGain; }

    connectInput(input)
    {
        input.getOutputNode().connect(this.#lowPassFilter);
        input.getOutputNode().connect(this.#notchFilter);
        input.getOutputNode().connect(this.#highPassFilter);
    }

    setModeWeight(weight)
    {
        const REMAINING_WEIGHT = 1.0 - this.#notchWeight;
        this.#lowPassWeight = (1.0 - weight) * REMAINING_WEIGHT;
        this.#highPassWeight = weight * REMAINING_WEIGHT;

        this.#lowPassFilterGain.gain.linearRampToValueAtTime(this.#lowPassWeight, Tone.now());
        this.#highPassFilterGain.gain.linearRampToValueAtTime(this.#highPassWeight, Tone.now());
    }

    setCutoffFrequency(frequency)
    {
        this.#lowPassFilter.frequency.setValueAtTime(frequency, Tone.now());
        this.#notchFilter.frequency.setValueAtTime(frequency, Tone.now());
        this.#highPassFilter.frequency.setValueAtTime(frequency, Tone.now());
    }

    setQFactor(qFactor)
    {
        this.#lowPassFilter.Q.setValueAtTime(qFactor, Tone.now());
        this.#notchFilter.Q.setValueAtTime(qFactor, Tone.now());
        this.#highPassFilter.Q.setValueAtTime(qFactor, Tone.now());
    }
}