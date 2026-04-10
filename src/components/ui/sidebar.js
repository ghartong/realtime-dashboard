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
import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip";
import { PanelLeftIcon } from "lucide-react";
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = React.createContext(null);
function useSidebar() {
    var context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.");
    }
    return context;
}
function SidebarProvider(_a) {
    var _b = _a.defaultOpen, defaultOpen = _b === void 0 ? true : _b, openProp = _a.open, setOpenProp = _a.onOpenChange, className = _a.className, style = _a.style, children = _a.children, props = __rest(_a, ["defaultOpen", "open", "onOpenChange", "className", "style", "children"]);
    var isMobile = useIsMobile();
    var _c = React.useState(false), openMobile = _c[0], setOpenMobile = _c[1];
    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    var _d = React.useState(defaultOpen), _open = _d[0], _setOpen = _d[1];
    var open = openProp !== null && openProp !== void 0 ? openProp : _open;
    var setOpen = React.useCallback(function (value) {
        var openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
            setOpenProp(openState);
        }
        else {
            _setOpen(openState);
        }
        // This sets the cookie to keep the sidebar state.
        document.cookie = "".concat(SIDEBAR_COOKIE_NAME, "=").concat(openState, "; path=/; max-age=").concat(SIDEBAR_COOKIE_MAX_AGE);
    }, [setOpenProp, open]);
    // Helper to toggle the sidebar.
    var toggleSidebar = React.useCallback(function () {
        return isMobile ? setOpenMobile(function (open) { return !open; }) : setOpen(function (open) { return !open; });
    }, [isMobile, setOpen, setOpenMobile]);
    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(function () {
        var handleKeyDown = function (event) {
            if (event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
                (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                toggleSidebar();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return function () { return window.removeEventListener("keydown", handleKeyDown); };
    }, [toggleSidebar]);
    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    var state = open ? "expanded" : "collapsed";
    var contextValue = React.useMemo(function () { return ({
        state: state,
        open: open,
        setOpen: setOpen,
        isMobile: isMobile,
        openMobile: openMobile,
        setOpenMobile: setOpenMobile,
        toggleSidebar: toggleSidebar,
    }); }, [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);
    return (_jsx(SidebarContext.Provider, { value: contextValue, children: _jsx("div", __assign({ "data-slot": "sidebar-wrapper", style: __assign({ "--sidebar-width": SIDEBAR_WIDTH, "--sidebar-width-icon": SIDEBAR_WIDTH_ICON }, style), className: cn("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", className) }, props, { children: children })) }));
}
function Sidebar(_a) {
    var _b = _a.side, side = _b === void 0 ? "left" : _b, _c = _a.variant, variant = _c === void 0 ? "sidebar" : _c, _d = _a.collapsible, collapsible = _d === void 0 ? "offcanvas" : _d, className = _a.className, children = _a.children, dir = _a.dir, props = __rest(_a, ["side", "variant", "collapsible", "className", "children", "dir"]);
    var _e = useSidebar(), isMobile = _e.isMobile, state = _e.state, openMobile = _e.openMobile, setOpenMobile = _e.setOpenMobile;
    if (collapsible === "none") {
        return (_jsx("div", __assign({ "data-slot": "sidebar", className: cn("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className) }, props, { children: children })));
    }
    if (isMobile) {
        return (_jsx(Sheet, __assign({ open: openMobile, onOpenChange: setOpenMobile }, props, { children: _jsxs(SheetContent, { dir: dir, "data-sidebar": "sidebar", "data-slot": "sidebar", "data-mobile": "true", className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden", style: {
                    "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                }, side: side, children: [_jsxs(SheetHeader, { className: "sr-only", children: [_jsx(SheetTitle, { children: "Sidebar" }), _jsx(SheetDescription, { children: "Displays the mobile sidebar." })] }), _jsx("div", { className: "flex h-full w-full flex-col", children: children })] }) })));
    }
    return (_jsxs("div", { className: "group peer hidden text-sidebar-foreground md:block", "data-state": state, "data-collapsible": state === "collapsed" ? collapsible : "", "data-variant": variant, "data-side": side, "data-slot": "sidebar", children: [_jsx("div", { "data-slot": "sidebar-gap", className: cn("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset"
                    ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
                    : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)") }), _jsx("div", __assign({ "data-slot": "sidebar-container", "data-side": side, className: cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex", 
                // Adjust the padding for floating and inset variants.
                variant === "floating" || variant === "inset"
                    ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
                    : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className) }, props, { children: _jsx("div", { "data-sidebar": "sidebar", "data-slot": "sidebar-inner", className: "flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border", children: children }) }))] }));
}
function SidebarTrigger(_a) {
    var className = _a.className, onClick = _a.onClick, props = __rest(_a, ["className", "onClick"]);
    var toggleSidebar = useSidebar().toggleSidebar;
    return (_jsxs(Button, __assign({ "data-sidebar": "trigger", "data-slot": "sidebar-trigger", variant: "ghost", size: "icon-sm", className: cn(className), onClick: function (event) {
            onClick === null || onClick === void 0 ? void 0 : onClick(event);
            toggleSidebar();
        } }, props, { children: [_jsx(PanelLeftIcon, {}), _jsx("span", { className: "sr-only", children: "Toggle Sidebar" })] })));
}
function SidebarRail(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    var toggleSidebar = useSidebar().toggleSidebar;
    return (_jsx("button", __assign({ "data-sidebar": "rail", "data-slot": "sidebar-rail", "aria-label": "Toggle Sidebar", tabIndex: -1, onClick: toggleSidebar, title: "Toggle Sidebar", className: cn("absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2", "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className) }, props)));
}
function SidebarInset(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("main", __assign({ "data-slot": "sidebar-inset", className: cn("relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", className) }, props)));
}
function SidebarInput(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(Input, __assign({ "data-slot": "sidebar-input", "data-sidebar": "input", className: cn("h-8 w-full bg-background shadow-none", className) }, props)));
}
function SidebarHeader(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("div", __assign({ "data-slot": "sidebar-header", "data-sidebar": "header", className: cn("flex flex-col gap-2 p-2", className) }, props)));
}
function SidebarFooter(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("div", __assign({ "data-slot": "sidebar-footer", "data-sidebar": "footer", className: cn("flex flex-col gap-2 p-2", className) }, props)));
}
function SidebarSeparator(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(Separator, __assign({ "data-slot": "sidebar-separator", "data-sidebar": "separator", className: cn("mx-2 w-auto bg-sidebar-border", className) }, props)));
}
function SidebarContent(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("div", __assign({ "data-slot": "sidebar-content", "data-sidebar": "content", className: cn("no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className) }, props)));
}
function SidebarGroup(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("div", __assign({ "data-slot": "sidebar-group", "data-sidebar": "group", className: cn("relative flex w-full min-w-0 flex-col p-2", className) }, props)));
}
function SidebarGroupLabel(_a) {
    var className = _a.className, _b = _a.asChild, asChild = _b === void 0 ? false : _b, props = __rest(_a, ["className", "asChild"]);
    var Comp = asChild ? Slot.Root : "div";
    return (_jsx(Comp, __assign({ "data-slot": "sidebar-group-label", "data-sidebar": "group-label", className: cn("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", className) }, props)));
}
function SidebarGroupAction(_a) {
    var className = _a.className, _b = _a.asChild, asChild = _b === void 0 ? false : _b, props = __rest(_a, ["className", "asChild"]);
    var Comp = asChild ? Slot.Root : "button";
    return (_jsx(Comp, __assign({ "data-slot": "sidebar-group-action", "data-sidebar": "group-action", className: cn("absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0", className) }, props)));
}
function SidebarGroupContent(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("div", __assign({ "data-slot": "sidebar-group-content", "data-sidebar": "group-content", className: cn("w-full text-sm", className) }, props)));
}
function SidebarMenu(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("ul", __assign({ "data-slot": "sidebar-menu", "data-sidebar": "menu", className: cn("flex w-full min-w-0 flex-col gap-0", className) }, props)));
}
function SidebarMenuItem(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("li", __assign({ "data-slot": "sidebar-menu-item", "data-sidebar": "menu-item", className: cn("group/menu-item relative", className) }, props)));
}
var sidebarMenuButtonVariants = cva("peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", {
    variants: {
        variant: {
            default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
        },
        size: {
            default: "h-8 text-sm",
            sm: "h-7 text-xs",
            lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
function SidebarMenuButton(_a) {
    var _b = _a.asChild, asChild = _b === void 0 ? false : _b, _c = _a.isActive, isActive = _c === void 0 ? false : _c, _d = _a.variant, variant = _d === void 0 ? "default" : _d, _e = _a.size, size = _e === void 0 ? "default" : _e, tooltip = _a.tooltip, className = _a.className, props = __rest(_a, ["asChild", "isActive", "variant", "size", "tooltip", "className"]);
    var Comp = asChild ? Slot.Root : "button";
    var _f = useSidebar(), isMobile = _f.isMobile, state = _f.state;
    var button = (_jsx(Comp, __assign({ "data-slot": "sidebar-menu-button", "data-sidebar": "menu-button", "data-size": size, "data-active": isActive, className: cn(sidebarMenuButtonVariants({ variant: variant, size: size }), className) }, props)));
    if (!tooltip) {
        return button;
    }
    if (typeof tooltip === "string") {
        tooltip = {
            children: tooltip,
        };
    }
    return (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: button }), _jsx(TooltipContent, __assign({ side: "right", align: "center", hidden: state !== "collapsed" || isMobile }, tooltip))] }));
}
function SidebarMenuAction(_a) {
    var className = _a.className, _b = _a.asChild, asChild = _b === void 0 ? false : _b, _c = _a.showOnHover, showOnHover = _c === void 0 ? false : _c, props = __rest(_a, ["className", "asChild", "showOnHover"]);
    var Comp = asChild ? Slot.Root : "button";
    return (_jsx(Comp, __assign({ "data-slot": "sidebar-menu-action", "data-sidebar": "menu-action", className: cn("absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0", showOnHover &&
            "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0", className) }, props)));
}
function SidebarMenuBadge(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("div", __assign({ "data-slot": "sidebar-menu-badge", "data-sidebar": "menu-badge", className: cn("pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground", className) }, props)));
}
function SidebarMenuSkeleton(_a) {
    var className = _a.className, _b = _a.showIcon, showIcon = _b === void 0 ? false : _b, props = __rest(_a, ["className", "showIcon"]);
    // Random width between 50 to 90%.
    var width = React.useState(function () {
        return "".concat(Math.floor(Math.random() * 40) + 50, "%");
    })[0];
    return (_jsxs("div", __assign({ "data-slot": "sidebar-menu-skeleton", "data-sidebar": "menu-skeleton", className: cn("flex h-8 items-center gap-2 rounded-md px-2", className) }, props, { children: [showIcon && (_jsx(Skeleton, { className: "size-4 rounded-md", "data-sidebar": "menu-skeleton-icon" })), _jsx(Skeleton, { className: "h-4 max-w-(--skeleton-width) flex-1", "data-sidebar": "menu-skeleton-text", style: {
                    "--skeleton-width": width,
                } })] })));
}
function SidebarMenuSub(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("ul", __assign({ "data-slot": "sidebar-menu-sub", "data-sidebar": "menu-sub", className: cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden", className) }, props)));
}
function SidebarMenuSubItem(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("li", __assign({ "data-slot": "sidebar-menu-sub-item", "data-sidebar": "menu-sub-item", className: cn("group/menu-sub-item relative", className) }, props)));
}
function SidebarMenuSubButton(_a) {
    var _b = _a.asChild, asChild = _b === void 0 ? false : _b, _c = _a.size, size = _c === void 0 ? "md" : _c, _d = _a.isActive, isActive = _d === void 0 ? false : _d, className = _a.className, props = __rest(_a, ["asChild", "size", "isActive", "className"]);
    var Comp = asChild ? Slot.Root : "a";
    return (_jsx(Comp, __assign({ "data-slot": "sidebar-menu-sub-button", "data-sidebar": "menu-sub-button", "data-size": size, "data-active": isActive, className: cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", className) }, props)));
}
export { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar, };
