import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import styles from './Button.module.scss';

// Helpers
const buttonText = 'Click me';
const spanChild = <span>{buttonText}</span>;

describe('Button', () => {
  it('renders with a <span> child element with text without crashing', () => {
    render(<Button>{spanChild}</Button>);
    expect(screen.getByRole('button')).toHaveTextContent(buttonText);
  });

  it('applies the primary class by default', () => {
    render(<Button>{spanChild}</Button>);
    expect(screen.getByRole('button')).toHaveClass(styles.primary);
  });

  it('applies the secondary class when variant is secondary', () => {
    render(<Button variant="secondary">{spanChild}</Button>);
    expect(screen.getByRole('button')).toHaveClass(styles.secondary);
  });

  it('applies the ghost class when variant is ghost', () => {
    render(<Button variant="ghost">{spanChild}</Button>);
    expect(screen.getByRole('button')).toHaveClass(styles.ghost);
  });

  it('renders with isLoading=true and shows loading text', () => {
    render(<Button isLoading>{spanChild}</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('...Loading');
  });

  it('renders with disabled=true and applies the attribute', () => {
    render(<Button disabled>{spanChild}</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('does not have the disabled attribute by default', () => {
    render(<Button>{spanChild}</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
  });

  it('applies the sm class when size is sm', () => {
    render(<Button size="sm">{spanChild}</Button>);
    expect(screen.getByRole('button')).toHaveClass(styles.sm);
  });

  it('applies the md class when size is md', () => {
    render(<Button size="md">{spanChild}</Button>);
    expect(screen.getByRole('button')).toHaveClass(styles.md);
  });

  it('applies the lg class when size is lg', () => {
    render(<Button size="lg">{spanChild}</Button>);
    expect(screen.getByRole('button')).toHaveClass(styles.lg);
  });

  it('fires onClick when not disabled or loading', () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>{spanChild}</Button>);

    screen.getByRole('button').click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fires onClick when disabled', () => {
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        {spanChild}
      </Button>,
    );

    screen.getByRole('button').click();

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not fires onClick when is loading', () => {
    const handleClick = vi.fn();

    render(
      <Button isLoading onClick={handleClick}>
        {spanChild}
      </Button>,
    );

    screen.getByRole('button').click();

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('merges custom class with internal styles', () => {
    render(<Button className="dummyClass">{spanChild}</Button>);
    expect(screen.getByRole('button')).toHaveClass('dummyClass');
  });

  it('renders with an icon and a text span', () => {
    const icon = <svg role="img" aria-label="icon" />;

    render(
      <Button>
        <>
          {icon}
          {spanChild}
        </>
      </Button>,
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(buttonText);
  });
});
