import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length , setlength] = useState(8)
  const [num , setNum] = useState(false)
  const [ch , setChar] = useState(false)
  const [pass , setPass] = useState("")
  const passRef = useRef(null)
  const copyPass = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(pass)
  },[pass])
  const passGenerator = useCallback(() => {
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(num)
    str = str + "0123456789"

    if(ch)
    str = str + "!@$&#*^"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass = pass + str.charAt(char)
    }
    setPass(pass)
  }, [length , num , ch , setPass])
  useEffect( () => {passGenerator()}
  ,[length , num , ch , setPass])
  return (
    <>
    <div className='w-2/4 h-60 mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 text-3xl bg-gray-900'>
        <h1 className="texth-white text-center my-9">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-5 "> 
          <input type="text" placeholder="Password" value={pass} readOnly className="outline-none w-full py-1 px-3" ref={passRef}/>
          <button className="bg-blue-800 text-white px-3 py-0.5 shrink-0 outline-none hover:bg-sky-700" onClick={copyPass}>
            Copy</button>
        </div>
        <div className="flex text-2xl gap-x-10 fixed">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={15} value={length} className="cursor-pointer" onChange={(e) => {
              setlength(e.target.value)
            }}/>
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
              <input type="checkbox" id="n" defaultChecked={num} onChange={() => {
                setNum((prev) => !prev)
              }}/>
              <label for="n">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
              <input type="checkbox" id="c" defaultChecked={num} onChange={() => {
                setChar((prev) => !prev)
              }}/>
              <label for="c">Characters</label>
          </div>
        </div>
    </div>
    </>
  )
}

export default App
