function Input(props) {
  // Get the value from the event and change username state
  const handleInputChange = (event) => {
    props.setUsername(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Enter username here..."
      />
    </>
  );
}

export default Input;
