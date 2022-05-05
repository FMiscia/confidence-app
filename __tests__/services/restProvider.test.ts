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

it("Rest provider should return an object", () => {
    expect(typeof rest).toBe("object")
    expect(typeof rest.fetch).toBe("function")
    expect(typeof rest.setDefaults).toBe("function")
})
