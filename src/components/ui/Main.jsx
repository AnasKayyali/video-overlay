import { useState } from 'react'
import Parameters from './parameters'
import UploadArea from './UploadArea'
import { Spin, notification } from 'antd'
import Validation from '../Validation'
import TextInput from './TextInput'
import ModifiedVideo from './modifiedVideo'
import Loader from './Loader'
import SendButton from './SendButton'

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
            <TextInput text={text} setText={setText} />
            <Parameters
              x={x} y={y} t={time} d={duration} s={fontSize}
              handleX={setX} handleY={setY}  
              handleT={setTime} handleD={setDuration}
              handleS={setFontSize}
              notify={notify}
            />
            <SendButton handleSend={handleSend} />
          </>
          :
          loader === true ? 
            <Loader />
            :
            <ModifiedVideo videoFile={videoFile} handleReset={handleReset} />
      } 
    </main>
  )
}

export default Main
