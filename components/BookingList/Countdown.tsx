import Router from 'next/router';
import { useEffect, useState } from 'react';

function calculateTimeLeft(expiredTime: string) {
  let now = new Date();
  now.setHours(now.getHours() + 7);

  const difference = +new Date(expiredTime) - +now;
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
}

interface CountdownProps {
  expiredTime: string;
}

const Countdown: React.FC<CountdownProps> = ({ expiredTime }) => {
  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft(expiredTime));

  useEffect(() => {
    const id = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(expiredTime));
      if (
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0
      ) {
        Router.reload();
      }
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });

  return (
    <div>
      {timeLeft && (
        <span>
          {timeLeft['hours']}:{('0' + timeLeft['minutes']).slice(-2)}:
          {('0' + timeLeft['seconds']).slice(-2)}
        </span>
      )}
    </div>
  );
};

export default Countdown;
