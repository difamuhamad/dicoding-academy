export const customValidation = (event) => {
  event.target.setCustomValidity("");

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("This field cannot be empty!");
    return;
  }
  if (event.target.validity.tooLong) {
    event.target.setCustomValidity("Reached of maxsimum character");
    return;
  }
};
