import { ReactNode } from "react";

const ActionSquare = (props: {
  onClick: () => void;
  text: string;
  children?: ReactNode;
}) => {
  return (
    <button onClick={props.onClick}>
      <div className='image w-[365px] h-[256px] bg-white97 rounded-lg flex flex-col p-[12px] mt-[35px]'>
        <div className='icon flex-grow justify-center items-center flex'>
          {props.children}
        </div>
        <div className='flex justify-center'>
          <p className='font-medium text-[18px] text-black100 leading-[27px]'>
            {props.text}
          </p>
        </div>
      </div>
    </button>
  );
};

export default ActionSquare;
