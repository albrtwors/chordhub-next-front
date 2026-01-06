import Link from "next/link";
import { route } from "../../../../constants/defaultPath";

export default function SongCard({name, type='show', author, id}: any){
    let link: any
    switch(type){
        case 'show': 
            link = `${route}chordhub/songs/${id}`
            break;
        case 'edit':
            link = `${route}chordhub/songs/${id}/edit`
            break;           
            
    }

    return <Link href={link}>
            <div className="px-6 py-3 flex flex-col items-center justify-center bg-gray-100 rounded-sm">
                <div className="w-40 h-40 bg-sky-400 rounded-lg"></div>

                <h3 className="text-lg">{name}</h3>
                <p>{author}</p>

            </div>
    </Link>
}