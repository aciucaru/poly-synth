class FMSynthPanel
{
    #onOffButton = null;

    #octavesKnob = null;
    #semitonesKnob = null;

    #harmonicityKnob = null;
    #modulationIndexKnob = null;

    #carrierTypeRadioGroup = null;
    #modulatorTypeRadioGroup = null;

    #carrierADSRAttackFader = null;
    #carrierADSRDecayFader = null;
    #carrierADSRSustainFader = null;
    #carrierADSRReleaseFader = null;

    #modulatorADSRAttackFader = null;
    #modulatorADSRDecayFader = null;
    #modulatorADSRSustainFader = null;
    #modulatorADSRReleaseFader = null;

    constructor()
    {
        this.#onOffButton = new ToggleButton("fmsynth-on-off-button", false);
        this.#onOffButton.setOnToggleChange((isEnabled) =>
            {
                console.log(isEnabled);
                appData.getFMSynth().setEnabled(isEnabled);
            });

        const knob2Options = new KnobOptions();
        knob2Options.minValue = -2;
        knob2Options.maxValue = 2;
        knob2Options.initialValue = 0;
        knob2Options.step = 1;
        knob2Options.decimals = 0;
        this.#octavesKnob = new Knob("fmsynth-octaves-knob", knob2Options);
        this.#octavesKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFMSynth().setOctavesOffset(newValue);
            });

        const knob3Options = new KnobOptions();
        knob3Options.minValue = -12;
        knob3Options.maxValue = 12;
        knob3Options.initialValue = 0;
        knob3Options.step = 1;
        knob3Options.decimals = 0;
        this.#semitonesKnob = new Knob("fmsynth-semitones-knob", knob3Options);
        this.#semitonesKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFMSynth().setSemitonesOffset(newValue);
            });

        const knob4Options = new KnobOptions();
        knob4Options.minValue = 0.01;
        knob4Options.maxValue = 10.0;
        knob4Options.initialValue = 3.0;
        knob4Options.step = 0.1;
        this.#harmonicityKnob = new Knob("fmsynth-harmonicity-knob", knob4Options);
        this.#harmonicityKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFMSynth().setHarmonicity(newValue);
            });

        const knob6Options = new KnobOptions();
        knob6Options.minValue = 1;
        knob6Options.maxValue = 100;
        knob6Options.initialValue = 12;
        knob6Options.step = 1;
        knob6Options.decimals = 0;
        this.#modulationIndexKnob = new Knob("fmsynth-modulation-index-knob", knob6Options);
        this.#modulationIndexKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFMSynth().setModulationIndex(newValue);
            });

        this.#carrierTypeRadioGroup = new RadioButtonGroup("fmsynth-carrier-osc-type");
        this.#carrierTypeRadioGroup.setOnOptionChange((oscType) =>
            {
                console.log(oscType);
                appData.getFMSynth().setCarrierOscType(oscType);
            });

        this.#modulatorTypeRadioGroup = new RadioButtonGroup("fmsynth-modulation-osc-type");
        this.#modulatorTypeRadioGroup.setOnOptionChange((oscType) =>
            {
                console.log(oscType);
                appData.getFMSynth().setModulationOscType(oscType);
            });

        // carrier ADSR envelope ***********************************************************************
        const fader1Options = new VerticalFaderOptions();
        fader1Options.minValue = 0.01; // sec
        fader1Options.maxValue = 1.0; // 1 sec
        fader1Options.initialValue = 0.01; // 10 milisec
        fader1Options.step = 0.1; // seconds
        this.#carrierADSRAttackFader = new VerticalFader("fmsynth-carrier-attack-fader", fader1Options);
        this.#carrierADSRAttackFader.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFMSynth().setCarrierEnvelopeAttackTime(newValue);
            });

        const fader2Options = new VerticalFaderOptions();
        fader2Options.minValue = 0.01; // sec
        fader2Options.maxValue = 1.0; // 1 sec
        fader2Options.initialValue = 0.01; // 300 milisec
        fader2Options.step = 0.1; // seconds
        this.#carrierADSRDecayFader = new VerticalFader("fmsynth-carrier-decay-fader", fader2Options);
        this.#carrierADSRDecayFader.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFMSynth().setCarrierEnvelopeDecayTime(newValue);
            });

        const fader3Options = new VerticalFaderOptions();
        fader3Options.minValue = 0.01; // 0%, normalized percentage
        fader3Options.maxValue = 1.0; // 100%, normalized percentage
        fader3Options.initialValue = 1.0; // 50%
        fader3Options.step = 0.01; // 1%, normalized percentage
        this.#carrierADSRSustainFader = new VerticalFader("fmsynth-carrier-sustain-fader", fader3Options);
        this.#carrierADSRSustainFader.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFMSynth().setCarrierEnvelopeSustainLevel(newValue);
            });

        const fader4Options = new VerticalFaderOptions();
        fader4Options.minValue = 0.01; // sec
        fader4Options.maxValue = 2.0; // 2 sec
        fader4Options.initialValue = 0.5; // 300 milisec
        fader4Options.step = 0.1; // seconds
        this.#carrierADSRReleaseFader = new VerticalFader("fmsynth-carrier-release-fader", fader4Options);
        this.#carrierADSRReleaseFader.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFMSynth().setCarrierEnvelopeReleaseTime(newValue);
            });

        // modulator ADSR envelope ***********************************************************************
        const fader5Options = new VerticalFaderOptions();
        fader5Options.minValue = 0.01; // sec
        fader5Options.maxValue = 1.0; // 1 sec
        fader5Options.initialValue = 0.5; // 500 milisec
        fader5Options.step = 0.1; // seconds
        this.#modulatorADSRAttackFader = new VerticalFader("fmsynth-modulator-attack-fader", fader5Options);
        this.#modulatorADSRAttackFader.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFMSynth().setModulatorEnvelopeAttackTime(newValue);
            });

        const fader6Options = new VerticalFaderOptions();
        fader6Options.minValue = 0.01; // sec
        fader6Options.maxValue = 1.0; // 1 sec
        fader6Options.initialValue = 0.0; // 0 sec
        fader6Options.step = 0.1; // seconds
        this.#modulatorADSRDecayFader = new VerticalFader("fmsynth-modulator-decay-fader", fader6Options);
        this.#modulatorADSRDecayFader.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFMSynth().setModulatorEnvelopeDecayTime(newValue);
            });

        const fader7Options = new VerticalFaderOptions();
        fader7Options.minValue = 0.01; // 0%, normalized percentage
        fader7Options.maxValue = 1.0; // 100%, normalized percentage
        fader7Options.initialValue = 1.0; // 50%
        fader7Options.step = 0.01; // 1%, normalized percentage
        this.#modulatorADSRSustainFader = new VerticalFader("fmsynth-modulator-sustain-fader", fader7Options);
        this.#modulatorADSRSustainFader.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFMSynth().setModulatorEnvelopeSustainLevel(newValue);
            });

        const fader8Options = new VerticalFaderOptions();
        fader8Options.minValue = 0.01; // sec
        fader8Options.maxValue = 2.0; // 2 sec
        fader8Options.initialValue = 0.5; // 500 milisec
        fader8Options.step = 0.1; // seconds
        this.#modulatorADSRReleaseFader = new VerticalFader("fmsynth-modulator-release-fader", fader8Options);
        this.#modulatorADSRReleaseFader.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getFMSynth().setModulatorEnvelopeReleaseTime(newValue);
            });
    }
}

const fmSynthPanel = new FMSynthPanel();