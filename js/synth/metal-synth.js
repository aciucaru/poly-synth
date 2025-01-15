class MetalSynthMonophonic
{
    #metalSynth = null;

    /* Tells if this synthesizer is enabled.
    ** If it is enabled, then "triggerAttack(note)" will play the note, but if it is disabled,
    ** triggerAttack(note) will ignore the call and won't play anything. */
    #isEnabled = true;

    constructor()
    {
        this.#metalSynth = new Tone.MetalSynth(
            {
                harmonicity: 6.0,
                resonance: 800,
                modulationIndex: 20,
                envelope: { decay: 0.4, },
                volume: -15,
            });

        const vol = new Tone.Volume(0).toDestination(); // 0 dB volume

        this.#metalSynth.connect(vol);
    }

    triggerAttack(note)
    {
        // the note is triggered only if the synth is enabled
        if (this.#isEnabled)
            this.#metalSynth.triggerAttack(note);
    }

    triggerAttackRelease(note, noteDuration)
    {
        // the note is triggered only if the synth is enabled
        if (this.#isEnabled)
            this.#metalSynth.triggerAttackRelease(note, noteDuration);
    }

    triggerRelease(note)
    {
        // we discard the "note" argument in this case, because this is a monophonic synth
        this.#metalSynth.triggerRelease();
    }

    setEnabled(isEnabled)
    {
        this.#isEnabled = isEnabled;
    }

    setModulationIndex(modulationIndex)
    {
        this.#metalSynth.set( { modulationIndex: modulationIndex} );
    }

    setOctaves(octaves)
    {
        this.#metalSynth.set( { octaves: octaves } );
    }

    setResonance(resonance)
    {
        this.#metalSynth.set( { resonance: resonance } );
    }

    setHarmonicity(harmonicity)
    {
        this.#metalSynth.set( { harmonicity: harmonicity } );
    }

    // ADSR envelope *************************************************************************
    setEnvelopeAttackTime(attackTime)
    {
        // this.#metalSynth.set(
        //     {
        //         voice0: { envelope: { attack: attackTime, } },
        //         voice1: { envelope: { attack: attackTime, } },
        //     });
    }

    setEnvelopeDecayTime(decayTime)
    {
        // this.#metalSynth.set(
        //     {
        //         voice0: { envelope: { decay: decayTime, } },
        //         voice1: { envelope: { decay: decayTime, } },
        //     });
    }

    setEnvelopeSustainLevel(sustainLevel)
    {
        // this.#metalSynth.set(
        //     {
        //         voice0: { envelope: { sustain: sustainLevel, } },
        //         voice1: { envelope: { sustain: sustainLevel, } },
        //     });
    }

    setEnvelopeReleaseTime(releaseTime)
    {
        // this.#metalSynth.set(
        //     {
        //         voice0: { envelope: { release: releaseTime, } },
        //         voice1: { envelope: { release: releaseTime, } },
        //     });
    }
}