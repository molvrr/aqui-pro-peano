type Peano = 'zero' | { successor: Peano }
type Successor<N extends Peano> = { successor: N }
type Zero = 'zero'
type Predecessor<N extends Peano> = N extends Successor<infer A> ? A : Zero

type One = Successor<Zero>

type Sum<X extends Peano, Y extends Peano> = Y extends Zero ? X : (Y extends Successor<infer A> ? { successor: Sum<X, A> } : X)
// type Multiply<X extends Peano, Y extends Peano> = Y extends Successor<infer A> ? Sum<X, Multiply<X, A>> : Zero

type Two = Sum<One, One>
type Three = Sum<Two, One>
type Five = Sum<Three, Two>
type Ten = Sum<Five, Five>
type Twenty = Sum<Ten, Ten>
type Fourty = Sum<Twenty, Twenty>
type Fifty = Sum<Fourty, Ten>
type FiftyFive = Sum<Fifty, Five>

type Fibonacci<N extends Peano, A extends Peano, B extends Peano> = N extends Zero ? A : Fibonacci<Predecessor<N>, B, Sum<A, B>>

type FibonacciTwo = Fibonacci<Two, Zero, One>
type FibonacciTen = Fibonacci<Ten, Zero, One>

const peanoToInt = (n: Peano): number => n === 'zero' ? 0 : 1 + peanoToInt(n.successor)
const intToPeano = (n: number) => n === 0 ? 'zero' : { successor: intToPeano(n - 1) }

type Eq<X, Y> = X extends Y ? true : false

type Result = Eq<FibonacciTen, FiftyFive>
