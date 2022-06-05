interface MangaCardProps {
    manga: Manga
}


const MangaCard = ({manga}: MangaCardProps) => {
    return (
        <div className="w-full h-64 bg-zinc-600 rounded-md shadow-sm bg-center bg-cover"
             style={{backgroundImage: "url('"+manga.poster+"')"}}>
            <div className="h-full w-full bg-gradient-to-t from-zinc-800 to-transparent rounded-b-md mt-1 transition hover:bg-zinc-900/20
                    flex flex-col justify-end items-start cursor-default">
                <span className="text-xl text-gray-300 ml-2">{manga.title}</span>
                <span className="text-md text-gray-400 ml-2 mb-3">Ch. {manga.chapter}</span>
            </div>
        </div>
    )
}

export default MangaCard