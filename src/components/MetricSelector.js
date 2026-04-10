import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function MetricSelector(_a) {
    var value = _a.value, onChange = _a.onChange;
    var handleChange = function (event) {
        onChange(event.target.value);
    };
    return (_jsx("label", { className: "flex flex-col gap-2 text-sm", children: _jsxs("select", { value: value, onChange: handleChange, className: "rounded border px-2 py-1", children: [_jsx("option", { value: "cpu", children: "cpu" }), _jsx("option", { value: "memory", children: "memory" }), _jsx("option", { value: "requests", children: "requests" })] }) }));
}
