# @rescui/use-glow-hover

## Introduction

The `@rescui/use-glow-hover` package provides a React hook, `useGlowHover`, that allows you to easily add a glowing hover effect to any HTML element. This effect is highly customizable, enabling you to control the glow's color, size, animation, and more. It is particularly useful for enhancing user interactions in web applications, such as buttons, cards, or any other interactive elements.

### Installation

You can install the package using either npm or yarn:

```sh
npm install @rescui/use-glow-hover
```

```sh
yarn add @rescui/use-glow-hover
```

## API Reference Table

| Function/Hook   | Parameters                                                                 | Returns                          |
|-----------------|---------------------------------------------------------------------------|----------------------------------|
| `useGlowHover`  | `options: GlowHoverHookOptions`                                           | `MutableRefObject<HTMLElement>`  |

## Detailed API Documentation

### `useGlowHover`

The `useGlowHover` hook is used to apply a glowing hover effect to a React component. It returns a ref that should be attached to the target HTML element.

#### Parameters

| Parameter Name | Type                  | Description                                                                 | Optional/Required |
|----------------|-----------------------|-----------------------------------------------------------------------------|-------------------|
| `disabled`     | `boolean`            | Disables the hover effect when set to `true`.                               | Optional          |
| `hoverBg`      | `string`             | Background color of the element on hover.                                   | Optional          |
| `lightSize`    | `number`             | Size of the glow effect.                                                    | Optional          |
| `lightSizeEnterAnimationTime` | `number` | Duration of the glow size increase animation on hover (in milliseconds).    | Optional          |
| `lightSizeLeaveAnimationTime` | `number` | Duration of the glow size decrease animation on mouse leave (in milliseconds). | Optional          |
| `isElementMovable` | `boolean`        | Whether the element is movable (e.g., draggable).                           | Optional          |
| `customStaticBg` | `string`            | Custom static background color for the element.                             | Optional          |
| `forceTheme`   | `'light' \| 'dark' \| false` | Forces a specific theme for the glow effect. Use with caution.              | Optional          |
| `enableBurst`  | `boolean`            | Enables a burst effect on hover.                                            | Optional          |
| `mode`         | `'glow' \| 'sharp'`  | Mode of the glow effect. Defaults to `'glow'`.                              | Optional          |
| `preset`       | `keyof typeof presets` | Predefined configuration for the glow effect.                               | Optional          |
| `lightColor`   | `string`             | Custom color for the glow effect.                                           | Optional          |

#### Return Type

- **Returns:** `MutableRefObject<HTMLElement>`

#### Example Usage

```typescript
import React from 'react';
import { useGlowHover } from '@rescui/use-glow-hover';

const GlowButton = () => {
  const glowRef = useGlowHover({
    lightColor: '#ff00ff',
    lightSize: 50,
    mode: 'glow',
    enableBurst: true,
  });

  return (
    <button ref={glowRef} style={{ padding: '10px 20px', fontSize: '16px' }}>
      Hover Me!
    </button>
  );
};

export default GlowButton;
```

## Usage Examples

### Basic Usage

```typescript
import React from 'react';
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

export default BasicGlowButton;
```

### Advanced Usage

```typescript
import React from 'react';
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

export default AdvancedGlowCard;
```

### Customization Options

```typescript
import React from 'react';
import { useGlowHover } from '@rescui/use-glow-hover';

const CustomGlowButton = () => {
  const glowRef = useGlowHover({
    lightColor: '#ff0000',
    lightSize: 40,
    lightSizeEnterAnimationTime: 200,
    lightSizeLeaveAnimationTime: 400,
    forceTheme: 'dark',
    customStaticBg: '#333',
  });

  return (
    <button ref={glowRef} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#333', color: '#fff' }}>
      Custom Glow
    </button>
  );
};

export default CustomGlowButton;
```

## Frequently Asked Questions (FAQ)

### 1. **Can I use this hook with any HTML element?**
   - Yes, the `useGlowHover` hook can be used with any HTML element by attaching the returned ref to the element.

### 2. **How do I disable the glow effect?**
   - You can disable the glow effect by setting the `disabled` option to `true`.

### 3. **Can I customize the glow color?**
   - Yes, you can customize the glow color using the `lightColor` option.

### 4. **What is the difference between `glow` and `sharp` modes?**
   - The `glow` mode provides a soft, diffused glow effect, while the `sharp` mode creates a more defined and intense glow.

### 5. **How do I use a predefined preset?**
   - You can use a predefined preset by setting the `preset` option to one of the available preset keys.

## License

This package is licensed under the **MIT License**. For more information, please refer to the [LICENSE](https://opensource.org/licenses/MIT) file.

---

This documentation provides a comprehensive guide to using the `@rescui/use-glow-hover` package. For further assistance, please refer to the official repository or contact the maintainers.