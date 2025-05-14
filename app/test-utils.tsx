import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ReactElement } from 'react';

expect.extend(toHaveNoViolations);

export async function testAccessibility(ui: React.ReactElement) {
  const { container } = render(ui);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}

export function renderWithAccessibility(ui: ReactElement) {
  return {
    ...render(ui),
    axe: async () => {
      const { container } = render(ui);
      return axe(container);
    },
  };
} 