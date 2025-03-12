
# TESTING.md

## **Installation & Setup**

### **1. Install Dependencies**
To run the tests, you need to install the required dependencies. Use the following commands:

```sh
npm install @rescui/use-glow-hover react react-dom @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

Or, if you're using Yarn:

```sh
yarn add @rescui/use-glow-hover react react-dom @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

### **2. Configure Jest**
Ensure your Jest configuration is set up correctly. Add the following to your `jest.config.js`:

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
```

### **3. Configure React Testing Library**
React Testing Library is used to render components and interact with them. No additional configuration is required beyond the Jest setup.

---

## **Running the Tests**

### **1. Run All Tests**
To execute all tests, use the following command:

```sh
npm test
```

Or, if you're using Yarn:

```sh
yarn test
```

### **2. Run Specific Test Suites**
To run specific test suites, use the `--testNamePattern` flag:

```sh
npm test -- --testNamePattern="Basic Usage"
```

Or, with Yarn:

```sh
yarn test --testNamePattern="Basic Usage"
```

---

## **Test Coverage**

### **1. Check Coverage**
To generate a coverage report, run:

```sh
npm test -- --coverage
```

Or, with Yarn:

```sh
yarn test --coverage
```

This will generate a coverage report in the `coverage` directory. Open `coverage/lcov-report/index.html` in your browser to view the detailed report.

---

## **Dependencies**

### **Required Packages**
- `@rescui/use-glow-hover`: The package being tested.
- `react`: Required for rendering components.
- `react-dom`: Required for rendering components in the DOM.
- `@testing-library/react`: For rendering and interacting with React components.
- `@testing-library/jest-dom`: For additional DOM assertions.
- `jest`: The test runner.
- `jest-environment-jsdom`: Provides a DOM environment for Jest.

---

## **Troubleshooting**

### **1. Tests Fail Due to Missing DOM**
Ensure that `jest-environment-jsdom` is installed and configured in your `jest.config.js`.

### **2. Hover Effects Not Triggering**
Ensure that the `useGlowHover` hook is correctly attached to the target element. Verify that the element is rendered and visible in the DOM.

### **3. Coverage Report Not Generated**
Ensure that the `--coverage` flag is correctly passed to Jest. If the issue persists, check your Jest configuration.

---

## **Test Suite**

### **Unit Tests**

#### **Basic Usage**
Tests the minimal setup of `useGlowHover`.

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useGlowHover } from '@rescui/use-glow-hover';

const BasicGlowButton = () => {
  const glowRef = useGlowHover({
    lightColor: '#00ff00',
    lightSize: 30,
  });

  return (
    <button ref={glowRef} style={{ padding: '10px 20px', fontSize: '16px' }}>
      Basic Glow
    </button>
  );
};

test('Basic Usage: Applies glow effect on hover', () => {
  render(<BasicGlowButton />);
  const button = screen.getByText('Basic Glow');
  expect(button).toBeInTheDocument();
});
```

#### **Advanced Usage**
Tests all available options of `useGlowHover`.

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useGlowHover } from '@rescui/use-glow-hover';

const AdvancedGlowCard = () => {
  const glowRef = useGlowHover({
    hoverBg: '#f0f0f0',
    lightSize: 100,
    lightSizeEnterAnimationTime: 300,
    lightSizeLeaveAnimationTime: 500,
    mode: 'sharp',
    enableBurst: true,
  });

  return (
    <div ref={glowRef} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>Advanced Glow Card</h2>
      <p>Hover over this card to see the effect!</p>
    </div>
  );
};

test('Advanced Usage: Applies advanced glow effect on hover', () => {
  render(<AdvancedGlowCard />);
  const card = screen.getByText('Advanced Glow Card');
  expect(card).toBeInTheDocument();
});
```

#### **Edge Cases**
Tests invalid inputs and unexpected states.

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useGlowHover } from '@rescui/use-glow-hover';

const InvalidGlowButton = () => {
  const glowRef = useGlowHover({
    lightColor: '', // Invalid color
    lightSize: -10, // Invalid size
  });

  return (
    <button ref={glowRef} style={{ padding: '10px 20px', fontSize: '16px' }}>
      Invalid Glow
    </button>
  );
};

test('Edge Cases: Handles invalid inputs gracefully', () => {
  render(<InvalidGlowButton />);
  const button = screen.getByText('Invalid Glow');
  expect(button).toBeInTheDocument();
});
```

### **Integration Tests**

#### **Multiple Components**
Ensures `useGlowHover` works with multiple components.

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useGlowHover } from '@rescui/use-glow-hover';

const MultipleGlowButtons = () => {
  const glowRef1 = useGlowHover({ lightColor: '#ff0000', lightSize: 30 });
  const glowRef2 = useGlowHover({ lightColor: '#00ff00', lightSize: 40 });

  return (
    <div>
      <button ref={glowRef1} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Button 1
      </button>
      <button ref={glowRef2} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Button 2
      </button>
    </div>
  );
};

test('Integration: Multiple components with glow effect', () => {
  render(<MultipleGlowButtons />);
  const button1 = screen.getByText('Button 1');
  const button2 = screen.getByText('Button 2');
  expect(button1).toBeInTheDocument();
  expect(button2).toBeInTheDocument();
});
```

### **Visual Regression Tests**

#### **Snapshot Testing**
Captures DOM structure before and after applying `useGlowHover`.

```typescript
import React from 'react';
import renderer from 'react-test-renderer';
import { useGlowHover } from '@rescui/use-glow-hover';

const SnapshotGlowButton = () => {
  const glowRef = useGlowHover({
    lightColor: '#0000ff',
    lightSize: 50,
  });

  return (
    <button ref={glowRef} style={{ padding: '10px 20px', fontSize: '16px' }}>
      Snapshot Glow
    </button>
  );
};

test('Snapshot: Captures DOM structure', () => {
  const tree = renderer.create(<SnapshotGlowButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

### **Accessibility Tests**

#### **Color Contrast Compliance**
Validates color contrast compliance.

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useGlowHover } from '@rescui/use-glow-hover';

const AccessibleGlowButton = () => {
  const glowRef = useGlowHover({
    lightColor: '#ffffff',
    lightSize: 30,
  });

  return (
    <button ref={glowRef} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#000000', color: '#ffffff' }}>
      Accessible Glow
    </button>
  );
};

test('Accessibility: Validates color contrast compliance', () => {
  render(<AccessibleGlowButton />);
  const button = screen.getByText('Accessible Glow');
  expect(button).toHaveStyle('background-color: #000000');
  expect(button).toHaveStyle('color: #ffffff');
});
```

### **Performance & Stress Tests**

#### **100+ Elements**
Tests performance with 100+ elements using `useGlowHover`.

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useGlowHover } from '@rescui/use-glow-hover';

const StressTest = () => {
  const elements = Array.from({ length: 100 }, (_, i) => {
    const glowRef = useGlowHover({
      lightColor: '#ff0000',
      lightSize: 30,
    });

    return (
      <button key={i} ref={glowRef} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Button {i + 1}
      </button>
    );
  });

  return <div>{elements}</div>;
};

test('Performance: Handles 100+ elements with glow effect', () => {
  render(<StressTest />);
  const buttons = screen.getAllByRole('button');
  expect(buttons.length).toBe(100);
});
```

### **Cross-Browser & Mobile Tests**

#### **Touch Interactions**
Validates touch interactions for mobile.

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useGlowHover } from '@rescui/use-glow-hover';

const MobileGlowButton = () => {
  const glowRef = useGlowHover({
    lightColor: '#ff0000',
    lightSize: 30,
  });

  return (
    <button ref={glowRef} style={{ padding: '10px 20px', fontSize: '16px' }}>
      Mobile Glow
    </button>
  );
};

test('Cross-Browser: Validates touch interactions', () => {
  render(<MobileGlowButton />);
  const button = screen.getByText('Mobile Glow');
  fireEvent.touchStart(button);
  fireEvent.touchEnd(button);
  expect(button).toBeInTheDocument();
});
```

### **Error Handling & Edge Cases**

#### **Rapid Hover In/Out Events**
Ensures rapid hover in/out events don't break animations.

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useGlowHover } from '@rescui/use-glow-hover';

const RapidHoverButton = () => {
  const glowRef = useGlowHover({
    lightColor: '#ff0000',
    lightSize: 30,
  });

  return (
    <button ref={glowRef} style={{ padding: '10px 20px', fontSize: '16px' }}>
      Rapid Hover
    </button>
  );
};

test('Error Handling: Rapid hover in/out events', () => {
  render(<RapidHoverButton />);
  const button = screen.getByText('Rapid Hover');
  for (let i = 0; i < 10; i++) {
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);
  }
  expect(button).toBeInTheDocument();
});
```

---

This `TESTING.md` file provides a comprehensive guide to testing the `useGlowHover` hook. It includes setup instructions, test coverage, and a variety of test types to ensure the hook works as expected in all scenarios.
```