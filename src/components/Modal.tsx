import CloseIcon from "../icons/CloseIcon";
import AlertIcon from "../icons/AlertIcon";

const Modal: React.FC<{
  trigger: boolean;
  setTrigger: (value: boolean) => void;
  resetForm: () => void;
}> = (props) => {
  return props.trigger ? (
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='flex h-[584px] w-[643px] flex-col rounded-lg bg-white '>
        <div className='m-4 flex justify-end'>
          <button onClick={() => props.setTrigger(false)}>
            <CloseIcon width={32} height={32} fillColor={"black"} />
          </button>
        </div>
        <div className='flex w-full justify-center'>
          <div className='flex h-[400px] w-[387px] flex-col '>
            <div className='flex justify-center'>
              <AlertIcon width={290} height={290} fillColor={"#CB0000"} />
            </div>
            <div className='flex flex-col items-center'>
              <div>
                <p className='text-black100 text-[32px] font-bold leading-[48px]'>
                  WARNING
                </p>
              </div>
              <div>
                <p className='text-black75 text-center text-[18px] font-medium leading-[27px]'>
                  You're about to reset whole process. Are you sure you want to
                  do it?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[34px] flex justify-center'>
          <button
            className='text-black100 mr-[34px] text-[18px] font-medium leading-[27px]'
            onClick={() => props.setTrigger(false)}>
            Cancel
          </button>
          <button
            className='bg-primary hover:bg-primary100 focus:bg-primary disabled:bg-black25 rounded-lg px-[32px] py-[8px] text-[15px] font-semibold leading-[22.5px] tracking-[0.5px] text-white'
            onClick={props.resetForm}>
            Reset
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
