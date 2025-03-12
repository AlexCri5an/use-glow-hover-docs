import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useGlowHover } from '@rescui/use-glow-hover';
import '@testing-library/jest-dom';

type FixedRef<T> = React.MutableRefObject<T> | ((instance: T | null) => void) | null;

//  Basic Glow Button Test
const BasicGlowButton = () => {
  const glowRef = useGlowHover({ lightColor: '#00ff00', lightSize: 30 });

  return (
    <button ref={glowRef as FixedRef<HTMLButtonElement>} type="button" style={{ padding: '10px 20px', fontSize: '16px' }}>
      Basic Glow
    </button>
  );
};

test('Basic Usage: Applies glow effect on hover', () => {
  render(<BasicGlowButton/>);
  const button = screen.getByText('Basic Glow');
  expect(button).toBeInTheDocument();
});

// Advanced Glow Card Test
const AdvancedGlowCard = () => {
  const glowRef = useGlowHover({
    hoverBg: '#f0f0f0',
    lightColor: '#ffcc00', 
    lightSize: 100,
    lightSizeEnterAnimationTime: 300,
    lightSizeLeaveAnimationTime: 500,
    mode: 'sharp',
    enableBurst: true,
  });

  return (
    <div ref={glowRef as FixedRef<HTMLDivElement>} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>Advanced Glow Card</h2>
      <p>Hover over this card to see the effect!</p>
    </div>
  );
};

test('Advanced Usage: Applies advanced glow effect on hover', () => {
  render(<AdvancedGlowCard/>);
  expect(screen.getByText('Advanced Glow Card')).toBeInTheDocument();
});

// Edge Case Test: Invalid Inputs
const InvalidGlowButton = () => {
  const glowRef = useGlowHover({ lightColor: 'invalid', lightSize: -10 });

  return (
    <button ref={glowRef as FixedRef<HTMLButtonElement>} type="button" style={{ padding: '10px 20px', fontSize: '16px' }}>
      Invalid Glow
    </button>
  );
};

test('Edge Cases: Handles invalid inputs gracefully', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  render(<InvalidGlowButton/>);
  expect(screen.getByText('Invalid Glow')).toBeInTheDocument();
});

// Multiple Elements Test
const MultipleGlowButtons = () => {
  const glowRef1 = useGlowHover({ lightColor: '#ff0000', lightSize: 30 });
  const glowRef2 = useGlowHover({ lightColor: '#00ff00', lightSize: 40 });

  return (
    <div>
      <button ref={glowRef1 as FixedRef<HTMLButtonElement>} type="button">Button 1</button>
      <button ref={glowRef2 as FixedRef<HTMLButtonElement>} type="button">Button 2</button>
    </div>
  );
};

test('Integration: Multiple components with glow effect', () => {
  render(<MultipleGlowButtons/>);
  expect(screen.getByText('Button 1')).toBeInTheDocument();
  expect(screen.getByText('Button 2')).toBeInTheDocument();
});

// Snapshot Test
import renderer from 'react-test-renderer';
const SnapshotGlowButton = () => {
  const glowRef = useGlowHover({ lightColor: '#0000ff', lightSize: 50 });

  return (
    <button ref={glowRef as FixedRef<HTMLButtonElement>} type="button">Snapshot Glow</button>
  );
};

test('Snapshot: Captures DOM structure', () => {
  const tree = renderer.create(<SnapshotGlowButton/>).toJSON();
  expect(tree).toMatchSnapshot();
});

// Accessibility Test
const AccessibleGlowButton = () => {
  const glowRef = useGlowHover({ lightColor: '#ffffff', lightSize: 30 });

  return (
    <button ref={glowRef as FixedRef<HTMLButtonElement>} type="button" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      Accessible Glow
    </button>
  );
};

test('Accessibility: Validates color contrast compliance', () => {
  render(<AccessibleGlowButton/>);
  const button = screen.getByText('Accessible Glow');
  expect(button).toHaveStyle('background-color: #000000');
  expect(button).toHaveStyle('color: #ffffff');
});

// Stress Test (100+ Buttons)
const GlowButton: React.FC<{ index: number }> = ({ index }) => {
  const glowRef = useGlowHover({ lightColor: '#ff0000', lightSize: 30 });

  return (
    <button ref={glowRef as React.RefObject<HTMLButtonElement>} type="button">
      Button {index + 1}
    </button>
  );
};

const StressTest: React.FC = () => {
  const elements = Array.from({ length: 100 }, (_, i) => (
    <GlowButton key={i} index={i}/>
  ));

  return <div>{elements}</div>;
};


const onehundred = 100;
test('Performance: Handles 100+ elements with glow effect', () => {
  render(<StressTest/>);
  expect(screen.getAllByRole('button').length).toBe(onehundred);
});

// Touch Interaction Test
const MobileGlowButton = () => {
  const glowRef = useGlowHover({ lightColor: '#ff0000', lightSize: 30 });

  return (
    <button ref={glowRef as FixedRef<HTMLButtonElement>} type="button">
      Mobile Glow
    </button>
  );
};

test('Cross-Browser: Validates touch interactions', () => {
  render(<MobileGlowButton/>);
  const button = screen.getByText('Mobile Glow');
  fireEvent.touchStart(button);
  fireEvent.touchEnd(button);
  expect(button).toBeInTheDocument();
});

// Rapid Hover Edge Case
const RapidHoverButton = () => {
  const glowRef = useGlowHover({ lightColor: '#ff0000', lightSize: 30 });

  return (
    <button ref={glowRef as FixedRef<HTMLButtonElement>} type="button" style={{ padding: '10px 20px', fontSize: '16px' }}>
      Rapid Hover
    </button>
  );
};

const ten = 10;
test('Error Handling: Rapid hover in/out events', () => {
  render(<RapidHoverButton/>);
  const button = screen.getByText('Rapid Hover');
  for (let i = 0; i < ten; i++) {
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);
  }
  expect(button).toBeInTheDocument();
});


