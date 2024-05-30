// @ts-check
// NOTE: Set DebugMode to 'true' to enable verbose console output.
var DebugMode = false;
var FormContext;

function OnLoad(executionContext) {
    // Instantiate formContext from the execution context
    FormContext = executionContext.getFormContext();
    if (DebugMode) { LogToConsole("DebugMode is set to 'true'. Verbose logging enabled..."); }
}

// Log to the console only if DebugMode is set to true
function LogToConsole(message) {
    if (message && DebugMode) {
        console.log(message);
    }
}

function concatenateAttributeValues(inputFieldNames, seperatorString, outputFieldName) {

    if (inputFieldNames && inputFieldNames.length() > 0) {
        // initialize our eventual output
        var concatenatedOutputString = "";

        // check if there is a seperation string provided, else use a space.
        seperatorString = seperatorString ? seperatorString : " ";
        var seperatorMessage = seperatorString == " " ? "Not provided, set to default! " : "";
        LogToConsole(seperatorMessage + "Seperator string set to '${seperatorString}'.");

        // transform comma seperated list to array
        var inputFieldNameArray = inputFieldNames.split(",");

        // execute for each field to be concatenated
        inputFieldNameArray.forEach(inputFieldName => {

            // trim the field name in case the user added spaces before or after the comma seperated list
            inputFieldName = inputFieldName.trim();

            // attempt to retrieve the value of the input field
            var inputFieldValue = FormContext.getAttribute(inputFieldName).getValue();

            // check to see if we got a value
            if (inputFieldValue) {
                // handle the first result appropriately
                concatenatedOutputString = concatenatedOutputString == "" ? inputFieldValue : seperatorString + inputFieldValue;
            } else {
                LogToConsole("Could not get value from field '${inputFieldName}'. skipping...");
            }
            // show the progress for debugging purposes
            LogToConsole("Concatenated string is now '${concatenatedOutputString}}'.");
        });

        // if an output field name is provided, set the value to the concatenated string
        if (outputFieldName) {
            FormContext.getAttribute(outputFieldName).setValue(concatenatedOutputString);
        }

        // return a string
        return concatenatedOutputString ? concatenatedOutputString : "";
    }
    else {
        LogToConsole("You must provide the input field names as a comma seperated list.");
    }
}