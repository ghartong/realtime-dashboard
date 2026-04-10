"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
function TooltipProvider(_a) {
    var _b = _a.delayDuration, delayDuration = _b === void 0 ? 0 : _b, props = __rest(_a, ["delayDuration"]);
    return (_jsx(TooltipPrimitive.Provider, __assign({ "data-slot": "tooltip-provider", delayDuration: delayDuration }, props)));
}
function Tooltip(_a) {
    var props = __rest(_a, []);
    return _jsx(TooltipPrimitive.Root, __assign({ "data-slot": "tooltip" }, props));
}
function TooltipTrigger(_a) {
    var props = __rest(_a, []);
    return _jsx(TooltipPrimitive.Trigger, __assign({ "data-slot": "tooltip-trigger" }, props));
}
function TooltipContent(_a) {
    var className = _a.className, _b = _a.sideOffset, sideOffset = _b === void 0 ? 0 : _b, children = _a.children, props = __rest(_a, ["className", "sideOffset", "children"]);
    return (_jsx(TooltipPrimitive.Portal, { children: _jsxs(TooltipPrimitive.Content, __assign({ "data-slot": "tooltip-content", sideOffset: sideOffset, className: cn("z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className) }, props, { children: [children, _jsx(TooltipPrimitive.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })] })) }));
}
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
