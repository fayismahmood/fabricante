import "../block.css";

let Views = {
  Text({ props }) {
    return <div className="max-h-24 overflow-hidden">{props.value}</div>;
  },
  TextArea({ props }) {
    return <div className="max-h-24 overflow-hidden">{props.value}</div>;
  },
  Select({ props }) {
    return (
      <div className="max-h-24 overflow-hidden">
        {props.options.some(_e=>_e.value==props.value)
          ? props.options.find((e) => e.value == props.value).text
          : <div className="text-xs text-gray-600">Not Selected</div>}
      </div>
    );
  },
};
export default Views;
