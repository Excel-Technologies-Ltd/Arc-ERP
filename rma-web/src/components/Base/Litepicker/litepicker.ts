import dayjs from "dayjs";
import Litepicker from "litepicker";
import { LitepickerElement, LitepickerProps } from "./index";

const getDateFormat = (format: string | undefined) => {
  return format !== undefined ? format : "D MMM, YYYY";
};

const setValue = (props: LitepickerProps) => {
  const format = getDateFormat(props.options.format);
  if (props.value !== undefined && !props.value.length) {
    let date = dayjs().format(format);
    date +=
      !props.options.singleMode && props.options.singleMode !== undefined
        ? " - " + dayjs().add(1, "month").format(format)
        : "";
    props.onChange({
      target: {
        value: date,
      },
    });
  }
};

const init = (el: LitepickerElement, props: LitepickerProps) => {
  const format = getDateFormat(props.options.format);
  el.litePickerInstance = new Litepicker({
    ...props.options,
    element: el,
    format: format,
    setup: (picker) => {
      if (picker.on) {
        picker.on("selected", (startDate, endDate) => {
          let date = dayjs(startDate.dateInstance).format(format);
          date +=
            endDate !== undefined
              ? " - " + dayjs(endDate.dateInstance).format(format)
              : "";
          props.onChange({
            target: {
              value: date,
            },
          });
        });
      }
    },
  });
};

const reInit = (el: LitepickerElement, props: LitepickerProps) => {
  el.litePickerInstance.destroy();
  init(el, props);
};

export { setValue, init, reInit };
