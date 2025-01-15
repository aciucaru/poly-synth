class FMSynthMonophonic
{
    #fmSynth = null;

    #gain = null;

    #octavesOffset = 0;
    #semitonesOffset = 0;

    /* Tells if this synthesizer is enabled.
    ** If it is enabled, then "triggerAttack(note)" will play the note, but if it is disabled,
    ** triggerAttack(note) will ignore the call and won't play anything. */
    #isEnabled = true;

    constructor()
    {
        this.#fmSynth = new Tone.FMSynth(
            {
                harmonicity : 3 ,
                modulationIndex : 10 ,
                detune : 0 ,
                oscillator :
                {
                    type : "sine"
                }
                ,
                envelope :
                {
                    attack : 0.01 ,
                    decay : 0.01 ,
                    sustain : 1 ,
                    release : 0.5
                }
                ,
                modulation :
                {
                    type : "square"
                }
                ,
                modulationEnvelope :
                {
                    attack : 0.5 ,
                    decay : 0 ,
                    sustain : 1 ,
                    release : 0.5
                }
            });

        this.#gain = new Tone.Gain();
        this.#gain.gain.linearRampToValueAtTime(1.0, Tone.now());

        this.#fmSynth.connect(this.#gain);
    }

    // Returns the final node of this synth
    getOutputNode() { return this.#gain; }

    triggerAttack(note)
    {
        // the note is triggered only if the synth is enabled
        if (this.#isEnabled)
            this.#fmSynth.triggerAttack(note);
    }

    triggerAttackRelease(note, noteDuration)
    {
        // the note is triggered only if the synth is enabled
        if (this.#isEnabled)
            this.#fmSynth.triggerAttackRelease(note, noteDuration);
    }

    triggerRelease(note)
    {
        // we discard the "note" argument in this case, because this is a monophonic synth
        this.#fmSynth.triggerRelease();
    }

    setEnabled(isEnabled)
    {
        this.#isEnabled = isEnabled;
    }

    setOctavesOffset(octavesOffset)
    {
        this.#octavesOffset = octavesOffset;

        const totalCentsOffset = this.#octavesOffset * 12 * 100 + this.#semitonesOffset * 100;
        this.#fmSynth.set( { detune: totalCentsOffset } );
    }

    setSemitonesOffset(semitonesOffset)
    {
        this.#semitonesOffset = semitonesOffset;

        const totalCentsOffset = this.#octavesOffset * 12 * 100 + this.#semitonesOffset * 100;
        this.#fmSynth.set( { detune: totalCentsOffset } );
    }

    setHarmonicity(harmonicity)
    {
        this.#fmSynth.set( { harmonicity: harmonicity } );
    }

    setModulationIndex(modulationIndex)
    {
        this.#fmSynth.set( { modulationIndex: modulationIndex} );
    }

    setCarrierOscType(carrierOscType)
    {
        this.#fmSynth.set( { oscillator: { type: carrierOscType } } );
    }

    setModulationOscType(modulationOscType)
    {
        this.#fmSynth.set( { modulation: { type: modulationOscType } } );
    }

    // ADSR for carrier *************************************************************************
    setCarrierEnvelopeAttackTime(attackTime)
    {
        this.#fmSynth.set( { envelope: { attack: attackTime } } );
    }

    setCarrierEnvelopeDecayTime(decayTime)
    {
        this.#fmSynth.set( { envelope: { decay: decayTime } } );
    }

    setCarrierEnvelopeSustainLevel(sustainLevel)
    {
        this.#fmSynth.set( { envelope: { sustain: sustainLevel } } );
    }

    setCarrierEnvelopeReleaseTime(releaseTime)
    {
        this.#fmSynth.set( { envelope: { release: releaseTime, }, } );
    }

    // ADSR for modulator *************************************************************************
    setModulatorEnvelopeAttackTime(attackTime)
    {
        this.#fmSynth.set( { modulationEnvelope: { attack: attackTime } } );
    }

    setModulatorEnvelopeDecayTime(decayTime)
    {
        this.#fmSynth.set( { modulationEnvelope: { decay: decayTime } } );
    }

    setModulatorEnvelopeSustainLevel(sustainLevel)
    {
        this.#fmSynth.set( { modulationEnvelope: { sustain: sustainLevel } } );
    }

    setModulatorEnvelopeReleaseTime(releaseTime)
    {
        this.#fmSynth.set( { modulatioEnvelope: { release: releaseTime, }, } );
    }
}