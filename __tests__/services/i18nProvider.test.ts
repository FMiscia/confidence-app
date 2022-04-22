import { AppAPIs } from "../../services/apiProvider"
import i18nProvider, { Appi18n } from "../../services/i18nProvider"
import IOCContainer from "../../services/iocContainer"
import { AppRest } from "../../services/restProvider"

interface IOCServices extends IOCContainer {
    rest: AppRest
    i18n: Appi18n
    api: AppAPIs
}
let container: IOCServices | undefined
let i18n: Appi18n

beforeEach(() => {
    container = new IOCContainer() as IOCServices
    i18n = i18nProvider()
})

afterEach(() => {
   container = undefined
})


it("i18n provider should return an internationalized string", () => {
    expect(i18n('en').address).toBe('Address')
    expect(i18n("it").address).toBe("Indirizzo")
})