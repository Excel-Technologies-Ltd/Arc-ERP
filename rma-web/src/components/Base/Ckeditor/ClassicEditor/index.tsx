import "@/assets/css/vendors/ckeditor.css";
import { createRef, useEffect, useRef } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { init, updateData, CkeditorProps, CkeditorElement } from "../ckeditor";

function Ckeditor<C extends React.ElementType = "div">({
  disabled = false,
  config = {},
  value = "",
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onReady = () => {},
  getRef = () => {},
  className,
  as,
  ...computedProps
}: CkeditorProps<C>) {
  const props = {
    disabled: disabled,
    config: config,
    value: value,
    onChange: onChange,
    onFocus: onFocus,
    onBlur: onBlur,
    onReady: onReady,
    getRef: getRef,
  };

  const editorRef = createRef<CkeditorElement>();
  const cacheData = useRef("");
  const initialRender = useRef(true);

  useEffect(() => {
    if (editorRef.current) {
      if (initialRender.current) {
        if (props.getRef) {
          props.getRef(editorRef.current);
        }
        init(editorRef.current, ClassicEditor, { props, cacheData });
        initialRender.current = false;
      } else {
        updateData(editorRef.current, { props, cacheData });
      }
    }
  }, [props.value]);

  const Component = as || "div";

  return (
    <Component
      {...computedProps}
      ref={editorRef}
      value={props.value}
      onChange={props.onChange}
      className={className}
    />
  );
}

export default Ckeditor;
