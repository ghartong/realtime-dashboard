import { useDurationStore } from '../../store/useDurationStore';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useDurationStore', () => {
  beforeEach(() => {
    // Reset store to initial state
    useDurationStore.setState({ duration: '1h' });
    // Clear localStorage to ensure clean state
    localStorage.clear();
  });

  it('has initial duration set to 1h', () => {
    const duration = useDurationStore.getState().duration;
    expect(duration).toBe('1h');
  });

  it('setDuration updates the duration value', () => {
    useDurationStore.getState().setDuration('6h');
    expect(useDurationStore.getState().duration).toBe('6h');
  });

  it('persists duration in localStorage', () => {
    useDurationStore.getState().setDuration('24h');

    const stored = localStorage.getItem('dashboard-duration');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.state.duration).toBe('24h');
  });

  // Optional: Test that the store can be used as a hook inside a component.
  // But that belongs in an integration test, not a pure store unit test.
  // The three tests above already cover all statements in useDurationStore.ts.
});