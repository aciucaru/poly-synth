class VerticalFaderOptions
{
    // the min. and max. absolute values the knob is supossed to set
    minValue = 0.0;
    maxValue = 1.0;
    // the initial value the knob is set to
    initialValue = 0.5;

    // a factor by which the stored value is multiplied; for display only
    displayFactor = 1.0;

    // the steps with which the knob value increments/decrements
    step = 0.1;

    // how many decimals should the displayed value have
    decimals = 2;

    width = 40;
    height = 150;
    thumbHeight = 25;
}

class VerticalFader
{
    // Main class properties: ***************************************************************************
    // the title
    #label = "";

    // the min. and max. absolute values the knob is supossed to set
    #minValue = 0.0;
    #maxValue = 1.0;
    // the initial value the knob is set to
    #initialValue = 0.5;

    // a factor by which the stored value is multiplied; for display only
    #displayFactor = 1.0;

    // the steps with which the knob value increments/decrements
    #step = 0.1;

    // how many decimals should the displayed value have
    #decimals = 2;

    #width = 40;
    #height = 150;
    #thumbHeight = 25;

    /* the event handler (callback) prop the knob will call when it's rotated
    ** this event receives the new value set by the knob */
    #onValueChange = (newValue) => { };

    // the fader thumb element which the user uses to slide and change the value
    #faderThumbObj = null;

    /* the div prefill, which comes before the thumb, which has a variable height and give
    ** the ilussion that the thumb (which comes after the prefill) is moving;
    ** in reality, the thumb is never changing, but the div before it is changing it's height; */
    #faderThumbPrefillObj = null;

    // the label and numeric value HTML elements
    #labelObj = null;
    // #numericValueObj = null;

    // Auxiliary class properties for internal use: ****************************************************
    /* Binded versions of the "onMouseDown()", "onMouseMove()", "onMouseUp()" class methods, which are
    ** supposed to be used as event handlers.
    **    But, when passed as argument to the event listener, these class methods loose their 'this' context,
    ** so we make a binded version of each of these methods, binded methods which are binded to the class
    ** 'this' object. */
    #onMouseDownBinded = (event) => { };
    #onMouseMoveBinded = (event) => { };
    #onMouseUpBinded = (event) => { };

    // if the numeric value should be displayed or not; default is true
    #showValue = false;

    /* the number of steps that were set while turning the knob (can be positive or negative);
    ** it gets multiplied by the step value and added to the initial value after releasing
    ** the mouse (mouseup event);
    ** it is used in multiple functions, this is why it has a higher scope */
    #currentIncrementedSteps = 0;

    // the actual numerical value set through the knob, in absolute form (from minValue to maxValue)
    #absoluteValue = 0;

    // the string representation of the absolute value (used to display the value below the knob)
    #absoluteValueString = "";

    // the new absolute value, which is only set when the mouse releases (mouseup event)
    #newAbsoluteValue = 0;

    /* the Y value of the mouse in the moment it was pressed (but not released);
    ** it has a higer scope because it's set in 'onMouseDown()' but read in 'onMouseMove()' event handler */
    #onMouseDownY = 0.0;

    #prefillHeight = 0;
    #newPrefillHeight = 0;

    constructor(faderContainerId, options = new VerticalFaderOptions())
    {
        const faderContainer = document.getElementById(faderContainerId);
        
        // element.querySelector() returns the first child of 'element' that matches
        this.#faderThumbObj = faderContainer.querySelector('.vertical-fader-thumb');
        this.#faderThumbPrefillObj = faderContainer.querySelector('.vertical-fader-thumb-prefill');

        this.#labelObj = faderContainer.querySelector('.vertical-fader-label');
        this.#label = this.#labelObj.innerText;

        this.#copyFromOptionsObject(options);

        this.#init();

        this.#faderThumbPrefillObj.style.height = this.#newPrefillHeight + "px";

        /* The "onMouse..." functions of this class will be passed as event handlers
        ** but, as functions passed as arguments, they will loose their original 'this' object,
        ** which refers to the 'this' of this class.
        **    So we create binded version of this class inner event handlers, which are correctly
        ** binded to this class 'this'. These binded functions will be passed as event handlers. */
        this.#onMouseDownBinded = this.#onMouseDown.bind(this);
        this.#onMouseMoveBinded = this.#onMouseMove.bind(this);
        this.#onMouseUpBinded = this.#onMouseUp.bind(this);

        /* Add the main event handler to the canvas.
        ** This event handler will itself add other event handlers */
        this.#faderThumbObj.addEventListener("mousedown", this.#onMouseDownBinded);
    }

    // Sets the event handler
    setOnValueChange(onValueChange)
    {
        this.#onValueChange = onValueChange;
    }

    #copyFromOptionsObject(options)
    {
        this.#labelObj.innerText = this.#label;

        // the min. and max. absolute values the knob is supossed to set
        this.#minValue = options.minValue;
        this.#maxValue = options.maxValue;
        // the initial value the knob is set to
        this.#initialValue = options.initialValue;
    
        // a factor by which the stored value is multiplied; for display only
        this.#displayFactor = options.displayFactor;
    
        // the steps with which the knob value increments/decrements
        this.#step = options.step;
    
        // how many decimals should the displayed value have
        this.#decimals = options.decimals;
    
        this.#width = options.width;
        this.#height = options.height;
        this.#thumbHeight = options.thumbHeight;
    }

    #init()
    {
        this.#absoluteValue = this.#initialValue;
        this.#newAbsoluteValue = this.#initialValue;
        this.#absoluteValueString = `${ (this.#displayFactor * this.#absoluteValue).toFixed(this.#decimals)}`;

        this.#showLabelOnly();

        // check if the initial value is inside bounds and truncate, if neccessary
        if (this.#initialValue < this.#minValue)
            this.#initialValue = this.#minValue;

        if (this.#initialValue > this.#maxValue)
            this.#initialValue = this.#maxValue;

        this.#absoluteValue = this.#initialValue;
        this.#newAbsoluteValue = this.#initialValue;

        const PREFILL_MAX_HEIGHT = this.#height - this.#thumbHeight;
        const initialNormalizedValue = (this.#initialValue - this.#minValue) / (this.#maxValue - this.#minValue);

        this.#prefillHeight = PREFILL_MAX_HEIGHT * (1.0 - initialNormalizedValue);
        this.#newPrefillHeight = PREFILL_MAX_HEIGHT * (1.0 - initialNormalizedValue);
    }

    #showLabelOnly()
    {
        // Set label to proper style
        this.#labelObj.classList.remove("vertical-fader-numeric-value");
        this.#labelObj.classList.add("vertical-fader-label");

        // Change text to label text
        this.#labelObj.innerText = this.#label;
    }

    #showNumericValueOnly()
    {
        // Set label to proper style
        this.#labelObj.classList.remove("vertical-fader-label");
        this.#labelObj.classList.add("vertical-fader-numeric-value");

        // Change text to numeric value text
        this.#labelObj.innerText = this.#absoluteValueString;
    }

    #onMouseDown(event)
    {
        console.log("fader mouse down");
        this.#onMouseDownY = event.clientY;

        this.#faderThumbObj.addEventListener('mousemove', this.#onMouseMoveBinded);
        this.#faderThumbObj.addEventListener('mouseup', this.#onMouseUpBinded);

        window.addEventListener('mousemove', this.#onMouseMoveBinded);
        window.addEventListener('mouseup', this.#onMouseUpBinded);
    }

    #onMouseMove(event)
    {
        // Show only numerical value while moving fader thumb
        this.#showValue = true;
        this.#showNumericValueOnly();

        // how many steps are between minValue and maxValue
        const STEP_COUNT = Math.floor((this.#maxValue - this.#minValue) / this.#step) + 1;

        const PREFILL_MAX_HEIGHT = this.#height - this.#thumbHeight;

        // how many pixels the mouse must move up or down to change the value by 1 step
        const PIXELS_PER_STEP = PREFILL_MAX_HEIGHT / STEP_COUNT;

        // the Y value when the mouse is moving; this is waht actually changes everytime the user moves the mouse
        const onMouseMoveY = event.clientY;

        // find out how mouch the mouse has moved (in pixels) relative to the mousedown event;
        // this is measured in "absolute mode" (e.g. pixels) and is always positive
        const mouseYMovement = Math.abs(this.#onMouseDownY - onMouseMoveY);

        // find how many steps the mouse moved
        this.#currentIncrementedSteps = Math.floor(mouseYMovement / PIXELS_PER_STEP);

        // then check the direction of the movement: up or down
        if (onMouseMoveY < this.#onMouseDownY) // if mouse was moved up
        {
            // when the mouse moves up, the value should increase
            this.#newAbsoluteValue = this.#absoluteValue + this.#currentIncrementedSteps * this.#step;

            this.#newPrefillHeight = this.#prefillHeight - mouseYMovement;

            // truncate the prefill height if it's too small (negative)
            if (this.#newPrefillHeight < 0)
            {
                this.#newPrefillHeight = 0;
            }
        }
        else // mouse was moved down
        {
            // when the mouse moves down, the value should decrease
            this.#newAbsoluteValue = this.#absoluteValue - this.#currentIncrementedSteps * this.#step;

            this.#newPrefillHeight = this.#prefillHeight + mouseYMovement;

            // truncate the prefill height if it's too big
            if (this.#newPrefillHeight > PREFILL_MAX_HEIGHT)
            {
                this.#newPrefillHeight = PREFILL_MAX_HEIGHT;
            }
        }

        // truncate the knob value to it's bounds
        if (this.#newAbsoluteValue < this.#minValue)
            this.#newAbsoluteValue = this.#minValue;

        if (this.#newAbsoluteValue > this.#maxValue)
            this.#newAbsoluteValue = this.#maxValue;

        /* and recompute the string version of the absolute value
        ** the numeric value inside the string is multiplied witht the display factor, so it
        ** could be larger or smaller than the actual stored absolute value */
        this.#absoluteValueString = `${ (this.#displayFactor * this.#newAbsoluteValue).toFixed(this.#decimals) }`;

        // Update the element that displays the numerical value
        this.#labelObj.innerText = this.#absoluteValueString;

        // // call the event handler (callback) and pass it the new value
        this.#onValueChange(this.#newAbsoluteValue);

        // change the thumb preffil height to give the ilussion that the thumb is moving
        this.#faderThumbPrefillObj.style.height = this.#newPrefillHeight + "px";
    }

    // this function should only remove event listeners 
    #onMouseUp(event)
    {
        // Only show label on mouse up (after mouse has been released)
        this.#showValue = false;
        this.#showLabelOnly();

        // assign new value
        this.#absoluteValue = this.#newAbsoluteValue;

        // keep the thumb prefill latest height
        this.#prefillHeight = this.#newPrefillHeight;
        this.#faderThumbPrefillObj.style.height = this.#newPrefillHeight + "px";

        // reset the increment in steps
        this.#currentIncrementedSteps = 0;

        this.#faderThumbObj.removeEventListener('mousemove', this.#onMouseMoveBinded);
        this.#faderThumbObj.removeEventListener('mouseup', this.#onMouseUpBinded);

        window.removeEventListener('mousemove', this.#onMouseMoveBinded);
        window.removeEventListener('mouseup', this.#onMouseUpBinded);
    }
}