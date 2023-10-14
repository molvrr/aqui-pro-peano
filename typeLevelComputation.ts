type Peano = 'zero' | { successor: Peano }
type Successor<N extends Peano> = { successor: N }
type Zero = 'zero'
type Predecessor<N extends Peano> = N extends Successor<infer A> ? A : Zero

type One = Successor<Zero>

type SumPeano<X extends Peano, Y extends Peano> = Y extends Zero ? X : (Y extends Successor<infer A> ? { successor: SumPeano<X, A> } : X)
// type Multiply<X extends Peano, Y extends Peano> = Y extends Successor<infer A> ? Sum<X, Multiply<X, A>> : Zero

type Two = SumPeano<One, One>
type Three = SumPeano<Two, One>
type Five = SumPeano<Three, Two>
type Ten = SumPeano<Five, Five>
type Twenty = SumPeano<Ten, Ten>
type Fourty = SumPeano<Twenty, Twenty>
type Fifty = SumPeano<Fourty, Ten>
type FiftyFive = SumPeano<Fifty, Five>

type Fibonacci<N extends Peano, A extends Peano, B extends Peano> = N extends Zero ? A : Fibonacci<Predecessor<N>, B, SumPeano<A, B>>

type FibonacciTwo = Fibonacci<Two, Zero, One>
type FibonacciTen = Fibonacci<Ten, Zero, One>

const peanoToInt = (n: Peano): number => n === 'zero' ? 0 : 1 + peanoToInt(n.successor)
const intToPeano = (n: number) => n === 0 ? 'zero' : { successor: intToPeano(n - 1) }

type Result = Eq<FibonacciTen, FiftyFive>
