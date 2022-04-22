export interface IOCObject<P> {
    [field: string]: P
}

export class IOCContainer {
    private __services: IOCObject<any>
    private __instances: IOCObject<any>
    private __strategies: IOCObject<any>
    private __keys: Array<string>
    private __proxy: any

    constructor() {
        this.__services = {}
        this.__instances = {}
        this.__strategies = {}
        this.__keys = []
        this.__proxy = new Proxy(this, {
            get(object, property: string, receiver): any {
                if (object.__keys.includes(property)) {
                    return object.get(property)
                }
                return Reflect.get(object, property, receiver)
            },
        })

        return this.__proxy
    }

    put = (
        id: string,
        service: IOCObject<any>,
        strategy = 'STRATEGY_CACHED',
    ) => {
        if (!this.__keys.includes(id)) {
            this.__keys.push(id)
        }

        if (!!this.__services[id]) {
            console.warn(`Service ${id} already exist`)
            return
        }

        this.__services[id] = service
        this.__instances[id] = null
        this.__strategies[id] = strategy
    }

    get = (id: string) => {
        let instance = this.__instances[id]
        const service = this.__services[id]
        const strategy = this.__strategies[id]
        if (!service) {
            console.warn(`Service ${id} does not exist`)
            return
        }

        if (strategy === 'STRATEGY_NEW') {
            return service(this.__proxy)
        }

        if (!instance) {
            instance = service(this.__proxy)
            this.__instances[id] = instance
        }

        return this.__instances[id]
    }
}

export default IOCContainer
