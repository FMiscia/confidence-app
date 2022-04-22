import { IOCServices } from "."

type RestOptionsType = {
    baseURL?: string
}

export type AppRest = ReturnType<typeof restProvider>

const restProvider = (container: IOCServices) => {
    const restInstance = rest({
        baseURL: process.env.BASE_URL || "api",
    })
    return restInstance
}

const rest = (options: RestOptionsType) => {
    return async (info: RequestInfo, init?: RequestInit) => {
        if (typeof info === "string") {
            const result = await fetch(`${options.baseURL}/${info}`, init)
            return result
        }
        const result = await fetch(`${options.baseURL}/${info}`, init)
        return await result.json()
    }
}

export default restProvider
