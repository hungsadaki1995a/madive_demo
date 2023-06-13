import { registerDecorator, ValidationOptions } from 'class-validator';

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
