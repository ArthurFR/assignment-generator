import { auth } from "auth"
import Image from "next/image"

const MainNav = async () => {
    const session = await auth()
    return (
        <>
            {session?.user?.image && (
                    <nav className="w-full bg-zinc-800 flex justify-end items-center px-6 py-3">
                        <span className="mr-4">{session.user.name}</span>
                        <Image src={session.user.image} alt="User avatar" width={32} height={32} className="rounded-full"/>
                    </nav>
                )
            }
        </>
    )
}

export default MainNav