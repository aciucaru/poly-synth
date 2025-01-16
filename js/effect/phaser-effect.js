class PhaserEffect
{
    #phaser = null;

    constructor()
    {
        this.#phaser = new Tone.Phaser({
                                        frequency: 1,
                                        octaves: 1,
                                        baseFrequency: 1000
                                    });

        this.setWetLevel(0.0);
    }

    // Returns the final node of this synth
    getOutputNode() { return this.#phaser; }

    // Returns the input node of this synth (it's same as above)
    getInputNode() { return this.#phaser; }

    setFrequency(frequency)
    {
        this.#phaser.frequency.linearRampToValueAtTime(frequency, Tone.now());
    }

    setBaseFrequency(baseFrequency)
    {
        this.#phaser.set({baseFrequency: baseFrequency});
    }

    setQfactor(qFactor)
    {
        this.#phaser.Q.linearRampToValueAtTime(qFactor, Tone.now());
    }

    setOctaves(octaves)
    {
        this.#phaser.set({octaves: octaves});
    }

    setWetLevel(wetLevel)
    {
        this.#phaser.wet.linearRampToValueAtTime(wetLevel, Tone.now());
    }
}