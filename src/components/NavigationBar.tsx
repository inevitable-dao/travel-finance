/* eslint-disable @next/next/no-img-element */
import styled from '@emotion/styled';

export const NavigationBar: React.FC = () => {
  return (
    <div className="flex h-[32px]">
      <Container
        className="fixed top-0 left-0 right-0 w-full max-w-2xl mx-auto h-[84px] pt-4 flex justify-between z-50"
        style={{
          background: `linear-gradient(to bottom, #000000, rgba(0, 0, 0, 0) 90%)`,
        }}
      >
        <div />

        <div className="h-[27px] flex relative">
          <div className="bg-[#FF4999] pl-[38px] pr-[16px] w-fit py-2 leading-none min-w-0 sm:min-w-[140px] h-full flex items-center relative">
            <img
              src="/assets/coin.png"
              className="w-[38px] h-[38px] left-0 bottom-0 absolute"
              style={{
                boxShadow: `0px 4px 4px 0px rgba(0, 3, 85, 0.15)`,
              }}
              alt=""
            />
            <Points>3,200</Points>
          </div>
          <Name className="bg-[#363641] pl-2 pr-[16px] sm:pr-[16px] h-full w-fit flex items-center leading-none text-slate-300">
            @junhoyeo
          </Name>

          <img
            src="/assets/arrow.svg"
            className="w-[192px] h-[8px] absolute left-[-8px] bottom-[-8px]"
            alt=""
          />
        </div>
      </Container>
    </div>
  );
};

const Container = styled.div`
  pointer-events: none;
  & * {
    pointer-events: auto;
  }
`;

const Points = styled.span`
  color: #fff;
  text-shadow: 0px 2px 12px #980040;
  font-size: 16px;
  font-weight: 700;
`;
const Name = styled.span`
  font-size: 16px;
  font-weight: 500;
`;
