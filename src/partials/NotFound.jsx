import notFound from '../../public/404.gif'
const NotFound = () => {
  return (
    <div className='h-screen flex items-center justify-center w-screen bg-[#020203]'>
        <img src={notFound} />
    </div>
  )
}

export default NotFound