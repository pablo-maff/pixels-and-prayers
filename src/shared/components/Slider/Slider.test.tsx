import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slider from './Slider';
import { vi, it, describe, expect, beforeEach } from 'vitest';

//UNIT TESTING
/* 
- 1 Render a component we test
- 2 Simulating user moving the slider, calling onChange
- 3 Handles min and max boundaries correctly - It ensures that even if you try to set a value outside the range, the component's onChange function is still called with a valid number within the range.
- This test confirms that the slider respects the step prop
checks for invalid boundary values. Y
*/
describe('Slider Component', () => {
  let mockOnChange: ReturnType<typeof vi.fn>;
  const defaultProps = {
    min: 0,
    max: 100,
    step: 5,
    value: 50,
    onChange: () => {},
  };

  beforeEach(() => {
    mockOnChange = vi.fn();
    defaultProps.onChange = mockOnChange;
  });

  it('renders correctly and reflects initial value', () => {
    render(<Slider {...defaultProps} />);
    const slider = screen.getByRole('slider');

    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue('50');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
    expect(slider).toHaveAttribute('step', '5');
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('calls onChange with the correct new value when moved', () => {
    render(<Slider {...defaultProps} />);
    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { target: { value: '75' } });
    expect(mockOnChange).toHaveBeenCalledWith(75);

    fireEvent.change(slider, { target: { value: '23' } });
    expect(mockOnChange).toHaveBeenCalledWith(23);
  });

  it('respects min boundaries', () => {
    render(<Slider {...defaultProps} />);
    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { target: { value: '-10' } });
    expect(mockOnChange).toHaveBeenCalledWith(0);
  });

  it('respects max boundaries', () => {
    render(<Slider {...defaultProps} />);
    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { target: { value: '150' } });
    expect(mockOnChange).toHaveBeenCalledWith(100);
  });

  it('handles ArrowRight key press correctly (controlled)', () => {
    let value = 50;
    const handleChange = vi.fn((newVal) => {
      value = newVal;
      rerender(<Slider value={value} onChange={handleChange} min={0} max={100} step={5} />);
    });

    const { getByRole, rerender } = render(
      <Slider value={value} onChange={handleChange} min={0} max={100} step={5} />,
    );

    const slider = getByRole('slider');
    slider.focus();

    fireEvent.keyDown(slider, { key: 'ArrowRight' });

    expect(handleChange).toHaveBeenCalledWith(55);
    expect(slider).toHaveValue('55');
  });

  it('handles ArrowLeft key press correctly (controlled)', () => {
    let value = 50;
    const handleChange = vi.fn((newVal) => {
      value = newVal;
      rerender(<Slider value={value} onChange={handleChange} min={0} max={100} step={5} />);
    });

    const { getByRole, rerender } = render(
      <Slider value={value} onChange={handleChange} min={0} max={100} step={5} />,
    );

    const slider = getByRole('slider');
    slider.focus();

    fireEvent.keyDown(slider, { key: 'ArrowLeft' });

    expect(handleChange).toHaveBeenCalledWith(45);
    expect(slider).toHaveValue('45');
  });

  //INTEGRATION TEST
  //Reusability: multiple instances do not interfere with each other

  it('multiple sliders operate independently', () => {
    const mockOnChange1 = vi.fn();
    const mockOnChange2 = vi.fn();

    render(
      <>
        <Slider value={10} onChange={mockOnChange1} min={0} max={20} step={2} />
        <Slider value={50} onChange={mockOnChange2} min={40} max={60} step={1} />
      </>,
    );

    const sliders = screen.getAllByRole('slider');
    const slider1 = sliders[0];
    const slider2 = sliders[1];

    fireEvent.change(slider1, { target: { value: '14' } });
    expect(mockOnChange1).toHaveBeenCalledWith(14);
    expect(mockOnChange2).not.toHaveBeenCalled();

    fireEvent.change(slider2, { target: { value: '45' } });
    expect(mockOnChange2).toHaveBeenCalledWith(45);
    expect(mockOnChange1).toHaveBeenCalledTimes(1);
  });
});
