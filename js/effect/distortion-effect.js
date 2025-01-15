class DistortionEffect
{
    #distortion = null;

    constructor()
    {
        this.#distortion = new Tone.Distortion(0.5);
    }

    // Returns the final node of this synth
    getOutputNode() { return this.#distortion; }

    // Returns the input node of this synth (it's same as above)
    getInputNode() { return this.#distortion; }

    setDistortion(distortion)
    {
        this.#distortion.distortion = distortion;
    }

    setWetLevel(wetLevel)
    {
        this.#distortion.wet.linearRampToValueAtTime(wetLevel, Tone.now());
    }
}