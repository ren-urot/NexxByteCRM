import svgPaths from "./svg-2x9crwyny4";

function Group1() {
  return (
    <div className="absolute inset-[0_0_0.02%_0]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 111.217 24.2384">
        <g id="Group">
          <path d={svgPaths.p35e1f00} fill="var(--fill-0, #FF4E00)" id="Vector" />
          <path d={svgPaths.p3f84db00} fill="var(--fill-0, #383838)" id="Vector_2" />
          <path d={svgPaths.p387e2d00} fill="var(--fill-0, #383838)" id="Vector_3" />
          <path d={svgPaths.pd3ea180} fill="var(--fill-0, #383838)" id="Vector_4" />
          <path d={svgPaths.p3e529840} fill="var(--fill-0, #383838)" id="Vector_5" />
          <path d={svgPaths.p1a2e7680} fill="var(--fill-0, #FF4E00)" id="Vector_6" />
          <path d={svgPaths.p326996f2} fill="var(--fill-0, #FF4E00)" id="Vector_7" />
          <path d={svgPaths.p3a897f80} fill="var(--fill-0, #383838)" id="Vector_8" />
          <path d={svgPaths.pc62baf0} fill="var(--fill-0, #383838)" id="Vector_9" />
          <path d={svgPaths.p11c05700} fill="var(--fill-0, #383838)" id="Vector_10" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[0_0_0.02%_0]" data-name="Group">
      <Group1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[24.244px] left-[360px] overflow-clip top-[31.85px] w-[111.217px]" data-name="Frame">
      <Group />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[360px] top-[31.85px]">
      <Frame />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[1421.8px] top-[20.89px]">
      <div className="absolute bg-white h-[43.405px] left-[1421.8px] rounded-[6.313px] top-[20.89px] w-[138.621px]">
        <div aria-hidden="true" className="absolute border-[#ff4e00] border-[1.5px] border-solid inset-[-1.5px] pointer-events-none rounded-[7.813px]" />
      </div>
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[1489.04px] not-italic text-[#ff4e00] text-[17.362px] text-center top-[31.94px] whitespace-nowrap">Sign Up</p>
    </div>
  );
}

export default function Group4() {
  return (
    <div className="relative size-full">
      <div className="-translate-x-1/2 absolute bg-white border border-[#d8d8d8] border-solid h-[85px] left-1/2 top-0 w-[1920px]" />
      <Group3 />
      <Group2 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[1170.08px] not-italic text-[#383838] text-[16px] text-center top-[33px] whitespace-nowrap">About Us</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[1296.07px] not-italic text-[#383838] text-[16px] text-center top-[33px] whitespace-nowrap">Contact Us</p>
    </div>
  );
}