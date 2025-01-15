class DuoSynthMonophonic
{
    #duoSynth = null;

    #gain = null;

    /* Tells if this synthesizer is enabled.
    ** If it is enabled, then "triggerAttack(note)" will play the note, but if it is disabled,
    ** triggerAttack(note) will ignore the call and won't play anything. */
    #isEnabled = true;
    
    constructor()
    {
        this.#duoSynth = new Tone.DuoSynth();

        this.#gain = new Tone.Gain();
        this.#gain.gain.linearRampToValueAtTime(1.0, Tone.now());

        this.#duoSynth.connect(this.#gain);

        // The vibrato amount is fixed (any value from 0.5 to 1.0 gives visible results)
        this.#duoSynth.set( { vibratoAmount: 0.5 } );

        // Set the volume of the two voices of the synth
        this.#duoSynth.set( { voice0: { volume : -12.0} } );
        this.#duoSynth.set( { voice1: { volume : -12.0} } );
    }

    // Returns the final node of this synth
    getOutputNode() { return this.#gain; }

    triggerAttack(note)
    {
        // the note is triggered only if the synth is enabled
        if (this.#isEnabled)
            this.#duoSynth.triggerAttack(note);
    }

    triggerAttackRelease(note, noteDuration)
    {
        // the note is triggered only if the synth is enabled
        if (this.#isEnabled)
            this.#duoSynth.triggerAttackRelease(note, noteDuration);
    }

    triggerRelease(note)
    {
        // we discard the "note" argument in this case, because this is a monophonic synth
        this.#duoSynth.triggerRelease();
    }

    setEnabled(isEnabled)
    {
        this.#isEnabled = isEnabled;
    }

    setGain(gain)
    {
        this.#gain.gain.linearRampToValueAtTime(gain, Tone.now());
    }

    setVibratoRate(vibratoRate)
    {
        this.#duoSynth.set( { vibratoRate: vibratoRate } );
    }

    setHarmonicity(harmonicity)
    {
        this.#duoSynth.set( {harmonicity: harmonicity} );
    }

    setVoice0Volume(volume)
    {
        this.#duoSynth.set( { voice0: { volume: volume} } );
    }

    setVoice1Volume(volume)
    {
        this.#duoSynth.set( { voice1: { volume: volume} } );
    }

    setVoice0OscillatorType(oscType)
    {
        this.#duoSynth.set( { voice0: { oscillator : { type: oscType }} });
    }

    setVoice1OscillatorType(oscType)
    {
        this.#duoSynth.set( { voice1: { oscillator : { type: oscType }} });
    }

    // ADSR envelope *************************************************************************
    setVolumeEnvelopeAttackTime(attackTime)
    {
        this.#duoSynth.set(
            {
                voice0: { envelope: { attack: attackTime, } },
                voice1: { envelope: { attack: attackTime, } },
            });
    }

    setVolumeEnvelopeDecayTime(decayTime)
    {
        this.#duoSynth.set(
            {
                voice0: { envelope: { decay: decayTime, } },
                voice1: { envelope: { decay: decayTime, } },
            });
    }

    setVolumeEnvelopeSustainLevel(sustainLevel)
    {
        this.#duoSynth.set(
            {
                voice0: { envelope: { sustain: sustainLevel, } },
                voice1: { envelope: { sustain: sustainLevel, } },
            });
    }

    setVolumeEnvelopeReleaseTime(releaseTime)
    {
        this.#duoSynth.set(
            {
                voice0: { envelope: { release: releaseTime, } },
                voice1: { envelope: { release: releaseTime, } },
            });
    }
}