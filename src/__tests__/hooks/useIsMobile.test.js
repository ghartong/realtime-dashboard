var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-mobile';
describe('useIsMobile', function () {
    var originalInnerWidth = window.innerWidth;
    var originalMatchMedia = window.matchMedia;
    // Helper to update window.innerWidth and trigger resize event
    var setWindowWidth = function (width) {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: width,
        });
        window.dispatchEvent(new Event('resize'));
    };
    // Mock matchMedia to support addEventListener/removeEventListener
    var createMatchMediaMock = function (matches) {
        return vi.fn().mockImplementation(function (query) { return ({
            matches: matches,
            media: query,
            onchange: null,
            addEventListener: vi.fn(function (event, callback) {
                if (event === 'change') {
                    // Store callback so we can trigger it manually later
                    createMatchMediaMock.lastCallback = callback;
                }
            }),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }); });
    };
    beforeEach(function () {
        // Reset mocks before each test
        vi.resetAllMocks();
        // Default innerWidth to desktop size (e.g., 1024)
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024,
        });
    });
    afterEach(function () {
        // Restore original values
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: originalInnerWidth,
        });
        window.matchMedia = originalMatchMedia;
    });
    it('should return false for desktop width (> 767)', function () {
        setWindowWidth(1024);
        window.matchMedia = createMatchMediaMock(false); // matches = false for max-width:767px
        var result = renderHook(function () { return useIsMobile(); }).result;
        // After effect runs, isMobile becomes false
        expect(result.current).toBe(false);
    });
    it('should return true for mobile width (<= 767)', function () {
        setWindowWidth(500);
        window.matchMedia = createMatchMediaMock(true); // matches = true for max-width:767px
        var result = renderHook(function () { return useIsMobile(); }).result;
        expect(result.current).toBe(true);
    });
    it('should update when window is resized from desktop to mobile', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            // Start with desktop width
            setWindowWidth(1024);
            window.matchMedia = createMatchMediaMock(false);
            result = renderHook(function () { return useIsMobile(); }).result;
            expect(result.current).toBe(false);
            // Simulate resize to mobile width
            act(function () {
                setWindowWidth(500);
                // Manually trigger the matchMedia change event because the hook listens to it
                window.matchMedia('(max-width: 767px)');
                // The hook's onChange uses window.innerWidth directly, so we also need to call it
                // Alternatively, we can simulate the change event that the hook listens to.
                // Since our mock stores the callback, we can retrieve and call it.
                var changeCallback = createMatchMediaMock.lastCallback;
                if (changeCallback) {
                    changeCallback({ matches: true }); // simulate media query change
                }
            });
            // After the act, the hook's state should update to true
            expect(result.current).toBe(true);
            return [2 /*return*/];
        });
    }); });
    it('should update when window is resized from mobile to desktop', function () {
        setWindowWidth(500);
        window.matchMedia = createMatchMediaMock(true);
        var result = renderHook(function () { return useIsMobile(); }).result;
        expect(result.current).toBe(true);
        act(function () {
            setWindowWidth(1024);
            var changeCallback = createMatchMediaMock.lastCallback;
            if (changeCallback) {
                changeCallback({ matches: false });
            }
        });
        expect(result.current).toBe(false);
    });
    it('should add and remove event listener on mount/unmount', function () {
        var addEventListenerSpy = vi.fn();
        var removeEventListenerSpy = vi.fn();
        window.matchMedia = vi.fn().mockImplementation(function () { return ({
            matches: false,
            addEventListener: addEventListenerSpy,
            removeEventListener: removeEventListenerSpy,
        }); });
        var unmount = renderHook(function () { return useIsMobile(); }).unmount;
        // On mount, addEventListener should be called with 'change'
        expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
        expect(addEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
        // Unmount to trigger cleanup
        unmount();
        // removeEventListener should have been called with the same handler
        expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
        expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
    });
    it('should use window.matchMedia with correct breakpoint query', function () {
        var matchMediaMock = vi.fn().mockImplementation(function () { return ({
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }); });
        window.matchMedia = matchMediaMock;
        renderHook(function () { return useIsMobile(); });
        expect(matchMediaMock).toHaveBeenCalledTimes(1);
        expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 767px)');
    });
});
