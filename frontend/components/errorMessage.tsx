export default function ErrorMessage ({title, desc, hidden, setHiddenCallback}: {title: string; desc: string, hidden:boolean | undefined, setHiddenCallback: Function}) {

    return (<>
        <div hidden={hidden}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4">
                <div className="relative w-full h-full">
                    <div className="relative bg-white rounded-lg shadow-2xl shadow-slate-700 backdrop-grayscale">
                        <div className="p-6 text-center">
                            <div className="text-rose-600 font-medium text-xl">{title}</div>
                            <div className="mb-5 text-lg font-normal text-gray-500">{desc}</div>
                            <button className="text-white bg-rose-500 hover:bg-rose-700 hover:shadow-inner font-medium rounded-lg text-sm items-center px-5 py-2.5 text-center mr-2" onClick={()=>{setHiddenCallback(true)}}>Oké.</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}