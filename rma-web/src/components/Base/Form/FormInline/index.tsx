import { twMerge } from 'tailwind-merge';
import { formInlineContext } from './FormInlineContext';

type FormInlineProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<'div'>;

function FormInline(props: FormInlineProps) {
  return (
    <formInlineContext.Provider value={true}>
      <div {...props} className={twMerge(['block sm:flex items-center', props.className])}>
        {props.children}
      </div>
    </formInlineContext.Provider>
  );
}

export default FormInline;
