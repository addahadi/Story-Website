
const Loader = ({children} : {children : React.ReactNode}) => {
  return (
    <div className="  z-50 w-screen h-screen absolute top-0 left-0 flex items-center justify-center bg-black-1/40">
        {children}
    </div>
  )
}

export default Loader