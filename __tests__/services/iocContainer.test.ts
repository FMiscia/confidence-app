import IOCContainer from "../../services/iocContainer"

interface IOCServices extends IOCContainer {
    testService: (p: string) => string
}

let container: IOCServices | undefined
beforeEach(() => {
    container = new IOCContainer() as IOCServices
    container?.put("testService", () => (string: string) => string)
})

afterEach(() => {
   container = undefined
})


it("IOCContainer should provide the services previously bound", async () => {
    const testService = container?.get("testService")
    expect(testService("sample")).toBe("sample")
})

it("IOCContainer should provide the services as proxy", async () => {
    const testService = container?.testService
    expect(testService?.("sample")).toBe("sample")
})