import React from 'react';

const StarEmpty: React.FC = (props) => {
    return (
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.97444 12.9937C2.90619 13.3822 3.28944 13.6859 3.62719 13.5126L7.46844 11.5386L11.3088 13.5126C11.6466 13.6859 12.0298 13.3822 11.9616 12.9946L11.2353 8.85587L14.3171 5.91937C14.6058 5.64462 14.4571 5.14237 14.0703 5.08812L9.78456 4.47912L7.87356 0.692994C7.83716 0.616246 7.77972 0.551404 7.70793 0.506C7.63614 0.460595 7.55294 0.436493 7.468 0.436493C7.38306 0.436493 7.29986 0.460595 7.22807 0.506C7.15628 0.551404 7.09884 0.616246 7.06244 0.692994L5.15144 4.47999L0.865687 5.08899C0.479812 5.14324 0.330187 5.64549 0.618062 5.92024L3.70069 8.85674L2.97444 12.9955V12.9937ZM7.26631 10.5726L4.04106 12.2299L4.64831 8.76749C4.66254 8.68779 4.65697 8.60582 4.6321 8.52877C4.60723 8.45172 4.56382 8.38196 4.50569 8.32562L1.96294 5.90187L5.50844 5.39787C5.58185 5.38678 5.65149 5.35806 5.71138 5.31418C5.77127 5.27029 5.81963 5.21254 5.85231 5.14587L7.46669 1.94512L9.08281 5.14587C9.1155 5.21254 9.16386 5.27029 9.22375 5.31418C9.28364 5.35806 9.35327 5.38678 9.42669 5.39787L12.9722 5.90099L10.4294 8.32474C10.3712 8.38118 10.3277 8.45108 10.3028 8.5283C10.2779 8.60551 10.2724 8.68766 10.2868 8.76749L10.8941 12.2299L7.66881 10.5726C7.60644 10.5405 7.53729 10.5237 7.46712 10.5237C7.39696 10.5237 7.3278 10.5405 7.26544 10.5726H7.26631Z" fill="black"/>
        </svg>        
    )
}

const StarHalf: React.FC = () => {
    return (
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_44_1055)">
        <path d="M5.28475 4.47913L7.19575 0.693C7.23245 0.616834 7.2898 0.552504 7.36127 0.507333C7.43273 0.462163 7.51545 0.437967 7.6 0.4375C7.76012 0.4375 7.92025 0.522375 8.00687 0.693L9.91787 4.47913L14.2036 5.08813C14.3104 5.10492 14.4082 5.15805 14.4804 5.23854C14.5526 5.31904 14.5949 5.42198 14.6 5.53C14.6061 5.60191 14.5959 5.67428 14.5701 5.7417C14.5444 5.80912 14.5037 5.86985 14.4512 5.91937L11.3686 8.85588L12.0949 12.9946C12.1631 13.3822 11.7799 13.6859 11.4421 13.5126L7.6 11.5386L3.75962 13.5126C3.71945 13.5335 3.67639 13.5482 3.63187 13.5564C3.33262 13.6089 3.04737 13.3341 3.10687 12.9946L3.83312 8.85588L0.75137 5.91937C0.70346 5.87405 0.665378 5.81936 0.639489 5.7587C0.613599 5.69804 0.600454 5.6327 0.60087 5.56675C0.600916 5.47351 0.626649 5.38208 0.675245 5.3025C0.709719 5.24481 0.756707 5.1956 0.812741 5.15849C0.868775 5.12139 0.932425 5.09734 0.998995 5.08813L5.28475 4.47913ZM7.6 10.5236C7.67063 10.5233 7.74028 10.5401 7.803 10.5726L11.0282 12.2299L10.421 8.7675C10.4067 8.68787 10.4121 8.60594 10.4368 8.5289C10.4615 8.45185 10.5048 8.38206 10.5627 8.32563L13.1064 5.90188L9.56087 5.39788C9.48746 5.38679 9.41782 5.35807 9.35793 5.31418C9.29804 5.27029 9.24968 5.21254 9.217 5.14587L7.60087 1.94513L7.6 1.94775V10.5227V10.5236Z" fill="black"/>
        </g>
        <defs>
        <clipPath id="clip0_44_1055">
        <rect width="14" height="14" fill="white" transform="translate(0.600006)"/>
        </clipPath>
        </defs>
        </svg>
    )
}

const StarFull: React.FC = () => {
    return (
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_44_1042)">
        <path d="M3.69372 13.5126C3.35597 13.6859 2.97272 13.3823 3.04097 12.9946L3.76722 8.85588L0.68459 5.91938C0.396715 5.64463 0.54634 5.14239 0.932215 5.08813L5.21797 4.47914L7.12897 0.69301C7.30134 0.35176 7.76772 0.35176 7.94009 0.69301L9.85109 4.47914L14.1368 5.08813C14.5227 5.14239 14.6723 5.64463 14.3836 5.91938L11.3018 8.85588L12.0281 12.9946C12.0963 13.3823 11.7131 13.6859 11.3753 13.5126L7.53322 11.5386L3.69284 13.5126H3.69372Z" fill="black"/>
        </g>
        <defs>
        <clipPath id="clip0_44_1042">
        <rect width="14" height="14" fill="white" transform="translate(0.533203)"/>
        </clipPath>
        </defs>
        </svg>
    )
}

export {StarEmpty, StarHalf, StarFull};