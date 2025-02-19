class AppData
{
    #polySynth = new PolySynth();

    constructor() { }

    getDuoSynth() { return this.#polySynth.getDuoSynth(); }
    getFatSynth() { return this.#polySynth.getFatSynth(); }
    getMetalSynth() { return this.#polySynth.getMetalSynth(); }
    getFMSynth() { return this.#polySynth.getFMSynth(); }

    getMultiModeFilter() { return this.#polySynth.getMultiModeFilter(); }

    getDistortionEffect() { return this.#polySynth.getDistortionEffect(); }
    getChebyshevEffect() { return this.#polySynth.getChebyshevEffect(); }
    getVibratoEffect() { return this.#polySynth.getVibratoEffect(); }
    getPhaserEffect() { return this.#polySynth.getPhaserEffect(); }

    getPolySynth() { return this.#polySynth; }
}

const appData = new AppData();

