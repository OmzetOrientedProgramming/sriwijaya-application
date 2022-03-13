import React from 'react';

interface StarProps {
  size: string;
}

const StarEmptyGolden: React.FC<StarProps> = (props) => {
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox={`0 0 ${props.size} ${props.size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_113_895)">
        <path
          d="M3.11916 15.096C3.03986 15.5473 3.48512 15.9001 3.87751 15.6988L8.34024 13.4054L12.8019 15.6988C13.1943 15.9001 13.6396 15.5473 13.5603 15.097L12.7166 10.2886L16.2969 6.87703C16.6324 6.55783 16.4596 5.97432 16.0102 5.91129L11.0311 5.20376L8.81091 0.80508C8.76862 0.715916 8.70189 0.640582 8.61848 0.587832C8.53508 0.535082 8.43842 0.50708 8.33973 0.50708C8.24105 0.50708 8.14438 0.535082 8.06098 0.587832C7.97757 0.640582 7.91085 0.715916 7.86855 0.80508L5.64837 5.20478L0.669232 5.91231C0.220926 5.97534 0.0470933 6.55884 0.381544 6.87805L3.96291 10.2896L3.11916 15.098V15.096ZM8.10541 12.2831L4.35835 14.2085L5.06385 10.186C5.08037 10.0934 5.07391 9.99812 5.04502 9.9086C5.01612 9.81909 4.96569 9.73805 4.89815 9.67259L1.94401 6.8567L6.06313 6.27116C6.14843 6.25828 6.22933 6.22491 6.29891 6.17392C6.36849 6.12293 6.42467 6.05584 6.46264 5.97838L8.33821 2.25979L10.2158 5.97838C10.2538 6.05584 10.31 6.12293 10.3795 6.17392C10.4491 6.22491 10.53 6.25828 10.6153 6.27116L14.7344 6.85568L11.7803 9.67157C11.7126 9.73713 11.6621 9.81835 11.6332 9.90805C11.6043 9.99776 11.5979 10.0932 11.6146 10.186L12.3201 14.2085L8.57303 12.2831C8.50058 12.2458 8.42024 12.2263 8.33871 12.2263C8.25719 12.2263 8.17685 12.2458 8.1044 12.2831H8.10541Z"
          fill="#FD7702"
        />
      </g>
      <defs>
        <clipPath id="clip0_113_895">
          <rect
            width="16.2651"
            height="16.2651"
            fill="white"
            transform="translate(0.205673)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const StarHalfGolden: React.FC<StarProps> = (props) => {
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox={`0 0 ${props.size} ${props.size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_113_897)">
        <path
          d="M6.21464 5.20382L8.43482 0.805138C8.47746 0.71665 8.54409 0.641911 8.62712 0.589433C8.71015 0.536954 8.80625 0.508843 8.90447 0.508301C9.09051 0.508301 9.27654 0.606908 9.37718 0.805138L11.5974 5.20382L16.5765 5.91135C16.7006 5.93086 16.8142 5.99258 16.8981 6.08611C16.982 6.17963 17.031 6.29922 17.037 6.42472C17.0441 6.50826 17.0322 6.59234 17.0023 6.67066C16.9724 6.74899 16.9252 6.81955 16.8642 6.87709L13.2828 10.2887L14.1266 15.097C14.2059 15.5474 13.7606 15.9001 13.3682 15.6989L8.90447 13.4055L4.44276 15.6989C4.3961 15.7231 4.34607 15.7402 4.29435 15.7497C3.94668 15.8107 3.61528 15.4915 3.68441 15.097L4.52816 10.2887L0.94781 6.87709C0.892148 6.82443 0.847905 6.76089 0.817827 6.69041C0.787748 6.61994 0.772477 6.54404 0.77296 6.46741C0.773013 6.35908 0.80291 6.25286 0.859368 6.16041C0.89942 6.09339 0.95401 6.03621 1.01911 5.99311C1.08421 5.95 1.15816 5.92206 1.2355 5.91135L6.21464 5.20382ZM8.90447 12.2263C8.98653 12.2259 9.06745 12.2455 9.14032 12.2832L12.8874 14.2086L12.1819 10.186C12.1652 10.0935 12.1715 9.99831 12.2002 9.9088C12.229 9.8193 12.2792 9.73821 12.3466 9.67265L15.3017 6.85676L11.1826 6.27121C11.0973 6.25833 11.0164 6.22497 10.9468 6.17398C10.8772 6.12299 10.8211 6.0559 10.7831 5.97844L8.90549 2.25984L8.90447 2.26289V12.2252V12.2263Z"
          fill="#FD7702"
        />
      </g>
      <defs>
        <clipPath id="clip0_113_897">
          <rect
            width="16.2651"
            height="16.2651"
            fill="white"
            transform="translate(0.771942)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const StarFullGolden: React.FC<StarProps> = (props) => {
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox={`0 0 ${props.size} ${props.size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_113_878)">
        <path
          d="M4.14258 15.6989C3.75018 15.9001 3.30492 15.5474 3.38422 15.0971L4.22797 10.2887L0.646604 6.87711C0.312154 6.55791 0.485987 5.9744 0.934292 5.91137L5.91343 5.20384L8.13361 0.805158C8.33388 0.408697 8.87571 0.408697 9.07597 0.805158L11.2962 5.20384L16.2753 5.91137C16.7236 5.9744 16.8974 6.55791 16.562 6.87711L12.9816 10.2887L13.8254 15.0971C13.9047 15.5474 13.4594 15.9001 13.067 15.6989L8.60327 13.4055L4.14156 15.6989H4.14258Z"
          fill="#FD7702"
        />
      </g>
      <defs>
        <clipPath id="clip0_113_878">
          <rect
            width="16.2651"
            height="16.2651"
            fill="white"
            transform="translate(0.470734)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const StarEmptyBlack: React.FC<StarProps> = (props) => {
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox={`0 0 ${props.size} ${props.size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.97444 12.9937C2.90619 13.3822 3.28944 13.6859 3.62719 13.5126L7.46844 11.5386L11.3088 13.5126C11.6466 13.6859 12.0298 13.3822 11.9616 12.9946L11.2353 8.85587L14.3171 5.91937C14.6058 5.64462 14.4571 5.14237 14.0703 5.08812L9.78456 4.47912L7.87356 0.692994C7.83716 0.616246 7.77972 0.551404 7.70793 0.506C7.63614 0.460595 7.55294 0.436493 7.468 0.436493C7.38306 0.436493 7.29986 0.460595 7.22807 0.506C7.15628 0.551404 7.09884 0.616246 7.06244 0.692994L5.15144 4.47999L0.865687 5.08899C0.479812 5.14324 0.330187 5.64549 0.618062 5.92024L3.70069 8.85674L2.97444 12.9955V12.9937ZM7.26631 10.5726L4.04106 12.2299L4.64831 8.76749C4.66254 8.68779 4.65697 8.60582 4.6321 8.52877C4.60723 8.45172 4.56382 8.38196 4.50569 8.32562L1.96294 5.90187L5.50844 5.39787C5.58185 5.38678 5.65149 5.35806 5.71138 5.31418C5.77127 5.27029 5.81963 5.21254 5.85231 5.14587L7.46669 1.94512L9.08281 5.14587C9.1155 5.21254 9.16386 5.27029 9.22375 5.31418C9.28364 5.35806 9.35327 5.38678 9.42669 5.39787L12.9722 5.90099L10.4294 8.32474C10.3712 8.38118 10.3277 8.45108 10.3028 8.5283C10.2779 8.60551 10.2724 8.68766 10.2868 8.76749L10.8941 12.2299L7.66881 10.5726C7.60644 10.5405 7.53729 10.5237 7.46712 10.5237C7.39696 10.5237 7.3278 10.5405 7.26544 10.5726H7.26631Z"
        fill="black"
      />
    </svg>
  );
};

const StarHalfBlack: React.FC<StarProps> = (props) => {
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox={`0 0 ${props.size} ${props.size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_44_1055)">
        <path
          d="M5.28475 4.47913L7.19575 0.693C7.23245 0.616834 7.2898 0.552504 7.36127 0.507333C7.43273 0.462163 7.51545 0.437967 7.6 0.4375C7.76012 0.4375 7.92025 0.522375 8.00687 0.693L9.91787 4.47913L14.2036 5.08813C14.3104 5.10492 14.4082 5.15805 14.4804 5.23854C14.5526 5.31904 14.5949 5.42198 14.6 5.53C14.6061 5.60191 14.5959 5.67428 14.5701 5.7417C14.5444 5.80912 14.5037 5.86985 14.4512 5.91937L11.3686 8.85588L12.0949 12.9946C12.1631 13.3822 11.7799 13.6859 11.4421 13.5126L7.6 11.5386L3.75962 13.5126C3.71945 13.5335 3.67639 13.5482 3.63187 13.5564C3.33262 13.6089 3.04737 13.3341 3.10687 12.9946L3.83312 8.85588L0.75137 5.91937C0.70346 5.87405 0.665378 5.81936 0.639489 5.7587C0.613599 5.69804 0.600454 5.6327 0.60087 5.56675C0.600916 5.47351 0.626649 5.38208 0.675245 5.3025C0.709719 5.24481 0.756707 5.1956 0.812741 5.15849C0.868775 5.12139 0.932425 5.09734 0.998995 5.08813L5.28475 4.47913ZM7.6 10.5236C7.67063 10.5233 7.74028 10.5401 7.803 10.5726L11.0282 12.2299L10.421 8.7675C10.4067 8.68787 10.4121 8.60594 10.4368 8.5289C10.4615 8.45185 10.5048 8.38206 10.5627 8.32563L13.1064 5.90188L9.56087 5.39788C9.48746 5.38679 9.41782 5.35807 9.35793 5.31418C9.29804 5.27029 9.24968 5.21254 9.217 5.14587L7.60087 1.94513L7.6 1.94775V10.5227V10.5236Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_44_1055">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(0.600006)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const StarFullBlack: React.FC<StarProps> = (props) => {
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox={`0 0 ${props.size} ${props.size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_44_1042)">
        <path
          d="M3.69372 13.5126C3.35597 13.6859 2.97272 13.3823 3.04097 12.9946L3.76722 8.85588L0.68459 5.91938C0.396715 5.64463 0.54634 5.14239 0.932215 5.08813L5.21797 4.47914L7.12897 0.69301C7.30134 0.35176 7.76772 0.35176 7.94009 0.69301L9.85109 4.47914L14.1368 5.08813C14.5227 5.14239 14.6723 5.64463 14.3836 5.91938L11.3018 8.85588L12.0281 12.9946C12.0963 13.3823 11.7131 13.6859 11.3753 13.5126L7.53322 11.5386L3.69284 13.5126H3.69372Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_44_1042">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(0.533203)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export {
  StarEmptyGolden,
  StarHalfGolden,
  StarFullGolden,
  StarEmptyBlack,
  StarHalfBlack,
  StarFullBlack,
};
