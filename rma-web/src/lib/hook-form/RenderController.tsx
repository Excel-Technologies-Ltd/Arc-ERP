import React, { JSXElementConstructor } from 'react';
import { Control, FieldValues, Path, Controller } from 'react-hook-form';

export const RenderController = <T extends FieldValues>(
  control: Control<T>,
  name: Path<T>,
  Component:
    | React.ComponentType<any>
    | React.ReactElement<any, string | JSXElementConstructor<any>>
    | React.ReactNode
): React.ReactElement => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // Check if Component is a JSX element
        if (React.isValidElement(Component)) {
          const originalOnChange = Component.props.onChange;
          return React.cloneElement(Component as React.ReactElement<any>, {
            ...field,
            // Merge onChange handlers
            onChange: (value: any) => {
              // Call the component's original onChange if it exists
              if (originalOnChange) {
                originalOnChange(value);
              }
              // Always call the field's onChange to update react-hook-form
              field.onChange(value);
            },
          });
        }

        // Otherwise, treat it as a component type
        const ComponentAsType = Component as React.ComponentType<any>;
        return (
          <ComponentAsType
            {...field}
            value={field.value ?? undefined}
            onChange={(value: any) => {
              field.onChange(value);
            }}
          />
        );
      }}
    />
  );
};
