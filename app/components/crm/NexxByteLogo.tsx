import svgPaths from "../../../imports/svg-nn512elinn";

export function NexxByteLogo({ size = 28 }: { size?: number }) {
  const scale = size / 28;
  return (
    <div style={{ height: size, width: 130 * scale }} className="relative overflow-clip">
      <div className="absolute inset-0">
        {/* N */}
        <div className="absolute inset-[0_84.29%_18.85%_0]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.4287 22.7227">
            <path d={svgPaths.p1a26f00} fill="#FF4E00" />
          </svg>
        </div>
        {/* e */}
        <div className="absolute inset-[17.84%_69.71%_17.44%_17%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.276 18.1192">
            <path d={svgPaths.p1fa6cd00} fill="#FF4E00" />
          </svg>
        </div>
        {/* x */}
        <div className="absolute inset-[19.02%_61.39%_18.85%_29.99%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2121 17.3964">
            <path d={svgPaths.p10853b0} fill="#FF4E00" />
          </svg>
        </div>
        <div className="absolute inset-[19.02%_50.46%_54.84%_43.63%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.67584 7.31925">
            <path d={svgPaths.p1a87f700} fill="#383838" />
          </svg>
        </div>
        <div className="absolute inset-[19.02%_55.23%_18.85%_36.15%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2121 17.3964">
            <path d={svgPaths.pa2eb000} fill="#383838" />
          </svg>
        </div>
        <div className="absolute inset-[52.61%_50.26%_18.85%_43.54%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.06648 7.99289">
            <path d={svgPaths.p555bf40} fill="#383838" />
          </svg>
        </div>
        {/* B */}
        <div className="absolute inset-[0_35.05%_18.85%_49.92%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5412 22.7228">
            <path d={svgPaths.p26a1ba00} fill="#383838" />
          </svg>
        </div>
        {/* y */}
        <div className="absolute inset-[18.97%_21.85%_0_64.05%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.327 22.6877">
            <path d={svgPaths.p189d6b00} fill="#383838" />
          </svg>
        </div>
        {/* t */}
        <div className="absolute inset-[3.13%_13.19%_17.82%_78.17%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2334 22.1332">
            <path d={svgPaths.p1c373600} fill="#383838" />
          </svg>
        </div>
        {/* e */}
        <div className="absolute inset-[17.84%_0_17.44%_86.71%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.276 18.1192">
            <path d={svgPaths.p15390400} fill="#383838" />
          </svg>
        </div>
      </div>
    </div>
  );
}
