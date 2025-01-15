class DuoSynthPanel
{
    #onOffButton = null;

    #vibratoRateKnob = null;
    #harmonicityKnob = null;

    #voice1VolumeKnob = null;
    #voice1OscTypeRadioGroup = null;

    #voice2VolumeKnob = null;
    #voice2OscTypeRadioGroup = null;

    #adsrAttackFader = null;
    #adsrDecayFader = null;
    #adsrSustainFader = null;
    #adsrReleaseFader = null;

    constructor()
    {
        this.#onOffButton = new ToggleButton("duosynth-on-off-button", true);
        this.#onOffButton.setOnToggleChange((isEnabled) =>
            {
                console.log(isEnabled);
                appData.getDuoSynth().setEnabled(isEnabled);
            });

        const knob2Options = new KnobOptions();
        knob2Options.minValue = 0.0;
        knob2Options.maxValue = 10.0;
        knob2Options.initialValue = 0.0;
        knob2Options.step = 0.1;
        this.#vibratoRateKnob = new Knob("duosynth-vibrato-rate-knob", knob2Options);
        this.#vibratoRateKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getDuoSynth().setVibratoRate(newValue);
            });

        const knob3Options = new KnobOptions();
        knob3Options.minValue = 0.1;
        knob3Options.maxValue = 8.0;
        knob3Options.initialValue = 1.0; // no change
        knob3Options.step = 0.5;
        this.#harmonicityKnob = new Knob("duosynth-harmonicity-knob", knob3Options);
        this.#harmonicityKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getDuoSynth().setHarmonicity(newValue);
            });

        const knob4Options = new KnobOptions();
        knob4Options.minValue = -20.0; // volume is in dB
        knob4Options.maxValue = -6.0; // volume is in dB
        knob4Options.initialValue = -12.0; // volume is in dB
        knob4Options.step = 0.1;
        this.#voice1VolumeKnob = new Knob("duosynth-voice-1-volume-knob", knob4Options);
        this.#voice1VolumeKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getDuoSynth().setVoice0Volume(newValue);
            });

        const knob6Options = new KnobOptions();
        knob6Options.minValue = -20.0; // volume is in dB
        knob6Options.maxValue = -6.0; // volume is in dB
        knob6Options.initialValue = -12.0; // volume is in dB
        knob6Options.step = 0.1;
        this.#voice2VolumeKnob = new Knob("duosynth-voice-2-volume-knob", knob6Options);
        this.#voice2VolumeKnob.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getDuoSynth().setVoice1Volume(newValue);
            });

        this.#voice1OscTypeRadioGroup = new RadioButtonGroup("duo-synth-voice-1-osc-type");
        this.#voice1OscTypeRadioGroup.setOnOptionChange((oscType) =>
            {
                console.log(oscType);
                appData.getDuoSynth().setVoice0OscillatorType(oscType);
            });

        this.#voice2OscTypeRadioGroup = new RadioButtonGroup("duo-synth-voice-2-osc-type");
        this.#voice2OscTypeRadioGroup.setOnOptionChange((oscType) =>
            {
                console.log(oscType);
                appData.getDuoSynth().setVoice1OscillatorType(oscType);
            });

        const fader1Options = new VerticalFaderOptions();
        fader1Options.minValue = 0.01; // sec
        fader1Options.maxValue = 1.0; // 1 sec
        fader1Options.initialValue = 0.01; // 10 milisec
        fader1Options.step = 0.1; // seconds
        this.#adsrAttackFader = new VerticalFader("duo-synth-volume-attack-fader", fader1Options);
        this.#adsrAttackFader.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getDuoSynth().setVolumeEnvelopeAttackTime(newValue);
            });

        const fader2Options = new VerticalFaderOptions();
        fader2Options.minValue = 0.01; // sec
        fader2Options.maxValue = 1.0; // 1 sec
        fader2Options.initialValue = 0.3; // 300 milisec
        fader2Options.step = 0.1; // seconds
        this.#adsrDecayFader = new VerticalFader("duo-synth-volume-decay-fader", fader2Options);
        this.#adsrDecayFader.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getDuoSynth().setVolumeEnvelopeDecayTime(newValue);
            });

        const fader3Options = new VerticalFaderOptions();
        fader3Options.minValue = 0.01; // 0%, normalized percentage
        fader3Options.maxValue = 1.0; // 100%, normalized percentage
        fader3Options.initialValue = 0.5; // 50%
        fader3Options.step = 0.01; // 1%, normalized percentage
        this.#adsrSustainFader = new VerticalFader("duo-synth-volume-sustain-fader", fader3Options);
        this.#adsrSustainFader.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getDuoSynth().setVolumeEnvelopeSustainLevel(newValue);
            });

        const fader4Options = new VerticalFaderOptions();
        fader4Options.minValue = 0.01; // sec
        fader4Options.maxValue = 2.0; // 2 sec
        fader4Options.initialValue = 0.3; // 300 milisec
        fader4Options.step = 0.1; // seconds
        this.#adsrReleaseFader = new VerticalFader("duo-synth-volume-release-fader", fader4Options);
        this.#adsrReleaseFader.setOnValueChange((newValue) =>
            {
                console.log(newValue);
                appData.getDuoSynth().setVolumeEnvelopeReleaseTime(newValue);
            });
    }
}

const duoSynthPanel = new DuoSynthPanel();