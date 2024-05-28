import ResetIcon from "../icons/ResetIcon";
import LogoIcon from "../icons/LogoIcon";
import TextIcon from "../icons/TextIcon";
import ImgIcon from "../icons/ImgIcon";
import BackgroundIcon from "../icons/BackgroundIcon";
import MoveIcon from "../icons/MoveIcon";
import DeleteIcon from "../icons/DeleteIcon";
import ActionSquare from "./ActionSquare.tsx";

import { useState, MouseEvent } from "react";

import "../index.css";
import Modal from "./Modal.tsx";
import SelectColor from "./SelectColor.tsx";

const MainPageComponent = () => {
  const startImg: string = require("../img/startImg.png");
  const emptyImg: string = require("../img/emptyImg.png");

  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [positionImage, setPositionImage] = useState<{ x: number; y: number }>({
    x: 280,
    y: 374,
  });
  const [draggingImage, setDraggingImage] = useState<boolean>(false);
  const [offsetImage, setOffsetImage] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [positionText, setPositionText] = useState<{ x: number; y: number }>({
    x: 202,
    y: 400,
  });
  const [draggingText, setDraggingText] = useState<boolean>(false);
  const [offsetText, setOffsetText] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [modal, setModal] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [textBoxVisibility, setTextBoxVisibility] = useState<boolean>(false);
  const [textColor, setTextColor] = useState<string>("#353535");
  const [prevDivImg, setPrevDivImg] = useState<string>(startImg);

  const backgroundWidth: number = 759;
  const backgroundHeight: number = 948;
  const overlayWidth: number = 200;
  const overlayHeight: number = 200;
  const textWidth: number = 355;
  const textHeight: number = 148;

  const handleMouseDownImg = (e: MouseEvent) => {
    e.preventDefault();
    setDraggingImage(true);
    setOffsetImage({
      x: e.clientX - positionImage.x,
      y: e.clientY - positionImage.y,
    });
  };

  const handleMouseDownText = (e: MouseEvent) => {
    e.preventDefault();
    setDraggingText(true);
    setOffsetText({
      x: e.clientX - positionText.x,
      y: e.clientY - positionText.y,
    });
  };

  const handleMouseMoveImg = (e: MouseEvent) => {
    if (draggingImage) {
      const newX = e.clientX - offsetImage.x;
      const newY = e.clientY - offsetImage.y;

      const boundedX = Math.max(
        0,
        Math.min(newX, backgroundWidth - overlayWidth)
      );
      const boundedY = Math.max(
        0,
        Math.min(newY, backgroundHeight - overlayHeight)
      );

      setPositionImage({
        x: boundedX,
        y: boundedY,
      });
    }
  };

  const handleMouseMoveText = (e: MouseEvent) => {
    if (draggingText) {
      const newX = e.clientX - offsetText.x;
      const newY = e.clientY - offsetText.y;

      const boundedX = Math.max(0, Math.min(newX, backgroundWidth - textWidth));
      const boundedY = Math.max(
        0,
        Math.min(newY, backgroundHeight - textHeight)
      );

      setPositionText({
        x: boundedX,
        y: boundedY,
      });
    }
  };

  const handleMouseUpImg = () => {
    setDraggingImage(false);
  };

  const handleMouseUpText = () => {
    setDraggingText(false);
  };

  const textMenagment = () => {
    setTextBoxVisibility(true);
    setPrevDivImg(emptyImg);
  };

  const handleBackgroundClick = () => {
    const backgroundInput = document.getElementById("backgroundInput");
    if (backgroundInput) {
      backgroundInput.click();
    }
  };

  const handleImageClick = () => {
    const imageInput = document.getElementById("imageInput");
    if (imageInput) {
      imageInput.click();
      setPrevDivImg(emptyImg);
    }
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e?.target?.result;
        if (result) {
          setSelectedBackground(result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e?.target?.result;
        if (result) {
          setSelectedImage(result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setSelectedBackground(null);
    setSelectedImage(null);
    setPositionImage({ x: 0, y: 0 });
    setDraggingImage(false);
    setOffsetImage({ x: 0, y: 0 });
    setPositionText({ x: 0, y: 0 });
    setDraggingText(false);
    setOffsetText({ x: 0, y: 0 });
    setModal(false);
    setText("");
    setTextBoxVisibility(false);
    setTextColor("#353535");
    setPrevDivImg(startImg);

    const backgroundInput = document.getElementById(
      "backgroundInput"
    ) as HTMLInputElement;
    const imageInput = document.getElementById(
      "imageInput"
    ) as HTMLInputElement;
    if (backgroundInput) {
      backgroundInput.value = "";
    }
    if (imageInput) {
      imageInput.value = "";
    }
  };

  const deleteCoverImage = () => {
    setSelectedImage(null);
    setPositionImage({ x: 0, y: 0 });
    setDraggingImage(false);
    setOffsetImage({ x: 0, y: 0 });
  };

  const deleteText = () => {
    setPositionText({ x: 0, y: 0 });
    setDraggingText(false);
    setOffsetText({ x: 0, y: 0 });
    setText("");
    setTextBoxVisibility(false);
    setTextColor("#353535");
  };

  const saveAsImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = backgroundWidth;
    canvas.height = backgroundHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const drawOverlayAndText = () => {
        if (selectedImage) {
          const overlay = new Image();
          overlay.src = selectedImage;
          overlay.onload = () => {
            ctx.drawImage(
              overlay,
              positionImage.x,
              positionImage.y,
              overlayWidth,
              overlayHeight
            );
            drawText();
          };
        } else {
          drawText();
        }
      };

      const drawText = () => {
        if (text) {
          ctx.font = "32px Poppins";
          ctx.textAlign = "center";
          ctx.fillStyle = textColor;
          const lines = text.split("\n");
          const lineHeight = 48;
          lines.forEach((line, index) => {
            ctx.fillText(
              line,
              positionText.x + textWidth / 2,
              positionText.y + 40 + index * lineHeight
            );
          });
        }

        const link = document.createElement("a");
        link.download = "created-image.png";
        link.href = canvas.toDataURL();
        link.click();
      };

      if (selectedBackground) {
        const background = new Image();
        background.src = selectedBackground;
        background.onload = () => {
          ctx.drawImage(background, 0, 0, backgroundWidth, backgroundHeight);
          drawOverlayAndText();
        };
      } else {
        drawOverlayAndText();
      }
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='mainDiv font-poppins relative m-1 flex'>
        <div
          className='previewDiv bg-black50 flex h-[948px] w-[759px] items-center justify-center'
          onMouseMove={handleMouseMoveImg}
          onMouseUp={handleMouseUpImg}
          onMouseLeave={handleMouseUpImg}>
          {selectedBackground ? (
            <div className='relative h-full w-full'>
              <img
                src={selectedBackground}
                className='h-full w-full object-cover'
                alt='Selected background'
              />
            </div>
          ) : (
            <img src={prevDivImg} alt='Default image' />
          )}
          {textBoxVisibility ? (
            <div
              className='absolute group'
              style={{
                top: positionText.y,
                left: positionText.x,
              }}>
              <div
                className=' border-primary h-[120px] w-[350px] group-hover:border-2 object-contain py-[12px] px-[24px] text-center '
                onMouseMove={handleMouseMoveText}
                onMouseUp={handleMouseUpText}
                onMouseLeave={handleMouseUpText}>
                <textarea
                  onChange={(e) => setText(e.target.value)}
                  placeholder='Type your text here'
                  className='bg-transparent w-full h-full text-[32px] font-bold leading-[48px] text-center white-space-pre-wrap '
                  style={{
                    color: textColor,
                  }}
                />
                <div
                  className='absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 cursor-move '
                  onMouseDown={handleMouseDownText}>
                  <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white invisible group-hover:visible'>
                    <MoveIcon width={32} height={32} fillColor='#7209B7' />
                  </div>
                </div>
                <div
                  className='absolute right-0 top-0  cursor-pointer'
                  style={{
                    transform: "translate(50%, -50%)",
                  }}>
                  <div
                    className='flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white invisible group-hover:visible'
                    onClick={deleteText}>
                    <DeleteIcon width={18} height={18} fillColor='#CB0000' />
                  </div>
                </div>
                <div
                  className='absolute right-0 bottom-0  cursor-pointer'
                  style={{
                    transform: "translate(50%, -50%)",
                  }}>
                  <div className='w-[24px] h-[24px] bg-primary rounded-full border-4 invisible group-hover:visible'></div>
                </div>
              </div>
              <div className='h-[24px] w-[136px] flex flex-row mt-1 invisible group-hover:visible'>
                <SelectColor
                  color={"#353535"}
                  selectedColor={textColor}
                  onSelectColor={setTextColor}
                />
                <SelectColor
                  color={"#FFFFFF"}
                  selectedColor={textColor}
                  onSelectColor={setTextColor}
                />
                <SelectColor
                  color={"#CF0000"}
                  selectedColor={textColor}
                  onSelectColor={setTextColor}
                />
                <SelectColor
                  color={"#0055FF"}
                  selectedColor={textColor}
                  onSelectColor={setTextColor}
                />
                <SelectColor
                  color={"#00DA16"}
                  selectedColor={textColor}
                  onSelectColor={setTextColor}
                />
              </div>
            </div>
          ) : null}
          {selectedImage ? (
            <div
              className='cover-image  absolute group'
              style={{
                top: positionImage.y,
                left: positionImage.x,
                width: overlayWidth,
                height: overlayHeight,
              }}>
              <img
                src={selectedImage}
                className='border-primary absolute h-full w-full group-hover:border-2 object-contain'
                alt='Overlay image'
              />
              <div
                className='absolute -translate-x-1/2 -translate-y-1/2 cursor-move'
                onMouseDown={handleMouseDownImg}>
                <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white invisible group-hover:visible'>
                  <MoveIcon width={32} height={32} fillColor='#7209B7' />
                </div>
              </div>
              <div
                className='absolute right-0 top-0  cursor-pointer'
                style={{
                  transform: "translate(50%, -50%)",
                }}>
                <div
                  className='flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white invisible group-hover:visible'
                  onClick={deleteCoverImage}>
                  <DeleteIcon width={18} height={18} fillColor='#CB0000' />
                </div>
              </div>
              <div
                className='absolute right-0 bottom-0  cursor-pointer'
                style={{
                  transform: "translate(50%, 50%)",
                }}>
                <div className='w-[24px] h-[24px] bg-primary rounded-full border-4 invisible group-hover:visible'></div>
              </div>
            </div>
          ) : null}
        </div>
        <div className='editDiv ml-4 h-[948px] w-[759px]'>
          <div className='header flex h-[64px] w-full items-center justify-between'>
            <div className='title flex items-center'>
              <div className='logo mr-2'>
                <LogoIcon height={64} width={64} />
              </div>
              <div className='name text-black75 text-[32px] font-bold leading-[48px]'>
                CanvasEditor
              </div>
            </div>
            <div className='reset flex items-center border-b-2 border-[#CB0000]'>
              <button className='flex' onClick={setModal.bind(this, true)}>
                <div className='text mr-1 text-[18px] font-medium leading-[27px] text-[#CB0000]'>
                  Reset
                </div>
                <div className='img'>
                  <ResetIcon fillColor={"#CB0000"} />
                </div>
              </button>
            </div>
          </div>
          <div className='border-white98 mb-10 mt-10 border-t-2'></div>
          <div className='addContent bg-white97 h-[75px] rounded-lg px-[16px] py-[24px] '>
            <p className='text-black100 text-[18px] font-bold leading-[27px]'>
              Add content
            </p>
          </div>
          <div className='editButtons flex flex-wrap justify-between'>
            <ActionSquare text='Text' onClick={textMenagment}>
              <TextIcon width={128} height={128} fillColor='#676767' />
            </ActionSquare>
            <ActionSquare text='Image' onClick={handleImageClick}>
              <ImgIcon width={128} height={128} fillColor='#676767' />
            </ActionSquare>
            <ActionSquare text='Background' onClick={handleBackgroundClick}>
              <BackgroundIcon width={128} height={128} fillColor='#676767' />
            </ActionSquare>
          </div>
          <div className='border-white98 mb-10 mt-10 border-t-2'></div>
          <div className='export absolute bottom-0 right-0'>
            <button
              className='bg-primary hover:bg-primary100 focus:bg-primary disabled:bg-black25 rounded-lg px-[32px] py-[8px] text-[15px] font-semibold leading-[22.5px] tracking-[0.5px] text-white'
              onClick={saveAsImage}>
              Export to PNG
            </button>
          </div>
        </div>
        <input
          type='file'
          id='backgroundInput'
          className='hidden'
          accept='image/*'
          onChange={handleBackgroundChange}
        />
        <input
          type='file'
          id='imageInput'
          className='hidden'
          accept='image/*'
          onChange={handleImageChange}
        />
        <Modal trigger={modal} setTrigger={setModal} resetForm={resetForm} />
      </div>
    </div>
  );
};

export default MainPageComponent;
