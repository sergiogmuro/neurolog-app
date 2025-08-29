type MoodValue =
    | "sad" | "neutral" | "good" | "great" | "excellent"
    | "joy" | "sadness" | "anger" | "fear" | "surprise" | "calm";

type Props = {
  value: MoodValue;
  size?: number;        // px
  bg?: string;          // color de fondo (override)
  face?: string;        // color del trazo de la cara
};

const defaultBg: Record<MoodValue, string> = {
  sad: "#93C5FD", // blue-300
  neutral: "#FBCFE8", // pink-200
  good: "#4ADE80", // green-400
  great: "#FACC15", // yellow-400
  excellent: "#FB923C", // orange-400
  joy: "#FACC15",
  sadness: "#93C5FD",
  anger: "#F87171", // red-400
  fear: "#A5B4FC", // indigo-300
  surprise: "#FDE68A", // amber-200
  calm: "#86EFAC", // green-300
};

const eye = (cx: number, cy: number) => (
    <circle cx={cx} cy={cy} r="2.4"/>
);

const MOUTH_POSITION = 40;

const Mouth = {
  smile: <path d={`M24 ${MOUTH_POSITION}c4.5 5 11.5 5 16 0`} fill="none" strokeWidth="2.6" strokeLinecap="round"/>,
  excellent: <path d={`M22 ${MOUTH_POSITION} q10 10 20 0`} fill="none" strokeWidth="3" strokeLinecap="round"/>,
  calm: <path d={`M22 ${MOUTH_POSITION + 3} q10 6 20 0`} fill="none" strokeWidth="2.6" strokeLinecap="round"/>,
  flat: <line x1="24" y1={`${MOUTH_POSITION + 1}`} x2="40" y2={`${MOUTH_POSITION + 1}`} strokeWidth="2.6"
              strokeLinecap="round"/>,
  frown: <path d={`M24 ${MOUTH_POSITION + 4}c4.5-5 11.5-5 16 0`} fill="none" strokeWidth="2.6" strokeLinecap="round"/>,
  openO: <circle cx="32" cy={`${MOUTH_POSITION + 3}`} r="4" fill="none" strokeWidth="2.6"/>,
  anxiety: <path d={`M23 ${MOUTH_POSITION + 1}c3 3 15 3 18 0`} fill="none" strokeWidth="2.6" strokeLinecap="round"/>,
  grim: <path d={`M24 ${MOUTH_POSITION + 3}h16`} strokeWidth="2.6" strokeLinecap="round"/>,
};

const BrowAngry = (
    <g>
      <path d="M20 22 l8 4" strokeWidth="2.6" strokeLinecap="round" fill="none"/>
      <path d="M44 22 l-8 4" strokeWidth="2.6" strokeLinecap="round" fill="none"/>
    </g>
);

const BrowFear = (
    <g>
      <path d="M22 22 h8" strokeWidth="2.6" strokeLinecap="round" fill="none"/>
      <path d="M34 22 h8" strokeWidth="2.6" strokeLinecap="round" fill="none"/>
    </g>
);

const BrowSurprise = (
    <g>
      <path d="M22 21 h8" strokeWidth="2.6" strokeLinecap="round" fill="none"/>
      <path d="M34 21 h8" strokeWidth="2.6" strokeLinecap="round" fill="none"/>
    </g>
);

const BrowCalm = (
    <g>
      <path d="M22 23 q4 -4 8 0" strokeWidth="2.6" strokeLinecap="round" fill="none"/>
      <path d="M34 23 q4 -4 8 0" strokeWidth="2.6" strokeLinecap="round" fill="none"/>
    </g>
);

export default function MoodIcon({value, size = 64, bg, face = "#1F2937" /* gray-800 */}: Props) {
  const fill = bg ?? defaultBg[value];

  // rostro base
  const BaseFace = ({children}: { children: React.ReactNode }) => (
      <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          role="img"
          aria-label={value}
      >
        <defs>
          <clipPath id="circle">
            <circle cx="32" cy="32" r="28"/>
          </clipPath>
        </defs>
        <circle cx="32" cy="32" r="28" fill={fill}/>
        <g clipPath="url(#circle)" stroke={face} fill={face}>
          {children}
        </g>
      </svg>
  );

  switch (value) {
      // PRIMARIOS (triste → excelente)
    case "sad":
      return (
          <BaseFace>
            {eye(24, 27)}{eye(40, 27)}
            {Mouth.frown}
          </BaseFace>
      );
    case "neutral":
      return (
          <BaseFace>
            {eye(24, 27)}{eye(40, 27)}
            {Mouth.flat}
          </BaseFace>
      );
    case "good":
      return (
          <BaseFace>
            {eye(24, 27)}{eye(40, 27)}
            {Mouth.smile}
          </BaseFace>
      );
    case "great":
      return (
          <BaseFace>
            {eye(24, 26.5)}{eye(40, 26.5)}
            {Mouth.smile}
          </BaseFace>
      );
    case "excellent":
      return (
          <BaseFace>
            {eye(23.5, 26)}{eye(40.5, 26)}
            {Mouth.excellent}
          </BaseFace>
      );

      // SECUNDARIOS
    case "joy":
      return (
          <BaseFace>
            {eye(24, 26)}{eye(40, 26)}
            {Mouth.smile}
          </BaseFace>
      );
    case "sadness":
      return (
          <BaseFace>
            {eye(24, 27)}{eye(40, 27)}
            {Mouth.frown}
          </BaseFace>
      );
    case "anger":
      return (
          <BaseFace>
            {BrowAngry}
            {eye(24, 28)}{eye(40, 28)}
            {Mouth.grim}
          </BaseFace>
      );
    case "fear":
      return (
          <BaseFace>
            {BrowFear}
            {eye(24, 27)}{eye(40, 27)}
            {Mouth.anxiety}
          </BaseFace>
      );
    case "surprise":
      return (
          <BaseFace>
            {BrowSurprise}
            {eye(24, 26)}{eye(40, 26)}
            {Mouth.openO}
          </BaseFace>
      );
    case "calm":
      return (
          <BaseFace>
            {BrowCalm}
            {eye(24, 27)}{eye(40, 27)}
            {Mouth.calm}
          </BaseFace>
      );
    default:
      return (
          <BaseFace>
            {eye(24, 27)}{eye(40, 27)}
            {Mouth.flat}
          </BaseFace>
      );
  }
}
