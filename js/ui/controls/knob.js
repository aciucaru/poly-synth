class KnobOptions
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

    // the width and height of the knob (and the canvas)
    knobWidth = 50;

    constructor() { }
}

/* Class that represents the UI concept of a rotational knob. It is conected to some HTHML
** elements and the connection is made based upon the id of the container of those elements.
**    The elements should look like this:
    <div id="knob-01" class="knob-container">
        <canvas width="50" height="50" class="knob-canvas unselectable"></canvas>
        <div id="knob-01-label" class="knob-label unselectable"></div>
        <div id="knob-01-numeric-value" class="knob-numeric-value unselectable"></div>
    </div>
**    As we can see, only the main container must have an id, while the rest of the HTML elements
** should have well defined class names (but no id):
** - class "knob-canvas" for the <canvas> elements
** - class "knob-label" for label <div> element
** - class "knob-numeric-value" for the numeric value <div> element */
class Knob
{
    // Main class properties, that describe a knob: ***************************************************
    // the label of the knob
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

    // the width and height of the knob (and the canvas)
    #knobWidth = 50;

    #onValueChange = (newValue) => { };

    #canvasObj = null;
    #context2D = null;
    #labelObj = null;

    // Auxiliary class properties for internal use: ****************************************************
    #onMouseDownBinded = (event) => { };
    #onMouseMoveBinded = (event) => { };
    #onMouseUpBinded = (event) => { };

    /*    The number of steps that were set while turning the knob (can be positive or negative);
    ** it gets multiplied by the step value and added to the initial value after releasing
    ** the mouse (mouseup event);
    **    It is used in multiple functions, this is why it has a higher scope */
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

    constructor(knobContainerId, options = new KnobOptions())
    {
        const knobContainer = document.getElementById(knobContainerId);
        
        // element.querySelector() returns the first child of 'element' that matches
        this.#canvasObj = knobContainer.querySelector('.knob-canvas');
        this.#context2D = this.#canvasObj.getContext("2d");

        this.#labelObj = knobContainer.querySelector('.knob-label');
        this.#label = this.#labelObj.innerText;


        this.#copyFromOptionsObject(options);

        this.#init();

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
        this.#canvasObj.addEventListener("mousedown", this.#onMouseDownBinded);

        // Draw knob initial pointer
        this.#drawCanvas();
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
    
        // the width and height of the knob (and the canvas)
        this.#knobWidth = options.knobWidth;
    }

    #init()
    {
        this.#absoluteValue = this.#initialValue;
        this.#absoluteValueString = `${ (this.#displayFactor * this.#newAbsoluteValue).toFixed(this.#decimals) }`;

        this.#showLabelOnly();

        // check if the initial value is inside bounds and truncate, if neccessary
        if (this.#initialValue < this.#minValue)
            this.#initialValue = this.#minValue;

        if (this.#initialValue > this.#maxValue)
            this.#initialValue = this.#maxValue;

        this.#absoluteValue = this.#initialValue;
        this.#newAbsoluteValue = this.#initialValue;
    }

    #showLabelOnly()
    {
        // Set label to proper style
        this.#labelObj.classList.remove("knob-numeric-value");
        this.#labelObj.classList.add("knob-label");

        // Change text to label text
        this.#labelObj.innerText = this.#label;
    }

    #showNumericValueOnly()
    {
        // Set label to proper style
        this.#labelObj.classList.remove("knob-label");
        this.#labelObj.classList.add("knob-numeric-value");

        // Change text to numeric value text
        this.#labelObj.innerText = this.#absoluteValueString;
    }

    #onMouseDown(event)
    {
        // Update Y coord. from mouse
        this.#onMouseDownY = event.clientY;

        this.#canvasObj.addEventListener('mousemove', this.#onMouseMoveBinded);
        this.#canvasObj.addEventListener('mouseup', this.#onMouseUpBinded);

        window.addEventListener('mousemove', this.#onMouseMoveBinded);
        window.addEventListener('mouseup', this.#onMouseUpBinded);
    }

    #onMouseMove(event)
    {
        // Show only numerical value while moving knob pointer
        this.#showNumericValueOnly();

        const WIDTH = this.#knobWidth;
        const HEIGHT = this.#knobWidth;
        
        // how many steps are between minValue and maxValue
        const STEP_COUNT = Math.floor((this.#maxValue - this.#minValue) / this.#step) + 1;

        /* the height in pixels that the mouse must move to change the value by 100% (up or down);
        ** changing the value by 100% means changing the value by (maxValue - minValue);
        ** basically, when the mouse moves with MAX_MOUSE_MOVEMENT pixels, the value of the knob changes by
        ** the maximum amount (maxValue - minValue) and when the mouse does not move at all (0), the value
        ** of the knob does not change either;
        ** so, when mouse movement = 0, the value change = 0
        **     when mouse movement = MAX_MOUSE_MOVEMENT, the value change = (maxValue - minValue), maximum possible */
        const MAX_MOUSE_MOVEMENT = 2 * HEIGHT;

        // how many pixels the mouse must move up or down to change the value by 1 step
        const PIXELS_PER_STEP = MAX_MOUSE_MOVEMENT / STEP_COUNT;

        // the Y value when the mouse is moving; this is waht actually changes everytime the user moves the mouse
        // const onMouseMoveY = (event as MouseEvent).clientY;
        const onMouseMoveY = event.clientY;

        // find out how mouch the mouse has moved (in pixels) relative to the mousedown event;
        // this is measured in "absolute mode" (e.g. pixels) and is always positive
        const mouseYMovement = Math.abs(this.#onMouseDownY - onMouseMoveY);

        // find how many steps the mouse moved
        this.#currentIncrementedSteps = Math.floor(mouseYMovement / PIXELS_PER_STEP);

        // then check the direction of the movement: up or down
        if (onMouseMoveY < this.#onMouseDownY) // mouse was moved up
            // when the mouse moves up, the value should increase
            this.#newAbsoluteValue = this.#absoluteValue + this.#currentIncrementedSteps * this.#step;
        else // mouse was moved down
            // when the mouse moves down, the value should decrease
            this.#newAbsoluteValue = this.#absoluteValue - this.#currentIncrementedSteps * this.#step;

        // truncate knob value to it's bounds
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

        // call the event handler (callback) and pass it the new value
        this.#onValueChange(this.#newAbsoluteValue);

        // redraw the knob pointer
        this.#drawCanvas();  
    }

    // this function should only remove event listeners 
    #onMouseUp(event)
    {
        // Only show label on mouse up (after mouse has been released)
        this.#showLabelOnly();

        // assign new value
        this.#absoluteValue = this.#newAbsoluteValue;

        // reset the increment in steps
        this.#currentIncrementedSteps = 0;

        this.#canvasObj.removeEventListener('mousemove', this.#onMouseMoveBinded);
        this.#canvasObj.removeEventListener('mouseup', this.#onMouseUpBinded);

        window.removeEventListener('mousemove', this.#onMouseMoveBinded);
        window.removeEventListener('mouseup', this.#onMouseUpBinded);
    }

    #drawCanvas()
    {
        if (this.#context2D)
        {
            const WIDTH = this.#knobWidth;
            const HEIGHT = this.#knobWidth;

            // the width and height of the knob black rectangular pointer
            const POINTER_INNER_DIAM = 0.1 * WIDTH;
            const POINTER_OUTER_DIAM = 0.6 * WIDTH;
            const POINTER_WIDTH = POINTER_OUTER_DIAM / 2.0 - POINTER_INNER_DIAM / 2.0;
            const POINTER_HEIGHT = 0.06 * WIDTH;

            // the radius of the circle on which the knob pointer orbits, should always be smaller than half the canvas width;
            // basically, it's the radius of the orbit of the knob pointer
            const POINTER_CENTER_RADIUS = (POINTER_INNER_DIAM + POINTER_OUTER_DIAM) / 4.0;

            // the width and height of the knob white rectangular mark
            const MARK_INNER_DIAM = 1.15 * POINTER_INNER_DIAM;
            const MARK_OUTER_DIAM = 0.85 * POINTER_OUTER_DIAM;
            const MARK_WIDTH = MARK_OUTER_DIAM / 2.0 - MARK_INNER_DIAM / 2.0;
            const MARK_HEIGHT = 0.4 * POINTER_HEIGHT;

            // the angles correponding to min and max position (in radians)
            const startAngle = 120 * Math.PI / 180.0;
            const endAngle = 420 * Math.PI / 180.0;

            // the 'normalized' value of the knob (e.g. the value between 0.0 and 1.0)
            const normalizedValue = (this.#newAbsoluteValue - this.#minValue) / (this.#maxValue - this.#minValue);

            const pointerAngle = startAngle * (1.0 - normalizedValue) + endAngle * normalizedValue;
            const pointerCenterX = WIDTH / 2.0 + Math.cos(pointerAngle) * POINTER_CENTER_RADIUS;
            const pointerCenterY = HEIGHT / 2.0 + Math.sin(pointerAngle) * POINTER_CENTER_RADIUS;

            // before every drawing, clear the previous drawing
            this.#context2D.clearRect(0, 0, WIDTH, HEIGHT);

            // apply translation and rotation
            this.#context2D.translate(pointerCenterX, pointerCenterY);
            this.#context2D.rotate(pointerAngle);

            // draw main black rectangle
            this.#context2D.fillStyle = `hsla(0, 0%, 10%, 0.8)`;
            this.#context2D.fillRect(-POINTER_WIDTH / 2.0, -POINTER_HEIGHT / 2.0, POINTER_WIDTH, POINTER_HEIGHT);

            // draw white mark
            this.#context2D.fillStyle = `hsl(0, 0%, 80%)`;
            this.#context2D.fillRect(-MARK_WIDTH / 2.0, -MARK_HEIGHT / 2.0, MARK_WIDTH, MARK_HEIGHT);

            // reset transformation matrix to the identity matrix
            this.#context2D.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
}