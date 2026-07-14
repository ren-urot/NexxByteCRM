import svgPaths from "./svg-9qgtim6r7i";
import imgImageWithFallback from "figma:asset/ff6fa6689a83a48cbdf98b121670f7c8a84e1fdd.png";

function Heading() {
  return (
    <div className="h-[48px] relative shrink-0 w-[138.734px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[48px] left-0 not-italic text-[#ff4e00] text-[32px] top-[-1px] tracking-[-0.64px] whitespace-nowrap">Inventory</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[21px] size-[16px] top-[13.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white flex-[1_0_0] h-[43px] min-h-px min-w-px relative rounded-[10px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#ff4e00] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[75.5px] not-italic text-[#ff4e00] text-[14px] text-center top-[11px] whitespace-nowrap">Add Item</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[43px] relative shrink-0 w-[126.172px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[48px] relative shrink-0 w-[1336px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Heading />
        <Container1 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#5d5d5d] text-[13px] top-0 whitespace-nowrap">Total Items</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[39px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[39px] left-0 not-italic text-[#383838] text-[26px] top-0 whitespace-nowrap">2</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[4px] h-[96.5px] items-start left-0 pb-px pt-[17px] px-[17px] rounded-[12px] top-0 w-[434.656px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#5d5d5d] text-[13px] top-0 whitespace-nowrap">Low Stock</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[39px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[39px] left-0 not-italic text-[#e65100] text-[26px] top-0 whitespace-nowrap">0</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[4px] h-[96.5px] items-start left-[450.66px] pb-px pt-[17px] px-[17px] rounded-[12px] top-0 w-[434.672px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#5d5d5d] text-[13px] top-0 whitespace-nowrap">Out of Stock</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[39px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[39px] left-0 not-italic text-[#c62828] text-[26px] top-0 whitespace-nowrap">0</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[4px] h-[96.5px] items-start left-[901.33px] pb-px pt-[17px] px-[17px] rounded-[12px] top-0 w-[434.656px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[96.5px] relative shrink-0 w-[1336px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container3 />
        <Container4 />
        <Container5 />
      </div>
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="absolute left-[16px] rounded-[10px] size-[40px] top-[11.25px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgImageWithFallback} />
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[62px] left-0 top-0 w-[82.078px]" data-name="Table Cell">
      <ImageWithFallback />
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[62px] left-[82.08px] top-0 w-[237.906px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[24px] not-italic text-[#5d5d5d] text-[16px] top-[18.25px] whitespace-nowrap">sfsgdsgdfg</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[62px] left-[319.98px] top-0 w-[218.234px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[24px] not-italic text-[#5d5d5d] text-[16px] top-[18.25px] whitespace-nowrap">Flowers</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute h-[62px] left-[538.22px] top-0 w-[172.875px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[24px] not-italic text-[#5d5d5d] text-[16px] top-[18.25px] whitespace-nowrap">100</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute h-[62px] left-[711.09px] top-0 w-[165.859px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[24px] not-italic text-[#5d5d5d] text-[16px] top-[18.25px] whitespace-nowrap">100</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#e8f5e9] content-stretch flex h-[23px] items-start left-[24px] px-[12px] py-[4px] rounded-[33554400px] top-[21.25px] w-[70.297px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#2e7d32] text-[12px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute h-[62px] left-[876.95px] top-0 w-[181.469px]" data-name="Table Cell">
      <Text />
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[33.5px] relative rounded-[5px] shrink-0 w-[57.984px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#ff4e00] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-[29.5px] not-italic text-[#ff4e00] text-[13px] text-center top-[7px] whitespace-nowrap">Edit</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#ff4e00] h-[31.5px] relative rounded-[5px] shrink-0 w-[72.328px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-[36.5px] not-italic text-[13px] text-center text-white top-[6px] whitespace-nowrap">Delete</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[33.5px] items-center left-[24px] top-[14.5px] w-[227.578px]" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute h-[62px] left-[1058.42px] top-0 w-[275.578px]" data-name="Table Cell">
      <Container8 />
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute bg-[#f6f6f6] h-[62px] left-0 top-0 w-[1334px]" data-name="Table Row">
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="absolute left-[16px] rounded-[10px] size-[40px] top-[10.75px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgImageWithFallback} />
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute h-[61.5px] left-0 top-0 w-[82.078px]" data-name="Table Cell">
      <ImageWithFallback1 />
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute h-[61.5px] left-[82.08px] top-0 w-[237.906px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[24px] not-italic text-[#5d5d5d] text-[16px] top-[17.75px] whitespace-nowrap">sfdggfd</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute h-[61.5px] left-[319.98px] top-0 w-[218.234px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[24px] not-italic text-[#5d5d5d] text-[16px] top-[17.75px] whitespace-nowrap">Flowers</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute h-[61.5px] left-[538.22px] top-0 w-[172.875px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[24px] not-italic text-[#5d5d5d] text-[16px] top-[17.75px] whitespace-nowrap">200</p>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute h-[61.5px] left-[711.09px] top-0 w-[165.859px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[24px] not-italic text-[#5d5d5d] text-[16px] top-[17.75px] whitespace-nowrap">200</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-[#e8f5e9] content-stretch flex h-[23px] items-start left-[24px] px-[12px] py-[4px] rounded-[33554400px] top-[20.75px] w-[70.297px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#2e7d32] text-[12px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute h-[61.5px] left-[876.95px] top-0 w-[181.469px]" data-name="Table Cell">
      <Text1 />
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[33.5px] relative rounded-[5px] shrink-0 w-[57.984px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#ff4e00] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-[29.5px] not-italic text-[#ff4e00] text-[13px] text-center top-[7px] whitespace-nowrap">Edit</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#ff4e00] h-[31.5px] relative rounded-[5px] shrink-0 w-[72.328px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-[36.5px] not-italic text-[13px] text-center text-white top-[6px] whitespace-nowrap">Delete</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[33.5px] items-center left-[24px] top-[14px] w-[227.578px]" data-name="Container">
      <Button3 />
      <Button4 />
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute h-[61.5px] left-[1058.42px] top-0 w-[275.578px]" data-name="Table Cell">
      <Container9 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute bg-white h-[61.5px] left-0 top-[62px] w-[1334px]" data-name="Table Row">
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[123.5px] left-0 top-[59.5px] w-[1334px]" data-name="Table Body">
      <TableRow />
      <TableRow1 />
    </div>
  );
}

function Table() {
  return (
    <div className="absolute h-[183px] left-0 top-0 w-[1334px]" data-name="Table">
      <TableBody />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute h-[59.5px] left-0 top-0 w-[82.078px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[27px] left-[16px] not-italic text-[#ff4e00] text-[18px] top-[17px] whitespace-nowrap">Photo</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[120.88px] size-[16px] top-[23.09px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.4">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute h-[59.5px] left-[82.08px] top-0 w-[237.906px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[27px] left-[24px] not-italic text-[#ff4e00] text-[18px] top-[17px] whitespace-nowrap">Item Name</p>
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[107.58px] size-[16px] top-[23.09px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.4">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute h-[59.5px] left-[319.98px] top-0 w-[218.234px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[27px] left-[24px] not-italic text-[#ff4e00] text-[18px] top-[17px] whitespace-nowrap">Category</p>
      <Icon2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[76.91px] size-[16px] top-[23.09px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.4">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute h-[59.5px] left-[538.22px] top-0 w-[172.875px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[27px] left-[24px] not-italic text-[#ff4e00] text-[18px] top-[17px] whitespace-nowrap">Stock</p>
      <Icon3 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[72.16px] size-[16px] top-[23.09px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.4">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute h-[59.5px] left-[711.09px] top-0 w-[165.859px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[27px] left-[24px] not-italic text-[#ff4e00] text-[18px] top-[17px] whitespace-nowrap">Price</p>
      <Icon4 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[82.72px] size-[16px] top-[23.09px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.4">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #FF4E00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="absolute h-[59.5px] left-[876.95px] top-0 w-[181.469px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[27px] left-[24px] not-italic text-[#ff4e00] text-[18px] top-[17px] whitespace-nowrap">Status</p>
      <Icon5 />
    </div>
  );
}

function HeaderCell6() {
  return (
    <div className="absolute h-[59.5px] left-[1058.42px] top-0 w-[275.578px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[27px] left-[24px] not-italic text-[#ff4e00] text-[18px] top-[17px] whitespace-nowrap">Action</p>
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute border-[#c3c3c3] border-b border-solid h-[59.5px] left-0 top-0 w-[1334px]" data-name="Table Row">
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
      <HeaderCell5 />
      <HeaderCell6 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute bg-white h-[59.5px] left-0 top-0 w-[1334px]" data-name="Table Header">
      <TableRow2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1334px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Table />
        <TableHeader />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[14px] w-[1336px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c3c3] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Inventory() {
  return (
    <div className="h-[769px] relative shrink-0 w-full" data-name="Inventory">
      <div className="content-stretch flex flex-col gap-[16px] items-start pl-[32px] py-[20px] relative size-full">
        <Container />
        <Container2 />
        <Container6 />
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1579px]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip px-[89.5px] relative rounded-[inherit] size-full">
        <Inventory />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[251.328px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#5d5d5d] text-[13px] top-0 tracking-[-0.26px] whitespace-nowrap">© 2025 NexxByte Inc. All Rights Reserved.</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[663.828px] pr-[663.844px] relative size-full">
          <Paragraph6 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-white h-[41px] relative shrink-0 w-[1579px]" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#d8d8d8] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-px relative size-full">
        <Container10 />
      </div>
    </div>
  );
}

function Layout() {
  return (
    <div className="absolute bg-[#f7f7f7] content-stretch flex flex-col h-[896px] items-start left-0 pt-[86px] top-0 w-[1579px]" data-name="Layout">
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

function Icon6() {
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
        <Icon6 />
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

function Container12() {
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
    <div className="h-[22.5px] relative shrink-0 w-[89.313px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#5d5d5d] text-[15px] top-[-2px] whitespace-nowrap">Point of Sale</p>
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
    <div className="h-[22.5px] relative shrink-0 w-[67.734px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] left-0 not-italic text-[#ff4e00] text-[15px] top-[-2px] whitespace-nowrap">Inventory</p>
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
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center justify-center px-[184.25px] relative size-full">
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

function Container14() {
  return <div className="absolute bg-[#cacaca] h-[48px] left-[52px] top-0 w-px" data-name="Container" />;
}

function Link6() {
  return (
    <div className="absolute bg-white border border-[#ff4e00] border-solid h-[47.5px] left-[69px] rounded-[10px] top-[0.25px] w-[139.906px]" data-name="Link">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25.5px] left-[24px] not-italic text-[#ff4e00] text-[17px] top-[9px] whitespace-nowrap">Customers</p>
    </div>
  );
}

function Icon7() {
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

function Text2() {
  return (
    <div className="absolute bg-[#424242] content-stretch flex items-center justify-center left-[20px] rounded-[33554400px] size-[16px] top-0" data-name="Text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">2</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute left-0 rounded-[10px] size-[36px] top-[6px]" data-name="Button">
      <Icon7 />
      <Text2 />
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

function Icon8() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Group1 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] left-[31.5px] not-italic text-[#ff4e00] text-[15px] text-center top-[-2px] whitespace-nowrap">Ren Urot</p>
      </div>
    </div>
  );
}

function Icon9() {
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

function Button6() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[22.5px] items-center left-[224.91px] top-[12.75px] w-[114.141px]" data-name="Button">
      <Container15 />
      <Text3 />
      <Icon9 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[48px] relative shrink-0 w-[339.047px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container14 />
        <Link6 />
        <Button5 />
        <Button6 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[85px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] relative size-full">
          <Container12 />
          <Navigation />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] content-stretch flex flex-col h-[86px] items-start left-0 pb-px top-0 w-[1579px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#d8d8d8] border-b border-solid inset-0 pointer-events-none" />
      <Container11 />
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