class RadioButtonGroup
{
    // Main class properties, that describe a knob: *************************************************** 
    // callback, that is called when the button is toggled
    #onOptionChange = (selectedOption) => { };

    // #buttonObj = null;

    #radioButtonsArray = [];

    constructor(buttonId, onOptionChange)
    {
        const radioButtonsContainer = document.getElementById(buttonId);

        this.#onOptionChange = onOptionChange;

        const radioArray = radioButtonsContainer.querySelectorAll(".radio-button");

        // Populate the radio buttons array
        radioArray.forEach((radioButton) =>
            {
                this.#radioButtonsArray.push(radioButton);
            });

        const handleOptionSelectBinded = this.#handleOptionSelect.bind(this);

        // Add event listener to each radio button
        for (const radioButton of this.#radioButtonsArray)
        {
            radioButton.addEventListener("change", handleOptionSelectBinded);
        }
    }

    // Sets the event handler
    setOnOptionChange(onOptionChange)
    {
        this.#onOptionChange = onOptionChange;
    }

    #handleOptionSelect(event)
    {
        // Get option value
        const option = event.target.value;
        console.log(`option: ${option}`);

        this.#onOptionChange(option);
    }
}