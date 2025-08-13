import "@/assets/css/vendors/litepicker.css";
import { createRef, useEffect, useRef } from "react";
import { setValue, init, reInit } from "./litepicker";
import LitepickerJs from "litepicker";
import { FormInput } from "@/components/Base/Form";
import { ILPConfiguration } from "litepicker/dist/types/interfaces";

export interface LitepickerElement extends HTMLInputElement {
  litePickerInstance: LitepickerJs;
}

type LitepickerConfig = Partial<ILPConfiguration>;

export interface LitepickerProps
  extends React.PropsWithChildren,
    Omit<React.ComponentPropsWithoutRef<"input">, "onChange"> {
  options: {
    format?: string | undefined;
  } & LitepickerConfig;
  onChange: (e: {
    target: {
      value: string;
    };
  }) => void;
  value?: string;
  getRef?: (el: LitepickerElement) => void;
}

function Litepicker({
  options = {},
  value = "",
  onChange = () => {},
  getRef = () => {},
  ...computedProps
}: LitepickerProps) {
  const props = {
    options: options,
    value: value,
    onChange: onChange,
    getRef: getRef,
  };
  const initialRender = useRef(true);
  const litepickerRef = createRef<LitepickerElement>();
  const tempValue = useRef(props.value);

  useEffect(() => {
    if (litepickerRef.current) {
      props.getRef(litepickerRef.current);
    }

    if (initialRender.current) {
      setValue(props);
      if (litepickerRef.current !== null) {
        init(litepickerRef.current, props);
      }
      initialRender.current = false;
    } else {
      if (tempValue.current !== props.value && litepickerRef.current !== null) {
        reInit(litepickerRef.current, props);
      }
    }

    tempValue.current = props.value;
  }, [props.value]);

  return (
    <FormInput
      ref={litepickerRef}
      type="text"
      value={props.value}
      onChange={(e) => {
        if (props.onChange) {
          props.onChange(e);
        }
      }}
      {...computedProps}
    />
  );
}

export default Litepicker;
