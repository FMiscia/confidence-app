import { AppAPIs } from "../../services/apiProvider"
import { Appi18n } from "../../services/i18nProvider"
import IOCContainer from "../../services/iocContainer"
import restProvider, { AppRest } from "../../services/restProvider"

interface IOCServices extends IOCContainer {
    rest: AppRest
    i18n: Appi18n
    api: AppAPIs
}
let container: IOCServices | undefined
let rest: AppRest

beforeEach(() => {
    container = new IOCContainer() as IOCServices
    rest = restProvider(container!)
})

afterEach(() => {
   container = undefined
})


it("Rest provider should return function", () => {
    expect(typeof rest).toBe("function")
})