export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(validatableInput: Validatable) {
  let isValidate = true;

  if (validatableInput.required) {
    isValidate =
      isValidate && validatableInput.value.toString().trim().length !== 0;
  }

  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValidate =
      isValidate &&
      validatableInput.value.toString().length > validatableInput.minLength;
  }

  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValidate =
      isValidate &&
      validatableInput.value.toString().length <= validatableInput.maxLength;
  }

  if (validatableInput.min && typeof validatableInput.value === "number") {
    isValidate = isValidate && validatableInput.value >= validatableInput.min;
  }

  if (validatableInput.max && typeof validatableInput.value === "number") {
    isValidate = isValidate && validatableInput.value <= validatableInput.max;
  }

  return isValidate;
}
