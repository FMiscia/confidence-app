import { IOCServices } from "."

type RestOptionsType = {
    baseURL?: string
    defaultConfig?: RequestInit
}

export type AppRest = ReturnType<typeof restProvider>

const restProvider = (container: IOCServices) => {
    const restInstance = rest({
        baseURL: process.env.BASE_URL || "api",
    })
    return restInstance
}

const rest = (options: RestOptionsType) => {
    let defaultConfig: RequestInit = {}

    const setDefaults = (config: RequestInit) => {
        defaultConfig = {
            ...defaultConfig,
            ...config,
        }
    }

    const fetchWrapper = async (info: RequestInfo, init?: RequestInit) => {
        if (typeof info === "string") {
            const result = await fetch(`${options.baseURL}/${info}`, {
                ...defaultConfig,
                ...init,
            })
            return result
        }
        const result = await fetch(`${options.baseURL}/${info}`, {
            ...defaultConfig,
            ...init,
        })
        return await result.json()
    }

    return {
        fetch: fetchWrapper,
        setDefaults,
    }
}

export default restProvider
