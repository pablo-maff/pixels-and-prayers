import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slider from './Slider';
import { vi, it, describe, expect } from 'vitest';

//UNIT TESTING
/* 
- 1 Render a component we test
- 2 Simulating user moving the slider, calling onChange
- 3 Handles min and max boundaries correctly - It ensures that even if you try to set a value outside the range, the component's onChange function is still called with a valid number within the range.
- This test confirms that the slider respects the step prop
checks for invalid boundary values. Y
*/
describe('Slider Component', () => {
  it('renders with default props and shows initial value', () => {
    render(<Slider />);
    expect(screen.getByRole('slider')).toHaveValue('0');
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('calls onChange with new value when moved', () => {
    const handleChange = vi.fn();
    render(<Slider onChange={handleChange} />);
    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { target: { value: '50' } });

    expect(handleChange).toHaveBeenCalledWith(50);
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('handles min and max boundaries correctly', () => {
    const handleChange = vi.fn();
    render(<Slider min={0} max={100} onChange={handleChange} />);
    const slider = screen.getByRole('slider') as HTMLInputElement;

    // Set an initial value to ensure the first change event is registered
    fireEvent.change(slider, { target: { value: '50' } });
    expect(handleChange).toHaveBeenLastCalledWith(50);
    expect(slider).toHaveValue('50');

    //move to min
    fireEvent.change(slider, { target: { value: '0' } });
    expect(handleChange).toHaveBeenLastCalledWith(0);
    expect(slider).toHaveValue('0');

    // Move to max
    fireEvent.change(slider, { target: { value: '100' } });
    expect(handleChange).toHaveBeenLastCalledWith(100);
    expect(slider).toHaveValue('100');
  });

  it('respects step precision', () => {
    const handleChange = vi.fn();
    render(<Slider min={0} max={100} step={5} onChange={handleChange} />);
    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { target: { value: '4' } });

    expect(handleChange).toHaveBeenLastCalledWith(4);
    expect(Number(slider.getAttribute('step'))).toBe(5);
  });

  it('ignores invalid values beyond allowed range', () => {
    const handleChange = vi.fn();
    render(<Slider min={0} max={10} onChange={handleChange} />);
    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { target: { value: '20' } });

    // Browser clamps value to max automatically
    expect(handleChange).toHaveBeenLastCalledWith(10);
    expect(slider).toHaveValue('10');
  });

  //INTEGRATION TEST
  //Reusability: multiple instances do not interfere with each other

  it('multiple sliders do not interfere with each other', () => {
    const handleChange1 = vi.fn();
    const handleChange2 = vi.fn();

    render(
      <>
        <Slider min={0} max={10} onChange={handleChange1} />
        <Slider min={50} max={100} onChange={handleChange2} />
      </>,
    );

    const [slider1, slider2] = screen.getAllByRole('slider');

    fireEvent.change(slider1, { target: { value: '5' } });
    expect(handleChange1).toHaveBeenLastCalledWith(5);
    expect(handleChange2).not.toHaveBeenCalled();

    fireEvent.change(slider2, { target: { value: '60' } });
    expect(handleChange2).toHaveBeenLastCalledWith(60);
    expect(handleChange1).toHaveBeenCalledTimes(1);
  });
});
