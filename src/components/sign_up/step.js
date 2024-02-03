

export default function Step({num, title}) {
    return(
        <div className="flex flex-col items-center space-y-2">
            <div className="rounded-full text-lg font-bold w-12 h-12 bg-elements flex justify-center items-center">
                {num}
            </div>
            <div className="text-sm">
                {title}
            </div>
        </div>
    )
}