class FatSynthMonophonic
{
    #fatSynth = null;

    #octavesOffset = 0;
    #semitonesOffset = 0;

    /* This synth does not work well with individual 'attack' and 'release', so we use
    ** triggerAttackRelease() which also requires a note duration. */
    #noteDuration = "2n";

    /* Tells if this synthesizer is enabled.
    ** If it is enabled, then "triggerAttack(note)" will play the note, but if it is disabled,
    ** triggerAttack(note) will ignore the call and won't play anything. */
    #isEnabled = true;
    
    constructor()
    {
        const polyphony = 1; // monophonic
        this.#fatSynth = new Tone.PolySynth( Tone.Synth,
            {
                oscillator:
                {
                    type: "fatsawtooth",
                    count: 7,
                    spread: 30,
                },
                envelope:
                {
                    attack: 1.0,
                    decay: 0.1,
                    sustain: 0.2,
                    release: 0.01,
                    attackCurve: "exponential",
                },
            });
        this.#fatSynth.set({polyphony: 1});

        // Reset the oscillator to just 3 simultaneous unison oscillators
        this.#fatSynth.set( {
                                oscillator: { count: 3, }
                            });

        const vol = new Tone.Volume(0).toDestination(); // 0 dB volume

        this.#fatSynth.connect(vol);
    }

    // Does not work nicely with this synth, should use "triggerAttackRelease()" instead
    triggerAttack(note)
    {
        // the note is triggered only if the synth is enabled
        if (this.#isEnabled)
            this.#fatSynth.triggerAttack(note);
    }

    triggerAttackRelease(note)
    {
        // the note is triggered only if the synth is enabled
        if (this.#isEnabled)
            this.#fatSynth.triggerAttackRelease(note, this.#noteDuration);
    }

    triggerRelease(note)
    {
        // we use the "note" argument in this case, because this is a polyphonic synth 
        this.#fatSynth.triggerRelease(note);
    }

    setEnabled(isEnabled)
    {
        this.#isEnabled = isEnabled;
    }

    setOctavesOffset(octavesOffset)
    {
        this.#octavesOffset = octavesOffset;

        const totalCentsOffset = this.#octavesOffset * 12 * 100 + this.#semitonesOffset * 100;
        this.#fatSynth.set( { oscillator: { detune: totalCentsOffset } } );
    }

    setSemitonesOffset(semitonesOffset)
    {
        this.#semitonesOffset = semitonesOffset;

        const totalCentsOffset = this.#octavesOffset * 12 * 100 + this.#semitonesOffset * 100;
        this.#fatSynth.set( { oscillator: { detune: totalCentsOffset } } );
    }

    setCount(oscillatorCount)
    {
        this.#fatSynth.set( { oscillator: { count: oscillatorCount } } );
    }

    setSpread(oscillatorSpread)
    {
        this.#fatSynth.set( { oscillator: { spread: oscillatorSpread } } );
    }

    setShape(oscillatorShape)
    {
        this.#fatSynth.set( { oscillator: { type: oscillatorShape } } );
    }

    setNoteDuration(noteDuration)
    {
        this.#noteDuration = noteDuration;
    }
}