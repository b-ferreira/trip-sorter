const action = require("./action")
// @ponicode
describe("action.resetOptimization", () => {
    test("0", () => {
        let callFunction = () => {
            action.resetOptimization()
        }
    
        expect(callFunction).not.toThrow()
    })
})
