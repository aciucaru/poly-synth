/* This is the main synthesizer.
** It's a monophonic synthesizer which contains multiple synthesizers and effects.
** This is a monophonic synth (it can only play one note at a time) but it's called
** "PolySynth" because it contains multiple synthesizers in one:
** - DuoSynth
** - FatSynth
** - FMSynth */
class PolySynth
{
    #duoSynth = new DuoSynthMonophonic();
    #fatSynth = new FatSynthMonophonic();
    #fmSynth = new FMSynthMonophonic();

    #multiModeFilter = new MultiModeFilter();

    #distortionEffect = new DistortionEffect();

    constructor()
    {
        this.#duoSynth.setEnabled(true);
        this.#fmSynth.setEnabled(false);
        this.#fatSynth.setEnabled(false);

        // Connect synths to filter
        this.#multiModeFilter.connectInput(this.#duoSynth);
        this.#multiModeFilter.connectInput(this.#fatSynth);
        this.#multiModeFilter.connectInput(this.#fmSynth);

        // Connect filter to distortion effect
        this.#multiModeFilter.getOutputNode().connect(this.#distortionEffect.getInputNode());

        this.#distortionEffect.getOutputNode().toDestination();
    }

    triggerAttack(note)
    {
        this.#duoSynth.triggerAttack(note);
        this.#fatSynth.triggerAttackRelease(note); // FatSynth has different trigger
        this.#fmSynth.triggerAttack(note);
    }

    triggerAttackRelease(note, noteDuration)
    {
        this.#duoSynth.triggerAttackRelease(note, noteDuration);
        this.#fatSynth.triggerAttackRelease(note); // FatSynth has different trigger
        this.#fmSynth.triggerAttackRelease(note, noteDuration);
    }

    triggerRelease(note)
    {
        this.#duoSynth.triggerRelease();
        this.#fatSynth.triggerRelease(note); // FatSynth has different trigger
        this.#fmSynth.triggerRelease();
    }

    getDuoSynth() { return this.#duoSynth; }
    getFatSynth() { return this.#fatSynth; }
    getFMSynth() { return this.#fmSynth; }
    getMultiModeFilter() { return this.#multiModeFilter; }
    getDistortionEffect() { return this.#distortionEffect; }
}