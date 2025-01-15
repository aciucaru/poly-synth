/* Monophonic synthesizer which contains all the previously defined synthesizers.
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

    constructor()
    {
        this.#duoSynth.setEnabled(true);
        this.#fmSynth.setEnabled(false);
        this.#fatSynth.setEnabled(false);
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
}