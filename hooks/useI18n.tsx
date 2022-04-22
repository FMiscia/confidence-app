import { useContainer } from "../services"

const useI18n = (lan='en') => {
    const container = useContainer()
    const strings = container.i18n

    return strings(lan)
}

export default useI18n