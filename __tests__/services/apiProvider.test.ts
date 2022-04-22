import apiProvider, { AppAPIs } from "../../services/apiProvider"
import { Appi18n } from "../../services/i18nProvider"
import IOCContainer from "../../services/iocContainer"
import { AppRest } from "../../services/restProvider"

interface IOCServices extends IOCContainer {
    rest: AppRest
    i18n: Appi18n
    api: AppAPIs
}
let container: IOCServices | undefined
let apis: AppAPIs

beforeEach(() => {
    container = new IOCContainer() as IOCServices
    apis = apiProvider(container!)
})

afterEach(() => {
   container = undefined
})


it("API provider should contains the app APIs", async () => {
    expect(apis.fetchLocationsAPI).toBeTruthy()
})