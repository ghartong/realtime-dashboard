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
import { Dialog as SheetPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
function Sheet(_a) {
    var props = __rest(_a, []);
    return _jsx(SheetPrimitive.Root, __assign({ "data-slot": "sheet" }, props));
}
function SheetTrigger(_a) {
    var props = __rest(_a, []);
    return _jsx(SheetPrimitive.Trigger, __assign({ "data-slot": "sheet-trigger" }, props));
}
function SheetClose(_a) {
    var props = __rest(_a, []);
    return _jsx(SheetPrimitive.Close, __assign({ "data-slot": "sheet-close" }, props));
}
function SheetPortal(_a) {
    var props = __rest(_a, []);
    return _jsx(SheetPrimitive.Portal, __assign({ "data-slot": "sheet-portal" }, props));
}
function SheetOverlay(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(SheetPrimitive.Overlay, __assign({ "data-slot": "sheet-overlay", className: cn("fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className) }, props)));
}
function SheetContent(_a) {
    var className = _a.className, children = _a.children, _b = _a.side, side = _b === void 0 ? "right" : _b, _c = _a.showCloseButton, showCloseButton = _c === void 0 ? true : _c, props = __rest(_a, ["className", "children", "side", "showCloseButton"]);
    return (_jsxs(SheetPortal, { children: [_jsx(SheetOverlay, {}), _jsxs(SheetPrimitive.Content, __assign({ "data-slot": "sheet-content", "data-side": side, className: cn("fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10", className) }, props, { children: [children, showCloseButton && (_jsx(SheetPrimitive.Close, { "data-slot": "sheet-close", asChild: true, children: _jsxs(Button, { variant: "ghost", className: "absolute top-3 right-3", size: "icon-sm", children: [_jsx(XIcon, {}), _jsx("span", { className: "sr-only", children: "Close" })] }) }))] }))] }));
}
function SheetHeader(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("div", __assign({ "data-slot": "sheet-header", className: cn("flex flex-col gap-0.5 p-4", className) }, props)));
}
function SheetFooter(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("div", __assign({ "data-slot": "sheet-footer", className: cn("mt-auto flex flex-col gap-2 p-4", className) }, props)));
}
function SheetTitle(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(SheetPrimitive.Title, __assign({ "data-slot": "sheet-title", className: cn("font-heading text-base font-medium text-foreground", className) }, props)));
}
function SheetDescription(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(SheetPrimitive.Description, __assign({ "data-slot": "sheet-description", className: cn("text-sm text-muted-foreground", className) }, props)));
}
export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, };
