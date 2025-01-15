class ToggleButton
{
    // Main class properties, that describe a knob: *************************************************** 
    // callback, that is called when the button is toggled
    #onToggleChange = (isToggled) => { };

    // prop that tells if the toggle button starts in On (true) or Off (false) mode
    #isToggled = false;

    #buttonObj = null;

    constructor(buttonId, isToggled = false)
    {
        this.#buttonObj = document.getElementById(buttonId);

        this.#isToggled = isToggled;

        // Configure visual styles
        this.#buttonObj.classList.add("toggle-button-reset");
        if (this.#isToggled)
            this.#toggleOn();
        else
            this.#toggleOff();

        const handleToggleClickBinded = this.#handleToggleClick.bind(this);

        // Add event listener
        this.#buttonObj.addEventListener("click", handleToggleClickBinded);
    }

    // Sets the event handler
    setOnToggleChange(onToggleChange)
    {
        this.#onToggleChange = onToggleChange;
    }

    #handleToggleClick()
    {
        this.#isToggled = !(this.#isToggled);

        if (this.#isToggled)
            this.#toggleOn();
        else
            this.#toggleOff();

        this.#onToggleChange(this.#isToggled);
    }

    #toggleOn()
    {
        this.#buttonObj.classList.remove("toggle-button-disabled");
        this.#buttonObj.classList.add("toggle-button-enabled");
    }

    #toggleOff()
    {
        this.#buttonObj.classList.remove("toggle-button-enabled");
        this.#buttonObj.classList.add("toggle-button-disabled");
    }
}