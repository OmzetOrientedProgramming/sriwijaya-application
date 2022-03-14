import React, { useState } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Drawer } from '../../components/Drawer';

import { click } from '../../__mocks__/test-utils/interactions';

// @ts-expect-error
global.IntersectionObserver = class FakeIntersectionObserver {
  observe() {}
  disconnect() {}
};

console.warn = jest.fn();

describe('Rendering', () => {
  describe('Drawer', () => {
    it("shouldn't render portal root if Drawer is not opened", async () => {
      const Example = () => {
        let [isOpen, setIsOpen] = useState(false);
        return (
          <>
            <button id="trigger" onClick={() => setIsOpen(true)}>
              Trigger
            </button>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              tes
            </Drawer>
          </>
        );
      };
      const { container } = render(<Example />);

      expect(container.querySelector('#headlessui-portal-root')).toBeNull();
    });
    it('should render portal root if Drawer is opened', async () => {
      const Example = () => {
        let [isOpen, setIsOpen] = useState(false);
        return (
          <>
            <button id="trigger" onClick={() => setIsOpen(true)}>
              Trigger
            </button>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              tes
            </Drawer>
          </>
        );
      };
      render(<Example />);

      expect(document.getElementById('headlessui-portal-root')).toBeNull();

      fireEvent.click(document.getElementById('trigger') as HTMLElement);

      expect(document.getElementById('headlessui-portal-root')).not.toBeNull();
    });
    it("shouldn't render portal root if Overlay is clicked after portal opened", async () => {
      const Example = () => {
        let [isOpen, setIsOpen] = useState(false);
        return (
          <>
            <button id="trigger" onClick={() => setIsOpen(true)}>
              Trigger
            </button>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              tes
            </Drawer>
          </>
        );
      };
      render(<Example />);

      expect(document.querySelector('[role="dialog"]')).toBeNull();

      await click(document.getElementById('trigger'));

      expect(document.querySelector('[role="dialog"]')).not.toBeNull();

      await click(document.querySelector('[id^="headlessui-dialog-overlay-"]'));

      expect(document.getElementById('[role="dialog"]')).toBeNull();
    });
  });
});
