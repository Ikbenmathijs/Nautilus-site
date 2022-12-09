import LoginButton from "../../components/loginButton";



export default function Home() {


    return (<>
    <div className="">
        <div className="bg-fixed bg-cover bg-[url('https://cdn.mos.cms.futurecdn.net/v6XoEzDajGRMWNeLY5NMSb-1920-80.jpg.webp')]">
            <div className='grid static place-content-center h-screen w-screen backdrop-blur-md'>
                <div className='static bg-white border rounded-lg p-5'>
                    <div className="mb-5">
                        <div className='text-2xl text-slate-700 text-center'>Login</div>
                        <div className='text-lg text-slate-500'>login met google om de Server te joinen</div>
                    </div>
                    <div className="grid static place-content-center"><LoginButton /></div>
                </div>
            </div>
        </div>
    </div>
    </>)
}