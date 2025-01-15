class AppData
{
    #polySynth = new PolySynth();

    constructor() { }

    getDuoSynth() { return this.#polySynth.getDuoSynth(); }
    getFatSynth() { return this.#polySynth.getFatSynth(); }
    getMetalSynth() { return this.#polySynth.getMetalSynth(); }
    getFMSynth() { return this.#polySynth.getFMSynth(); }

    getPolySynth() { return this.#polySynth; }
}

const appData = new AppData();

