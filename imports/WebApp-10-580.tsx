import svgPaths from "./svg-txg88puy5p";
import imgImageWithFallback from "figma:asset/ff6fa6689a83a48cbdf98b121670f7c8a84e1fdd.png";

function Heading() {
  return (
    <div className="h-[48px] relative shrink-0 w-[1336px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[48px] left-0 not-italic text-[#ff4e00] text-[32px] top-[-1px] whitespace-nowrap">Point of Sale</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ff4e00] h-[33.5px] relative rounded-[10px] shrink-0 w-[47.781px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[24px] not-italic text-[13px] text-center text-white top-[7px] whitespace-nowrap">All</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[33.5px] relative rounded-[10px] shrink-0 w-[82.813px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[41.5px] not-italic text-[#5d5d5d] text-[13px] text-center top-[7px] whitespace-nowrap">Flowers</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[33.5px] relative rounded-[10px] shrink-0 w-[119.734px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[60px] not-italic text-[#5d5d5d] text-[13px] text-center top-[7px] whitespace-nowrap">Dried Flowers</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[33.5px] relative rounded-[10px] shrink-0 w-[74.469px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[37px] not-italic text-[#5d5d5d] text-[13px] text-center top-[7px] whitespace-nowrap">Potted</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[33.5px] relative rounded-[10px] shrink-0 w-[87.484px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[44px] not-italic text-[#5d5d5d] text-[13px] text-center top-[7px] whitespace-nowrap">Supplies</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white h-[33.5px] relative rounded-[10px] shrink-0 w-[110.672px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[55px] not-italic text-[#5d5d5d] text-[13px] text-center top-[7px] whitespace-nowrap">Accessories</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[33.5px] relative shrink-0 w-[992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
        <Button />
        <Button1 />
        <Button2 />
        <Button3 />
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M12.5 15L7.5 10L12.5 5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#ff4e00] opacity-30 relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="h-[165.656px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[143.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ImageWithFallback />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[#383838] text-[12px] top-0 whitespace-nowrap">sfsgdsgdfg</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#ff4e00] text-[13px] top-0 whitespace-nowrap">P100</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[49.5px] relative shrink-0 w-[143.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[6px] px-[6px] relative size-full">
        <Paragraph />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-white h-[217.156px] left-0 rounded-[8px] top-0 w-[145.328px]" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container5 />
        <Container6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="h-[165.656px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[143.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ImageWithFallback1 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[#383838] text-[12px] top-0 whitespace-nowrap">sfdggfd</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#ff4e00] text-[13px] top-0 whitespace-nowrap">P200</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[49.5px] relative shrink-0 w-[143.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[6px] px-[6px] relative size-full">
        <Paragraph2 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-white h-[217.156px] left-[153.33px] rounded-[8px] top-0 w-[145.328px]" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container7 />
        <Container8 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] h-[667.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button7 />
        <Button8 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M7.5 15L12.5 10L7.5 5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#ff4e00] opacity-30 relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Button6 />
        <Container4 />
        <Button9 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] h-[713px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative size-full">
        <Container2 />
        <Container3 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-0 size-[20px] top-[3.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p39961300} id="Vector" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 5H17.5" id="Vector_2" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2f53ac80} id="Vector_3" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[27px] left-[28px] top-0 w-[120.516px]" data-name="Heading 2">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[#383838] text-[18px] top-px whitespace-nowrap">Current Order</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#ff4e00] content-stretch flex items-center justify-center left-[254px] rounded-[33554400px] size-[24px] top-[1.5px]" data-name="Text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">2</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Container">
      <Icon2 />
      <Heading1 />
      <Text />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[68px] relative shrink-0 w-[318px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[20px] px-[20px] relative size-full">
        <Container12 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[20.16px] size-[14px] top-[10.75px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_7_3073)" id="Icon">
          <path d={svgPaths.p143a9700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p537fbc0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2debeb70} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.16667 4.08333H12.8333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p17538d80} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_7_3073">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#ff4e00] flex-[1_0_0] h-[35.5px] min-h-px min-w-px relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon3 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[79.66px] not-italic text-[13px] text-center text-white top-[8px] whitespace-nowrap">Store Pickup</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[33.92px] size-[14px] top-[10.75px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p341237c0} id="Vector" stroke="var(--stroke-0, #5D5D5D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M8.75 10.5H5.25" id="Vector_2" stroke="var(--stroke-0, #5D5D5D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p94db200} id="Vector_3" stroke="var(--stroke-0, #5D5D5D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3c780f00} id="Vector_4" stroke="var(--stroke-0, #5D5D5D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pd327280} id="Vector_5" stroke="var(--stroke-0, #5D5D5D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="flex-[1_0_0] h-[35.5px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon4 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[80.42px] not-italic text-[#5d5d5d] text-[13px] text-center top-[8px] whitespace-nowrap">Delivery</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[#f6f6f6] h-[43.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start pt-[4px] px-[4px] relative size-full">
        <Button10 />
        <Button11 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_7_3063)" id="Icon">
          <path d={svgPaths.p36f21e80} id="Vector" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2a594880} id="Vector_2" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p20b4ecc0} id="Vector_3" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 4.66667H14.6667" id="Vector_4" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p4cbcae0} id="Vector_5" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_7_3063">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[#383838] text-[12px] top-0 whitespace-nowrap">{`Bloom & Petal Flower Shop`}</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#5d5d5d] text-[11px] top-0 whitespace-nowrap">123 Flower St., Makati City</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col h-[34.5px] items-start left-[34px] top-[10px] w-[153.578px]" data-name="Container">
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#fff5f0] h-[54.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <Icon5 />
      <Container16 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[133px] relative shrink-0 w-[318px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[10px] items-start pb-px pt-[12px] px-[16px] relative size-full">
        <Container14 />
        <Container15 />
      </div>
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[40px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#383838] text-[13px] top-0 whitespace-nowrap">sfsgdsgdfg</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#ff4e00] text-[13px] top-0 whitespace-nowrap">P100</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph6 />
        <Paragraph7 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2.5 6H9.5" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[24px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] py-px relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[24px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[12.8px] not-italic text-[#0a0a0a] text-[13px] text-center top-0 whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2.5 6H9.5" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 2.5V9.5" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-[33554400px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] py-px relative size-full">
          <Icon7 />
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[24px] relative shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Button12 />
        <Text1 />
        <Button13 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 1.33333">
            <path d="M0.666667 0.666667H12.6667" id="Vector" stroke="var(--stroke-0, #CCCCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 12">
            <path d={svgPaths.p2bb3ce80} id="Vector" stroke="var(--stroke-0, #CCCCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 4">
            <path d={svgPaths.pd604100} id="Vector" stroke="var(--stroke-0, #CCCCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 5.33333">
            <path d="M0.666667 0.666667V4.66667" id="Vector" stroke="var(--stroke-0, #CCCCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 5.33333">
            <path d="M0.666667 0.666667V4.66667" id="Vector" stroke="var(--stroke-0, #CCCCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[57px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pb-px px-[16px] relative size-full">
          <ImageWithFallback2 />
          <Container19 />
          <Container20 />
          <Button14 />
        </div>
      </div>
    </div>
  );
}

function ImageWithFallback3() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[40px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#383838] text-[13px] top-0 whitespace-nowrap">sfdggfd</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#ff4e00] text-[13px] top-0 whitespace-nowrap">P200</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph8 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2.5 6H9.5" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[24px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] py-px relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[24px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[12.8px] not-italic text-[#0a0a0a] text-[13px] text-center top-0 whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2.5 6H9.5" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 2.5V9.5" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-[33554400px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] py-px relative size-full">
          <Icon10 />
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[24px] relative shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Button15 />
        <Text2 />
        <Button16 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 1.33333">
            <path d="M0.666667 0.666667H12.6667" id="Vector" stroke="var(--stroke-0, #CCCCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 12">
            <path d={svgPaths.p2bb3ce80} id="Vector" stroke="var(--stroke-0, #CCCCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 4">
            <path d={svgPaths.pd604100} id="Vector" stroke="var(--stroke-0, #CCCCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 5.33333">
            <path d="M0.666667 0.666667V4.66667" id="Vector" stroke="var(--stroke-0, #CCCCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 5.33333">
            <path d="M0.666667 0.666667V4.66667" id="Vector" stroke="var(--stroke-0, #CCCCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[57px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pb-px px-[16px] relative size-full">
          <ImageWithFallback3 />
          <Container22 />
          <Container23 />
          <Button17 />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container18 />
        <Container21 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[50.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#5d5d5d] text-[13px] top-0 whitespace-nowrap">Subtotal</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[33.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#383838] text-[13px] top-0 whitespace-nowrap">P300</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex h-[19.5px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text3 />
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[60.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#5d5d5d] text-[13px] top-0 whitespace-nowrap">Tax (12%)</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[24.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#383838] text-[13px] top-0 whitespace-nowrap">P36</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex h-[19.5px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text5 />
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[38.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#383838] text-[16px] top-[-1px] whitespace-nowrap">Total</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[24px] relative shrink-0 w-[40.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#ff4e00] text-[16px] top-[-1px] whitespace-nowrap">P336</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex h-[31px] items-start justify-between pt-[7px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-solid border-t inset-0 pointer-events-none" />
      <Text7 />
      <Text8 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_10_602)" id="Icon">
          <path d={svgPaths.p1ea03b80} id="Vector" stroke="var(--stroke-0, #5D5D5D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p251a9900} id="Vector_2" stroke="var(--stroke-0, #5D5D5D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pb7d1700} id="Vector_3" stroke="var(--stroke-0, #5D5D5D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_10_602">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[#5d5d5d] text-[12px] top-0 whitespace-nowrap">Auto-print receipt</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[18px] items-center left-0 top-[9px] w-[122.141px]" data-name="Label">
      <Icon12 />
      <Text9 />
    </div>
  );
}

function Container29() {
  return <div className="bg-white h-[16px] rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container" />;
}

function Button18() {
  return (
    <div className="absolute bg-[#d8d8d8] content-stretch flex flex-col h-[20px] items-start left-[250px] pl-[2px] pr-[18px] pt-[2px] rounded-[33554400px] top-[8px] w-[36px]" data-name="Button">
      <Container29 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <Label />
      <Button18 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[149px] relative shrink-0 w-[318px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start pt-[17px] px-[16px] relative size-full">
        <Container25 />
        <Container26 />
        <Container27 />
        <Container28 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-[84.73px] size-[16px] top-[10.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p35993080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 6.66667H14.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="bg-[#ff4e00] h-[37px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Icon13 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[155.23px] not-italic text-[14px] text-center text-white top-[8px] whitespace-nowrap">Pay with Card</p>
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-[78.42px] size-[16px] top-[10.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p15efa800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 12H8.00667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="bg-[#007dfe] h-[37px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Icon14 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[155.42px] not-italic text-[14px] text-center text-white top-[8px] whitespace-nowrap">Pay with GCash</p>
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-[83.66px] size-[16px] top-[10.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p26ef3000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18635ff0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4 8H4.00667M12 8H12.0067" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button21() {
  return (
    <div className="bg-[#2e7d32] h-[37px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Icon15 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[155.16px] not-italic text-[14px] text-center text-white top-[8px] whitespace-nowrap">Pay with Cash</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[139px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start px-[16px] relative size-full">
        <Button19 />
        <Button20 />
        <Button21 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[12px] w-[320px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative size-full">
        <Container11 />
        <Container13 />
        <Container17 />
        <Container24 />
        <Container30 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[713px] relative shrink-0 w-[320px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container10 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1336px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <Container1 />
        <Container9 />
      </div>
    </div>
  );
}

function PointOfSale() {
  return (
    <div className="h-[817px] relative shrink-0 w-full" data-name="PointOfSale">
      <div className="content-stretch flex flex-col gap-[16px] items-start pl-[32px] py-[20px] relative size-full">
        <Heading />
        <Container />
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1524px]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip px-[62px] relative rounded-[inherit] size-full">
        <PointOfSale />
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[251.328px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#5d5d5d] text-[13px] top-0 tracking-[-0.26px] whitespace-nowrap">© 2025 NexxByte Inc. All Rights Reserved.</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[636.328px] pr-[636.344px] relative size-full">
          <Paragraph10 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-white h-[41px] relative shrink-0 w-[1524px]" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#d8d8d8] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-px relative size-full">
        <Container31 />
      </div>
    </div>
  );
}

function Layout() {
  return (
    <div className="absolute bg-[#f7f7f7] content-stretch flex flex-col h-[944px] items-start left-0 pt-[86px] top-0 w-[1524px]" data-name="Layout">
      <MainContent />
      <Footer />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-[17.84%_69.71%_17.44%_17%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.7511 15.5308">
          <path d={svgPaths.p36fac980} fill="var(--fill-0, #FF4E00)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[18.97%_21.85%_0_64.05%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.6484 19.4466">
          <path d={svgPaths.p39cf0a00} fill="var(--fill-0, #383838)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[3.13%_13.19%_17.82%_78.17%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.59155 18.9714">
          <path d={svgPaths.p1b17f27c} fill="var(--fill-0, #383838)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[17.84%_0_17.44%_86.71%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.7511 15.5308">
          <path d={svgPaths.p9871700} fill="var(--fill-0, #383838)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_35.05%_18.85%_49.92%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6852 19.4767">
          <path d={svgPaths.p15d0e400} fill="var(--fill-0, #383838)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_84.29%_18.85%_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.443 19.4766">
          <path d={svgPaths.p2b400800} fill="var(--fill-0, #FF4E00)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[19.02%_61.39%_18.85%_29.99%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.57338 14.9112">
          <path d={svgPaths.p28a43080} fill="var(--fill-0, #FF4E00)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[19.02%_50.46%_54.84%_43.63%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.55399 6.27364">
          <path d={svgPaths.p27fe1c00} fill="var(--fill-0, #383838)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[19.02%_55.23%_18.85%_36.15%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.57338 14.9112">
          <path d={svgPaths.p29cef080} fill="var(--fill-0, #383838)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[52.61%_50.26%_18.85%_43.54%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.88754 6.85105">
          <path d={svgPaths.p2cea5600} fill="var(--fill-0, #383838)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group />
    </div>
  );
}

function Header1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[111px]" data-name="Header">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon16 />
      </div>
    </div>
  );
}

function Header2() {
  return <div className="bg-[#ff4e00] h-[28px] shrink-0 w-[2px]" data-name="Header" />;
}

function Header3() {
  return (
    <div className="flex-[1_0_0] h-[30px] min-h-px min-w-px relative" data-name="Header">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[30px] left-0 not-italic text-[#383838] text-[20px] top-0 whitespace-nowrap">Flowershop CRM</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="flex-[1_0_0] h-[30px] min-h-px min-w-px relative" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Header1 />
        <Header2 />
        <Header3 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[30px] relative shrink-0 w-[299.766px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Link />
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[104.813px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#5d5d5d] text-[15px] top-[-2px] whitespace-nowrap">{`Sales & Orders`}</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[90.047px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] left-0 not-italic text-[#ff4e00] text-[15px] top-[-2px] whitespace-nowrap">Point of Sale</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[80.016px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#5d5d5d] text-[15px] top-[-2px] whitespace-nowrap">Workshops</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[66.484px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#5d5d5d] text-[15px] top-[-2px] whitespace-nowrap">Inventory</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[69.813px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#5d5d5d] text-[15px] top-[-2px] whitespace-nowrap">Deliveries</p>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Navigation">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center justify-center pl-[157px] pr-[157.016px] relative size-full">
          <Link1 />
          <Link2 />
          <Link3 />
          <Link4 />
          <Link5 />
        </div>
      </div>
    </div>
  );
}

function Container35() {
  return <div className="absolute bg-[#cacaca] h-[48px] left-[52px] top-0 w-px" data-name="Container" />;
}

function Link6() {
  return (
    <div className="absolute bg-white border border-[#ff4e00] border-solid h-[47.5px] left-[69px] rounded-[10px] top-[0.25px] w-[139.906px]" data-name="Link">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25.5px] left-[24px] not-italic text-[#ff4e00] text-[17px] top-[9px] whitespace-nowrap">Customers</p>
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-[8px] size-[20px] top-[8px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p39961300} id="Vector" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 5H17.5" id="Vector_2" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2f53ac80} id="Vector_3" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute bg-[#424242] content-stretch flex items-center justify-center left-[20px] rounded-[33554400px] size-[16px] top-0" data-name="Text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">2</p>
    </div>
  );
}

function Button22() {
  return (
    <div className="absolute left-0 rounded-[10px] size-[36px] top-[6px]" data-name="Button">
      <Icon17 />
      <Text10 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p224d4200} fill="var(--fill-0, #FF4E00)" id="Vector" />
      </svg>
      <div className="absolute inset-[20%_32.5%_45%_32.5%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.99996 6.99996">
          <path d={svgPaths.p38112172} fill="var(--fill-0, #FF4E00)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Group1 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] left-[31.5px] not-italic text-[#ff4e00] text-[15px] text-center top-[-2px] whitespace-nowrap">Ren Urot</p>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button23() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[22.5px] items-center left-[224.91px] top-[12.75px] w-[114.141px]" data-name="Button">
      <Container36 />
      <Text11 />
      <Icon19 />
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[48px] relative shrink-0 w-[339.047px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container35 />
        <Link6 />
        <Button22 />
        <Button23 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[85px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] relative size-full">
          <Container33 />
          <Navigation />
          <Container34 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] content-stretch flex flex-col h-[86px] items-start left-0 pb-px top-0 w-[1524px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#d8d8d8] border-b border-solid inset-0 pointer-events-none" />
      <Container32 />
    </div>
  );
}

export default function WebApp() {
  return (
    <div className="bg-white relative size-full" data-name="Web app">
      <Layout />
      <Header />
    </div>
  );
}