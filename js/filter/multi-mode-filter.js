class MultiModeFilter
{
    #lowPassFilter = null;
    #notchFilter = null;
    #highPassFilter = null;

    #lowPassFilterGain = null;
    #notchFilterGain = null;
    #highPassFilterGain = null;

    #notchWeight = 0.3;
    #lowPassWeight = (1.0 - this.#notchWeight);
    #highPassWeight = 0.0;

    constructor()
    {
        // Instantiate and set filter nodes
        this.#lowPassFilter = new Tone.Filter();
        this.#lowPassFilter.frequency.setValueAtTime(4000, Tone.now());

        this.#notchFilter = new Tone.Filter();
        this.#notchFilter.frequency.setValueAtTime(4000, Tone.now());

        this.#highPassFilter = new Tone.Filter();
        this.#highPassFilter.frequency.setValueAtTime(4000, Tone.now());

        // Instantiate and set gain nodes
        this.#lowPassFilterGain = new Tone.gain();
        this.#lowPassFilterGain.gain.linearRampToValueAtTime(this.#lowPassWeight, Tone.now());

        this.#notchFilterGain = new Tone.gain();
        this.#notchFilterGain.gain.linearRampToValueAtTime(this.#notchWeight, Tone.now());

        this.#highPassFilterGain = new Tone.gain();
        this.#highPassFilterGain.gain.linearRampToValueAtTime(this.#highPassWeight, Tone.now());

        // Connenct filters output to their corresponding gain nodes
        this.#lowPassFilter.connect(this.#lowPassFilterGain);
        this.#notchFilter.connect(this.#notchFilterGain);
        this.#highPassFilter.connect(this.#highPassFilterGain);
    }

    setModeWeight(weight)
    {
        const REMAINING_WEIGHT = 1.0 - this.#notchWeight;
        this.#lowPassWeight = weight * REMAINING_WEIGHT;
        this.#highPassWeight = (1.0 - weight) * REMAINING_WEIGHT;

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