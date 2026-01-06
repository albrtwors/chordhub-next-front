import Link from "next/link";
import { routeClient } from "../../../../constants/defaultPathClient";

export default function FileCard({name, type='show', id}: any){
    let link: any
    switch(type){
        case 'show': 
            link = `${routeClient()}/chordhub/files/${id}`
            break;
        case 'edit':
            link = `${routeClient()}/chordhub/files/${id}/edit`
            break;           
            
    }

    return <Link href={link}>
            <div className="px-6 py-3 flex flex-col items-center justify-center bg-gray-100 rounded-sm">
                <div className="w-40 h-40 bg-sky-400 rounded-lg"></div>

                <h3 className="text-lg">{name}</h3>

            </div>
    </Link>
}