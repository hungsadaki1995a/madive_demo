import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsOnlyNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'IsOnlyNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string): boolean {
          return new RegExp(/^[0-9]+$/).test(value);
        },
        defaultMessage: () => {
          return '$property must be only contain number';
        },
      },
    });
  };
}

export function IsOnlyNumberIfRelatedNot(property: string, values: string[], validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      name: 'IsOnlyNumberIfRelatedNot',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: string, args: ValidationArguments): boolean {
          const [relatedPropertyName] = args.constraints;

          const relatedValue = (args.object as any)[relatedPropertyName];

          return !values?.includes(relatedValue) ? new RegExp(/^[0-9]+$/).test(value) : true;
        },
        defaultMessage: () => {
          return 'Please fill this field';
        },
      },
    });
  };
}

export function IsOnlyNumberIfRelatedHas(property: string, values: string[], validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      name: 'IsOnlyNumberIfRelatedHas',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: string, args: ValidationArguments): boolean {
          const [relatedPropertyName] = args.constraints;

          const relatedValue = (args.object as any)[relatedPropertyName];

          return values?.includes(relatedValue) ? new RegExp(/^[0-9]+$/).test(value) : true;
        },
        defaultMessage: () => {
          return 'Please fill this field';
        },
      },
    });
  };
}

export function IsRelatedNotHas(property: string, values: string[], validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      name: 'IsRelatedNotHas',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: string, args: ValidationArguments): boolean {
          const [relatedPropertyName] = args.constraints;

          const relatedValue = (args.object as any)[relatedPropertyName];

          if (!value?.trim()?.length) return !values?.includes(relatedValue);

          return !!value?.trim()?.length;
        },
        defaultMessage: () => {
          return 'Please fill this field';
        },
      },
    });
  };
}

export function IsRelatedHas(property: string, values: string[], validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      name: 'IsRelatedHas',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: string, args: ValidationArguments): boolean {
          const [relatedPropertyName] = args.constraints;

          const relatedValue = (args.object as any)[relatedPropertyName];

          if (!value?.trim()?.length) return values?.includes(relatedValue);

          return !!value?.trim()?.length;
        },
        defaultMessage: () => {
          return 'Please fill this field';
        },
      },
    });
  };
}

export function IsRelatedNotEmpty(
  property: {
    propertyName: string;
    requireFieldWithValue?: {
      fieldName: string;
      fieldValue?: (string | number)[];
    };
  },
  validationOptions: ValidationOptions
) {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      name: 'IsRelatedNotEmpty',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: string, args: ValidationArguments): boolean {
          const [relatedProperty] = args.constraints;
          const relatedValue = (args.object as any)[relatedProperty?.propertyName];
          if (relatedProperty?.requireFieldWithValue?.fieldValue?.length) {
            const relatedOptionValue = (args.object as any)[relatedProperty?.requireFieldWithValue?.fieldName];

            if (relatedProperty?.requireFieldWithValue?.fieldValue?.includes(relatedOptionValue)) {
              if (relatedValue?.trim()?.length) {
                if (!value?.trim()?.length) {
                  return false;
                }
              } else if (!relatedValue?.trim()?.length) return true;
            } else {
              return true;
            }
          }
          return !!value?.trim()?.length;
        },
        defaultMessage: () => {
          return 'Please fill this field';
        },
      },
    });
  };
}

export function IsNotBlank(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string): boolean {
          return typeof value === 'string' && value.trim().length > 0;
        },
      },
    });
  };
}
