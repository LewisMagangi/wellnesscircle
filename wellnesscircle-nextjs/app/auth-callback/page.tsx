import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client"

interface AuthCallbackResult {
  success: boolean;
}

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    const { data, isLoading } = trpc.authCallback.useQuery(undefined, {
        onSuccess: (result) => {
            if ('success' in result && result.success) {
                // user is synced to database
                router.push(origin ? `/${origin}` : '/dashboard')
            }
        },
        retry: true,
        retryDelay: 500,
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (data?.success) {
        return <div>Success! Redirecting...</div>
    }

    return <div>Something went wrong. Please try again.</div>
}

export default Page