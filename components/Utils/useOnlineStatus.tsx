// Alternative to react-detect-offline

import React, { useState, useEffect, useContext } from 'react';

const OnlineStatusContext = React.createContext(true);

export const OnlineStatusProvider: React.FC = ({ children }) => {
  const [onlineStatus, setOnlineStatus] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener('offline', () => {
      setOnlineStatus(false);
    });
    window.addEventListener('online', () => {
      setOnlineStatus(true);
    });

    return () => {
      window.removeEventListener('offline', () => {
        setOnlineStatus(false);
      });
      window.removeEventListener('online', () => {
        setOnlineStatus(true);
      });
    };
  }, []);

  return (
    <OnlineStatusContext.Provider value={onlineStatus}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

export const useOnlineStatus = () => {
  return useContext(OnlineStatusContext);
};

// Usage example in Layout.tsx
// also add wrap OnlineStatusProvider in _app.tsx
export const Example = () => {
  const isOnline = useOnlineStatus();
  const [status, setStatus] = useState(isOnline);

  useEffect(() => {
    setStatus(isOnline);
  }, [isOnline]);

  return (
    <>
      {!status && (
        <div tw="bg-yellow-300 w-full fixed bottom-10 text-center">
          You are Offline!
        </div>
      )}
    </>
  );
};
