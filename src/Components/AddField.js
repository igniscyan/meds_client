import React, { useState } from "react";
import { Button, Input, Checkbox } from "@nextui-org/react";

const AddField = ({ name }) => {
  const [showingField, setShowingField] = useState(false);
  const [items, setItems] = useState("");
  const [saveToDB, setSaveToDB] = useState(false);

  const handleSubmit = () => {
    // Generate array of new items
    setItems((curr) => {
      if (typeof items === "string") curr = items.split(",");
      console.log(curr);
      return curr;
    });
  };

  return (
    <>
      {/* Button goes here */}
      <Button onPress={() => setShowingField(!showingField)}>
        {showingField ? `Hide 'Add ${name}' Menu` : `Add ${name}`}
      </Button>

      {showingField && (
        <>
          <p>
            Please enter each {name} in a comma-separated list (i.e.,
            "item1,item2,item3...")
          </p>
          {/* Text Field goes here */}
          <Input
            value={items}
            label={`List of ${name}s`}
            aria-label={`list of ${name}s`}
            onChange={(e) => setItems(e.target.value)}
          />
          <Checkbox
            isDisabled={false}
            checked={saveToDB}
            onChange={(checked) => setSaveToDB(checked)}
            aria-label="save for future use">
            Save for Future Use?
          </Checkbox>
          <Button onPress={handleSubmit}>Submit</Button>
        </>
      )}
    </>
  );
};

export default AddField;
