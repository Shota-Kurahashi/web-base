export function AutoBind(_: any, _2: string, description: PropertyDescriptor) {
  const propertyMethod = description.value;

  const adjDescriptor: PropertyDescriptor = {
    get() {
      const boundFn = propertyMethod.bind(this);
      return boundFn;
    },
  };

  return adjDescriptor;
}
