import { JSX } from "react";

const menuItems: {
  href: string;
  label: string;
  icon: JSX.Element;
}[] = [
  {
    href: "/",
    label: "Trang chủ",
    icon: (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 20V9.67412C3.5 9.04041 3.80033 8.4442 4.30954 8.067L11.3095 2.88182C12.0167 2.35797 12.9833 2.35797 13.6905 2.88182L20.6905 8.067C21.1997 8.4442 21.5 9.04041 21.5 9.67412V20C21.5 21.1046 20.6046 22 19.5 22H5.5C4.39543 22 3.5 21.1046 3.5 20Z"
          stroke="#121219"
          strokeWidth="1.5"
        ></path>
        <path
          d="M9 22V15C9 14.1716 9.67157 13.5 10.5 13.5H14.5C15.3284 13.5 16 14.1716 16 15V22"
          stroke="#121219"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
      </svg>
    ),
  },
  {
    href: "/order",
    label: "Lịch sử mua hàng",
    icon: (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.56203 19.7C8.38203 18.82 9.63203 18.89 10.352 19.85L11.362 21.2C12.172 22.27 13.482 22.27 14.292 21.2L15.302 19.85C16.022 18.89 17.272 18.82 18.092 19.7C19.872 21.6 21.322 20.97 21.322 18.31V7.04C21.332 3.01 20.392 2 16.612 2H9.05203C5.27203 2 4.33203 3.01 4.33203 7.04V18.3C4.33203 20.97 5.79203 21.59 7.56203 19.7Z"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M8.9281 11H8.93708"
          stroke="#292D32"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M11.7305 11H17.2305"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M8.9281 7H8.93708"
          stroke="#292D32"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M11.7305 7H17.2305"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
  },
  {
    href: "/promotion",
    label: "Ưu đãi của bạn",
    icon: (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.1367 10H4.13672V18C4.13672 21 5.13672 22 8.13672 22H16.1367C19.1367 22 20.1367 21 20.1367 18V10Z"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M21.668 7V8C21.668 9.1 21.138 10 19.668 10H4.66797C3.13797 10 2.66797 9.1 2.66797 8V7C2.66797 5.9 3.13797 5 4.66797 5H19.668C21.138 5 21.668 5.9 21.668 7Z"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M11.8068 4.99945H6.28678C5.94678 4.62945 5.95678 4.05945 6.31678 3.69945L7.73678 2.27945C8.10678 1.90945 8.71678 1.90945 9.08678 2.27945L11.8068 4.99945Z"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M18.0395 4.99945H12.5195L15.2395 2.27945C15.6095 1.90945 16.2195 1.90945 16.5895 2.27945L18.0095 3.69945C18.3695 4.05945 18.3795 4.62945 18.0395 4.99945Z"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M9.10938 10V15.14C9.10938 15.94 9.98938 16.41 10.6594 15.98L11.5994 15.36C11.9394 15.14 12.3694 15.14 12.6994 15.36L13.5894 15.96C14.2494 16.4 15.1394 15.93 15.1394 15.13V10H9.10938Z"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
  },
  {
    href: "/account/user-info",
    label: "Tài khoản của bạn",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
  },
  {
    href: "/social-account",
    label: "Liên kết tài khoản",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.96 6.16992C18.96 7.55992 20.34 9.76992 20.62 12.3199"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M3.49023 12.3697C3.75023 9.82973 5.11023 7.61973 7.09023 6.21973"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M8.19043 20.9404C9.35043 21.5304 10.6704 21.8604 12.0604 21.8604C13.4004 21.8604 14.6604 21.5604 15.7904 21.0104"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M12.0603 7.69965C13.5956 7.69965 14.8403 6.455 14.8403 4.91965C14.8403 3.3843 13.5956 2.13965 12.0603 2.13965C10.5249 2.13965 9.28027 3.3843 9.28027 4.91965C9.28027 6.455 10.5249 7.69965 12.0603 7.69965Z"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M4.8298 19.9204C6.36516 19.9204 7.60981 18.6757 7.60981 17.1404C7.60981 15.605 6.36516 14.3604 4.8298 14.3604C3.29445 14.3604 2.0498 15.605 2.0498 17.1404C2.0498 18.6757 3.29445 19.9204 4.8298 19.9204Z"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M19.1696 19.9204C20.705 19.9204 21.9496 18.6757 21.9496 17.1404C21.9496 15.605 20.705 14.3604 19.1696 14.3604C17.6343 14.3604 16.3896 15.605 16.3896 17.1404C16.3896 18.6757 17.6343 19.9204 19.1696 19.9204Z"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
  },
  {
    href: "/account/support",
    label: "Hỗ trợ",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.9 20.6C8.4 21.5 10.2 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 13.8 2.5 15.5 3.3 17L2.44044 20.306C2.24572 21.0549 2.93892 21.7317 3.68299 21.5191L6.9 20.6Z"
          stroke="#17191C"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M16.5 14.8485C16.5 15.0105 16.4639 15.177 16.3873 15.339C16.3107 15.501 16.2116 15.654 16.0809 15.798C15.86 16.041 15.6167 16.2165 15.3418 16.329C15.0714 16.4415 14.7784 16.5 14.4629 16.5C14.0033 16.5 13.512 16.392 12.9937 16.1715C12.4755 15.951 11.9572 15.654 11.4434 15.2805C10.9251 14.9025 10.4339 14.484 9.9652 14.0205C9.501 13.5525 9.08187 13.062 8.70781 12.549C8.33826 12.036 8.04081 11.523 7.82449 11.0145C7.60816 10.5015 7.5 10.011 7.5 9.543C7.5 9.237 7.55408 8.9445 7.66224 8.6745C7.77041 8.4 7.94166 8.148 8.18052 7.923C8.46895 7.6395 8.78443 7.5 9.11793 7.5C9.24412 7.5 9.37031 7.527 9.48297 7.581C9.60015 7.635 9.70381 7.716 9.78493 7.833L10.8305 9.3045C10.9116 9.417 10.9702 9.5205 11.0108 9.6195C11.0513 9.714 11.0739 9.8085 11.0739 9.894C11.0739 10.002 11.0423 10.11 10.9792 10.2135C10.9206 10.317 10.835 10.425 10.7268 10.533L10.3843 10.8885C10.3348 10.938 10.3122 10.9965 10.3122 11.0685C10.3122 11.1045 10.3167 11.136 10.3257 11.172C10.3393 11.208 10.3528 11.235 10.3618 11.262C10.4429 11.4105 10.5826 11.604 10.7809 11.838C10.9837 12.072 11.2 12.3105 11.4344 12.549C11.6778 12.7875 11.9121 13.008 12.151 13.2105C12.3853 13.4085 12.5791 13.5435 12.7323 13.6245C12.7549 13.6335 12.7819 13.647 12.8135 13.6605C12.8495 13.674 12.8856 13.6785 12.9261 13.6785C13.0028 13.6785 13.0613 13.6515 13.1109 13.602L13.4534 13.2645C13.5661 13.152 13.6743 13.0665 13.7779 13.0125C13.8816 12.9495 13.9852 12.918 14.0979 12.918C14.1835 12.918 14.2737 12.936 14.3728 12.9765C14.472 13.017 14.5756 13.0755 14.6883 13.152L16.18 14.2095C16.2972 14.2905 16.3783 14.385 16.4279 14.4975C16.473 14.61 16.5 14.7225 16.5 14.8485Z"
          stroke="#17191C"
          stroke-width="1.5"
          stroke-miterlimit="10"
        ></path>
      </svg>
    ),
  },
  {
    href: "/account/feedback",
    label: "Góp ý phản hồi",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 18.8597H17.24C16.44 18.8597 15.68 19.1697 15.12 19.7297L13.41 21.4197C12.63 22.1897 11.36 22.1897 10.58 21.4197L8.87 19.7297C8.31 19.1697 7.54 18.8597 6.75 18.8597H6C4.34 18.8597 3 17.5298 3 15.8898V4.97974C3 3.33974 4.34 2.00977 6 2.00977H18C19.66 2.00977 21 3.33974 21 4.97974V15.8898C21 17.5198 19.66 18.8597 18 18.8597Z"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M12.28 14.96C12.13 15.01 11.88 15.01 11.72 14.96C10.42 14.51 7.5 12.66 7.5 9.51001C7.5 8.12001 8.62 7 10 7C10.82 7 11.54 7.39 12 8C12.46 7.39 13.18 7 14 7C15.38 7 16.5 8.12001 16.5 9.51001C16.49 12.66 13.58 14.51 12.28 14.96Z"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    ),
  },
  {
    href: "/account/logout",
    label: "Thoát tài khoản",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.90039 7.56023C9.21039 3.96023 11.0604 2.49023 15.1104 2.49023H15.2404C19.7104 2.49023 21.5004 4.28023 21.5004 8.75023V15.2702C21.5004 19.7402 19.7104 21.5302 15.2404 21.5302H15.1104C11.0904 21.5302 9.24039 20.0802 8.91039 16.5402"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M14.9991 12H3.61914"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M5.85 8.65039L2.5 12.0004L5.85 15.3504"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    ),
  },
];

export default menuItems;
