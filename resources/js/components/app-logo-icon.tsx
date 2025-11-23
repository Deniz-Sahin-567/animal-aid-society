import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} width="240" height="240" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cat paw">
            <title>Cat paw</title>
            <path
                d="
      M46 55   a14 14 0 1 0 28 0  a14 14 0 1 0 -28 0
      M74 35   a16 16 0 1 0 32 0  a16 16 0 1 0 -32 0
      M114 35  a16 16 0 1 0 32 0  a16 16 0 1 0 -32 0
      M146 55  a14 14 0 1 0 28 0  a14 14 0 1 0 -28 0

      M50 120
        C50 80 170 80 170 120
        C170 160 115 190 110 190
        C105 190 50 160 50 120
      Z
    "
                fill="#ffffff" stroke="none" />
        </svg>
    );
}
