// basic types
let id: number = 5
let company: string = "Chad Media"
let isPublished: boolean = true
let x : any = "Hello"

let ids: number[] = [1, 2, 3, 4, 5]

let arr: any[] = [1, true, "Hello"]

// Tuple
let person: [number, string, boolean] = [1, "brad", true]

// tuple array
let employee: [number, string][]

employee = [
    [1, "Brad"],
    [2, "Chad"],
    [3, "Jill"],
]

// union
let pid: string | number = 22

pid = "22"

// enum
enum Direction1 {
    Up, //0
    Down, //1
    Left, //2
    Right, // 3
}

enum Direction2 {
    Up = "up",
    Down = "down",
    Left = "left",
    Right = "right"
}

// objects

type User = {
    id: number,
    name: string
}

const user: User = {
    id: 1,
    name: "John"

    }
 


    // type assertion

    let cid: any = 1
    // let customerId = <number>cid

    let customerId = cid as number
    

    // functions

    function addNum(x: number, y: number): number {
        return x + y
    }

   function log(message: string | number): void {
       console.log(message)
   }


   // interfaces
   interface UserInterface  {
    readonly id: number,
    name: string,
    age?: number
}

const user1: UserInterface = {
    id: 1,
    name: "John"

    }
 
interface MathFunc {
    (x: number, y: number): number
}

const add: MathFunc = (x: number, y: number): number => x + y

// classes
class Person {
    id: number
    name: string

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name
    }
}

const chad = new Person(1, "Chad")