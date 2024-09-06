import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { console } from "inspector";
import { redirect } from "next/dist/server/api-utils";

const Page = () => {
    const {getUser} = getKindeServerSession()
    const user = getUser()

    if(!user || !user.id) redirect('/auth-callback?origin=dashboard')

    return <div>{user.email}</div>
}

export default Page