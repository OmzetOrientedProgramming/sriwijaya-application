import React from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import 'twin.macro';

interface BaseDrawerProps {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type DrawerProps = BaseDrawerProps;

const Drawer: React.FC<DrawerProps> = ({ children, isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          tw="fixed inset-0 z-30 overflow-y-hidden"
          initial={{
            display: 'none',
          }}
          animate={{
            display: 'flex',
          }}
        >
          <Dialog.Overlay tw="fixed inset-0 z-40 h-screen bg-black opacity-25" />
          <motion.div
            initial={{
              y: '100vh',
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: '100vh',
            }}
            transition={{ type: 'tween' }}
            tw="z-50 w-full mt-auto bg-white p-6 overflow-hidden rounded-t-2xl"
          >
            {children}
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
