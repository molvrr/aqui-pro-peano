import type { Eq, Test } from "./specHelper"

type Peano = 'zero' | { successor: Peano }
type Successor<N extends Peano> = { successor: N }
type Zero = 'zero'
type Predecessor<N extends Peano> = N extends Successor<infer A> ? A : Zero

type Sum<X extends Peano, Y extends Peano> =
  Y extends Zero
  ? X
  : (Y extends Successor<infer A> ? { successor: Sum<X, A> } : X)

type MultiplyHelper<X extends Peano, Y extends Peano, Acc extends Peano> =
  Y extends Successor<infer A>
  ? MultiplyHelper<X, A, Sum<X, Acc>>
  : Acc

type Multiply<X extends Peano, Y extends Peano> = MultiplyHelper<X, Y, Zero>

type One = Successor<Zero>
type Two = Sum<One, One>
type Three = Sum<Two, One>
type Four = Sum<Three, One>
type Five = Sum<Three, Two>
type Ten = Sum<Five, Five>
type Twenty = Sum<Ten, Ten>
type Fourty = Sum<Twenty, Twenty>
type Fifty = Sum<Fourty, Ten>
type FiftyFive = Sum<Fifty, Five>
type OneHundred = Sum<Fifty, Fifty>
type TwoHundred = Sum<OneHundred, OneHundred>

type Fibonacci<N extends Peano, A extends Peano, B extends Peano> = N extends Zero ? A : Fibonacci<Predecessor<N>, B, Sum<A, B>>

const peanoToInt = (n: Peano): number => n === 'zero' ? 0 : 1 + peanoToInt(n.successor)

export namespace Tests {
  export namespace Fibonacci {
    export type TestFibTen = Test<Eq<Fibonacci<Ten, Zero, One>, FiftyFive>>
    export type TestFibTwo = Test<Eq<Fibonacci<Two, Zero, One>, One>>
    export type TestFibThree = Test<Eq<Fibonacci<Three, Zero, One>, Two>>
    export type TestFibFour = Test<Eq<Fibonacci<Four, Zero, One>, Three>>
  }

  export namespace Multiply {
    export type MultiplyOneOne = Multiply<One, One>
    export type TestMultiplyOneOne = Test<Eq<MultiplyOneOne, One>>

    export type MultiplyTwoOne = Multiply<Two, One>
    export type TestMultiplyTwoOne = Test<Eq<MultiplyTwoOne, Two>>

    export type MultiplyTwoTwo = Multiply<Two, Two>
    export type TestMultiplyTwoTwo = Test<Eq<MultiplyTwoTwo, Four>>

    export type MultiplyTwoTen = Multiply<Two, Ten>
    export type TestMultiplyTwoTen = Test<Eq<MultiplyTwoTen, Twenty>>

    export type MultiplyTwoTwenty = Multiply<Two, Twenty>
    export type TestMultiplyTwoTwenty = Test<Eq<MultiplyTwoTwenty, Fourty>>

    export type MultiplyTwentyTwenty = Multiply<Twenty, Twenty>
    export type TestMultiplyTwentyTwenty = Test<Eq<MultiplyTwentyTwenty, Sum<TwoHundred, One>>> // NOTE: Esse teste não deveria passar.
  }
}
