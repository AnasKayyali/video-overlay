import { useState } from 'react'
import Parameters from './parameters'
import UploadArea from './UploadArea'
import { Spin, notification } from 'antd'
import Validation from '../Validation'

const Main = () => {

  const [videoFile, setVideoFile] = useState({})
  const [text, setText] = useState("video overlay")
  const [x, setX] = useState("")
  const [y, setY] = useState("")
  const [time, setTime] = useState("")
  const [duration, setDuration] = useState("")
  const [fontSize, setFontSize] = useState("")
  const [uploaded, setUploaded] = useState(false)
  const [startProcess, setStartProcess] = useState(false)
  const [loader, setLoader] = useState(false)

  const [api, contextHolder] = notification.useNotification();
  const notify = (type,message,description) => {
    api[type]({
      message,
      description
    })
  }

  const handleSend = () => {
    Validation(
      uploaded,text,x,y,time,duration,fontSize,
      notify,setStartProcess,setLoader,videoFile,setVideoFile
    )
  } 

  const handleReset = () => {
    setStartProcess(false)
    setText("video overlay")
    setUploaded(false)
    setVideoFile({})
    setX("")
    setY("")
    setTime("")
    setDuration("")
    setFontSize("")
  }

  return (
    <main className={`${startProcess === true ? loader === true ? "mt-48" : "mt-20" : "mt-10"} mb-12 grid justify-items-center gap-y-6`}>
      {contextHolder}
      {
        startProcess === false ? 
          <>
            <UploadArea uploaded={uploaded} setUploaded={setUploaded} setVideoFile={setVideoFile} notify={notify} />
            <div className="flex items-center gap-2 xs:w-[70%] md:w-[45%] lg:w-[35%] xl:w-[27%]">
              <h1 className="xs:text-lg">text</h1>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="border xs:py-1 lg:py-[0.4rem] px-3 shadow-sm rounded-md w-full xs:text-[1.1rem] lg:text-[1.2rem]" />
            </div>
            <Parameters
              x={x} y={y} t={time} d={duration} s={fontSize}
              handleX={setX} handleY={setY}  
              handleT={setTime} handleD={setDuration}
              handleS={setFontSize}
              notify={notify}
            />
            <button 
              className="xs:p-1 xs:w-[30%] md:w-[20%] lg:w-[15%] xl:w-[12%] bg-[#01B0F1] text-white text-lg border border-transparent shadow-md rounded-md mt-2"
              onClick={handleSend}  
            >
              Send
            </button>
          </>
          :
          loader === true ? 
            <>
              <Spin size='large' />
              <h1>This will take some time...</h1>
            </>
          :
          <>
            <video src={videoFile} controls className="xs:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%]"></video>
            <button onClick={handleReset} className="bg-[#01B0F1] xs:px-3 py-[0.35rem] text-[1.12rem] text-white border border-transparent shadow-sm rounded-md">Upload another video</button>
          </>
      }
      
    </main>
  )
}

export default Main
