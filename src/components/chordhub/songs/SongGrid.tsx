export default function SongGrid({children}:any){
    return <div className="grid grid-cols-2 gap-5 lg:grid-cols-6 md:grid-cols-6 ">
        {children&&children}
    </div>
}