type Peano = 'zero' | { successor: Peano }
type Successor<N extends Peano> = { successor: N }
type Zero = 'zero'
type Predecessor<N extends Peano> = N extends Successor<infer A> ? A : Zero

type SumPeano<X extends Peano, Y extends Peano> = Y extends Zero ? X : (Y extends Successor<infer A> ? { successor: SumPeano<X, A> } : X)
// type Multiply<X extends Peano, Y extends Peano> = Y extends Successor<infer A> ? Sum<X, Multiply<X, A>> : Zero

type One = Successor<Zero>
type Two = SumPeano<One, One>
type Three = SumPeano<Two, One>
type Four = SumPeano<Three, One>
type Five = SumPeano<Three, Two>
type Ten = SumPeano<Five, Five>
type Twenty = SumPeano<Ten, Ten>
type Fourty = SumPeano<Twenty, Twenty>
type Fifty = SumPeano<Fourty, Ten>
type FiftyFive = SumPeano<Fifty, Five>

type Fibonacci<N extends Peano, A extends Peano, B extends Peano> = N extends Zero ? A : Fibonacci<Predecessor<N>, B, SumPeano<A, B>>

const peanoToInt = (n: Peano): number => n === 'zero' ? 0 : 1 + peanoToInt(n.successor)
const intToPeano = (n: number) => n === 0 ? 'zero' : { successor: intToPeano(n - 1) }

type TestFibTen = Eq<Fibonacci<Ten, Zero, One>, FiftyFive>
const testFibTen: TestFibTen = true

type TestFibTwo = Eq<Fibonacci<Two, Zero, One>, One>
const testFibTwo: TestFibTwo = true

type TestFibThree = Eq<Fibonacci<Three, Zero, One>, Two>
const testFibThree: TestFibThree = true

type TestFibFour = Eq<Fibonacci<Four, Zero, One>, Three>
const testFibFour: TestFibFour = true
