class VibratoEffect
{
    #vibrato = null;

    constructor()
    {
        this.#vibrato = new Tone.Vibrato(5, 0.1);
        this.#vibrato.type = "sine";

    }

    // Returns the final node of this synth
    getOutputNode() { return this.#vibrato; }

    // Returns the input node of this synth (it's same as above)
    getInputNode() { return this.#vibrato; }

    setFrequency(frequency)
    {
        this.#vibrato.frequency.linearRampToValueAtTime(frequency, Tone.now());
    }

    setDepth(depth)
    {
        this.#vibrato.depth.linearRampToValueAtTime(depth, Tone.now());
    }

    setOscType(oscType)
    {
        this.#vibrato.type = oscType;
    }

    setWetLevel(wetLevel)
    {
        this.#vibrato.wet.linearRampToValueAtTime(wetLevel, Tone.now());
    }
}