import React from 'react';

const StarEmpty: React.FC = (props) => {
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.37376 27.8437C5.22751 28.6762 6.04876 29.3269 6.77251 28.9556L15.0038 24.7256L23.2331 28.9556C23.9569 29.3269 24.7781 28.6762 24.6319 27.8456L23.0756 18.9769L29.6794 12.6844C30.2981 12.0956 29.9794 11.0194 29.1506 10.9031L19.9669 9.59812L15.8719 1.485C15.7939 1.32054 15.6708 1.18159 15.517 1.0843C15.3631 0.987004 15.1848 0.935356 15.0028 0.935356C14.8208 0.935356 14.6425 0.987004 14.4887 1.0843C14.3348 1.18159 14.2118 1.32054 14.1338 1.485L10.0388 9.6L0.855008 10.905C0.0281331 11.0212 -0.292492 12.0975 0.324383 12.6862L6.93001 18.9787L5.37376 27.8475V27.8437ZM14.5706 22.6556L7.65938 26.2069L8.96063 18.7875C8.99112 18.6167 8.97919 18.441 8.9259 18.2759C8.87261 18.1108 8.77959 17.9614 8.65501 17.8406L3.20626 12.6469L10.8038 11.5669C10.9611 11.5431 11.1103 11.4816 11.2386 11.3875C11.367 11.2935 11.4706 11.1697 11.5406 11.0269L15 4.16813L18.4631 11.0269C18.5332 11.1697 18.6368 11.2935 18.7651 11.3875C18.8935 11.4816 19.0427 11.5431 19.2 11.5669L26.7975 12.645L21.3488 17.8387C21.2239 17.9597 21.1307 18.1095 21.0774 18.2749C21.0241 18.4404 21.0123 18.6164 21.0431 18.7875L22.3444 26.2069L15.4331 22.6556C15.2995 22.5867 15.1513 22.5508 15.0009 22.5508C14.8506 22.5508 14.7024 22.5867 14.5688 22.6556H14.5706Z" fill="#FD7702"/>
        </svg>
    )
}

const StarHalf: React.FC = () => {
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_44_1083)">
        <path d="M10.0388 9.59812L14.1338 1.485C14.2124 1.32179 14.3353 1.18394 14.4884 1.08714C14.6416 0.990349 14.8188 0.9385 15 0.9375C15.3431 0.9375 15.6863 1.11938 15.8719 1.485L19.9669 9.59812L29.1506 10.9031C29.3795 10.9391 29.589 11.053 29.7438 11.2255C29.8985 11.3979 29.989 11.6185 30 11.85C30.0131 12.0041 29.9912 12.1592 29.936 12.3036C29.8808 12.4481 29.7938 12.5783 29.6813 12.6844L23.0756 18.9769L24.6319 27.8456C24.7781 28.6762 23.9569 29.3269 23.2331 28.9556L15 24.7256L6.77063 28.9556C6.68455 29.0003 6.59229 29.0319 6.49688 29.0494C5.85563 29.1619 5.24438 28.5731 5.37188 27.8456L6.92813 18.9769L0.324382 12.6844C0.221718 12.5872 0.140113 12.4701 0.0846357 12.3401C0.0291578 12.2101 0.000990453 12.0701 0.0018821 11.9287C0.00197962 11.7289 0.0571221 11.533 0.161257 11.3625C0.23513 11.2389 0.335818 11.1334 0.455891 11.0539C0.575964 10.9744 0.712358 10.9229 0.855007 10.9031L10.0388 9.59812V9.59812ZM15 22.5506C15.1514 22.55 15.3006 22.586 15.435 22.6556L22.3463 26.2069L21.045 18.7875C21.0143 18.6169 21.0259 18.4413 21.0789 18.2762C21.1318 18.1111 21.2245 17.9615 21.3488 17.8406L26.7994 12.6469L19.2019 11.5669C19.0446 11.5431 18.8953 11.4816 18.767 11.3875C18.6387 11.2935 18.535 11.1697 18.465 11.0269L15.0019 4.16813L15 4.17375V22.5488V22.5506Z" fill="#FD7702"/>
        </g>
        <defs>
        <clipPath id="clip0_44_1083">
        <rect width="30" height="30" fill="white"/>
        </clipPath>
        </defs>
        </svg>
    )
}

const StarFull: React.FC = () => {
    return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_44_1085)">
    <path d="M6.77251 28.9556C6.04876 29.3269 5.22751 28.6762 5.37376 27.8456L6.93001 18.9769L0.324383 12.6844C-0.292492 12.0956 0.0281331 11.0194 0.855008 10.9031L10.0388 9.59812L14.1338 1.485C14.5031 0.753749 15.5025 0.753749 15.8719 1.485L19.9669 9.59812L29.1506 10.9031C29.9775 11.0194 30.2981 12.0956 29.6794 12.6844L23.0756 18.9769L24.6319 27.8456C24.7781 28.6762 23.9569 29.3269 23.2331 28.9556L15 24.7256L6.77063 28.9556H6.77251Z" fill="#FD7702"/>
    </g>
    <defs>
    <clipPath id="clip0_44_1085">
    <rect width="30" height="30" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    )
}

export {StarEmpty, StarHalf, StarFull};