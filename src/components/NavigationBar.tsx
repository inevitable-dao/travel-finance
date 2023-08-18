/* eslint-disable @next/next/no-img-element */
import styled from '@emotion/styled';

export const NavigationBar: React.FC = () => {
  return (
    <div
      className="fixed top-0 left-0 right-0 w-full max-w-2xl mx-auto h-[84px] pt-4 flex justify-between"
      style={{
        background: `linear-gradient(to bottom, #000000, rgba(0, 0, 0, 0), 95%)`,
      }}
    >
      <div />

      <div className="h-[27px] flex relative">
        <div className="bg-[#FF4999] pl-[38px] pr-[16px] w-fit py-2 leading-none min-w-[140px] h-full flex items-center relative">
          <img
            src="/assets/coin.png"
            className="w-[42px] h-[42px] left-0 bottom-0 absolute -mb-[6px]"
            alt=""
          />
          <Points>3,200</Points>
        </div>
        <Name className="bg-[#363641] pl-2 pr-[28px] h-full w-fit flex items-center leading-none">
          @junhoyeo
        </Name>

        <img
          src="/assets/arrow.svg"
          className="w-[192px] h-[8px] absolute left-[-8px] bottom-[-8px]"
          alt=""
        />
      </div>
    </div>
  );
};

const Points = styled.span`
  color: #fff;
  text-shadow: 0px 2px 12px #980040;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`;
const Name = styled.span`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
`;
