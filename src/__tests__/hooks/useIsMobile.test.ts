/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-mobile';

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth;
  const originalMatchMedia = window.matchMedia;

  // Helper to update window.innerWidth and trigger resize event
  const setWindowWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event('resize'));
  };

  // Mock matchMedia to support addEventListener/removeEventListener
  const createMatchMediaMock = (matches: boolean) => {
    return vi.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn((event, callback) => {
        if (event === 'change') {
          // Store callback so we can trigger it manually later
          (createMatchMediaMock as any).lastCallback = callback;
        }
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
    // Default innerWidth to desktop size (e.g., 1024)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  afterEach(() => {
    // Restore original values
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    window.matchMedia = originalMatchMedia;
  });

  it('should return false for desktop width (> 767)', () => {
    setWindowWidth(1024);
    window.matchMedia = createMatchMediaMock(false); // matches = false for max-width:767px

    const { result } = renderHook(() => useIsMobile());

    // After effect runs, isMobile becomes false
    expect(result.current).toBe(false);
  });

  it('should return true for mobile width (<= 767)', () => {
    setWindowWidth(500);
    window.matchMedia = createMatchMediaMock(true); // matches = true for max-width:767px

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it('should update when window is resized from desktop to mobile', async () => {
    // Start with desktop width
    setWindowWidth(1024);
    window.matchMedia = createMatchMediaMock(false);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    // Simulate resize to mobile width
    act(() => {
      setWindowWidth(500);
      // Manually trigger the matchMedia change event because the hook listens to it
      window.matchMedia('(max-width: 767px)');
      // The hook's onChange uses window.innerWidth directly, so we also need to call it
      // Alternatively, we can simulate the change event that the hook listens to.
      // Since our mock stores the callback, we can retrieve and call it.
      const changeCallback = (createMatchMediaMock as any).lastCallback;
      if (changeCallback) {
        changeCallback({ matches: true }); // simulate media query change
      }
    });

    // After the act, the hook's state should update to true
    expect(result.current).toBe(true);
  });

  it('should update when window is resized from mobile to desktop', () => {
    setWindowWidth(500);
    window.matchMedia = createMatchMediaMock(true);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);

    act(() => {
      setWindowWidth(1024);
      const changeCallback = (createMatchMediaMock as any).lastCallback;
      if (changeCallback) {
        changeCallback({ matches: false });
      }
    });

    expect(result.current).toBe(false);
  });

  it('should add and remove event listener on mount/unmount', () => {
    const addEventListenerSpy = vi.fn();
    const removeEventListenerSpy = vi.fn();

    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: addEventListenerSpy,
      removeEventListener: removeEventListenerSpy,
    }));

    const { unmount } = renderHook(() => useIsMobile());

    // On mount, addEventListener should be called with 'change'
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));

    // Unmount to trigger cleanup
    unmount();

    // removeEventListener should have been called with the same handler
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('should use window.matchMedia with correct breakpoint query', () => {
    const matchMediaMock = vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    window.matchMedia = matchMediaMock;

    renderHook(() => useIsMobile());

    expect(matchMediaMock).toHaveBeenCalledTimes(1);
    expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 767px)');
  });
});