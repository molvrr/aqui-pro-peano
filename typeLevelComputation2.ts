type Binary = 0 | 1
type PeanoBinary = { binary: Binary, next_digit: PeanoBinary } | null
type Head<X extends Binary> = { binary: X, next_digit: null }
type Cons<X extends Binary, Y extends PeanoBinary> = { binary: X, next_digit: Y }

type Or<X extends Binary, Y extends Binary> = X extends 0 ? Y extends 0 ? 0 : 1 : 1
type And<X extends Binary, Y extends Binary> = X extends 1 ? Y extends 1 ? 1 : 0 : 0
type Not<X extends Binary> = X extends 0 ? 1 : 0
type Nand<X extends Binary, Y extends Binary> = Not<And<X, Y>>
type Xor<X extends Binary, Y extends Binary> = Not<Or<And<X, Y>, And<Not<X>, Not<Y>>>>

type HalfAdder<X extends Binary, Y extends Binary> = { binary: Xor<X, Y>, next_digit: { binary: And<X, Y>, next_digit: null } }
type FullAdder<X extends Binary, Y extends Binary, CIN extends Binary> =
  Cons<Xor<Xor<X, Y>, CIN>, Head<Or<And<X, Y>, And<CIN, Xor<X, Y>>>>>

// HalfAdder

type testHalfAdderA = Eq<HalfAdder<0, 0>, Cons<0, Head<0>>>
const testHalfAdderA: testHalfAdderA = true

type testHalfAdderB = Eq<HalfAdder<0, 1>, Cons<1, Head<0>>>
const testHalfAdderB: testHalfAdderB = true

type testHalfAdderC = Eq<HalfAdder<1, 0>, Cons<1, Head<0>>>
const testHalfAdderC: testHalfAdderC = true

type testHalfAdderD = Eq<HalfAdder<1, 1>, Cons<0, Head<1>>>
const testHalfAdderD: testHalfAdderD = true

// FullAdder

type testFullAdderE = Eq<FullAdder<0, 0, 0>, Cons<0, Head<0>>>
const testFullAdderE: testFullAdderE = true

type testFullAdderF = Eq<FullAdder<0, 0, 1>, Cons<1, Head<0>>>
const testFullAdderF: testFullAdderF = true

type testFullAdderG = Eq<FullAdder<0, 1, 0>, Cons<1, Head<0>>>
const testFullAdderG: testFullAdderG = true

type testFullAdderH = Eq<FullAdder<0, 1, 1>, Cons<0, Head<1>>>
const testFullAdderH: testFullAdderH = true

type testFullAdderI = Eq<FullAdder<1, 0, 0>, Cons<1, Head<0>>>
const testFullAdderI: testFullAdderI = true

type testFullAdderJ = Eq<FullAdder<1, 0, 1>, Cons<0, Head<1>>>
const testFullAdderJ: testFullAdderJ = true

type testFullAdderK = Eq<FullAdder<1, 1, 0>, Cons<0, Head<1>>>
const testFullAdderK: testFullAdderK = true

type testFullAdderL = Eq<FullAdder<1, 1, 1>, Cons<1, Head<1>>>
const testFullAdderL: testFullAdderL = true

type BinaryUmdaHika = Head<0>
type BinaryDoisdaHika = Head<0>

// Se o next_digit do X for null, X = Head -> X.next_digit = Y
// Se não for, o next_digit é um PeanoBinary chamado X1. ConsMerge<X1, Y>
//
// ConsMerge<Cons<1, Head<0>>, Cons<1, Head<0>>>
// ConsMerge<Head<0>, Cons<1, Cons<1, Head<0>>>>
// Cons<0, Cons<1, Cons<1, Head<0>>>>

type ConsMerge<X extends PeanoBinary, Y extends PeanoBinary> =
  X extends Cons<infer XBin, infer XNext>
  ? XNext extends null
  ? Y extends Cons<infer YBin, infer YNext> ? Cons<YBin, Cons<XBin, YNext>> : null
  : Y extends Cons<infer _YBin, infer _YNext> ? ConsMerge<XNext, Cons<XBin, Y>> : null
  : null

type Merge = ConsMerge<Cons<1, Head<0>>, Cons<1, Head<0>>>
type testConsMerge = Eq<Merge, Cons<1, Cons<0, Cons<1, Head<0>>>>>
const testConsMerge: testConsMerge = true

type FullAddDigit<X extends PeanoBinary, Y extends PeanoBinary, CIN extends Binary> =
  X extends Cons<infer XBin, infer _XNext>
  ? Y extends Cons<infer YBin, infer _YNext>
  ? FullAdder<XBin, YBin, CIN>
  : null
  : null // TODO: Achar um valor melhor que null

type testFullAddDigitE = Eq<FullAddDigit<Head<0>, Head<0>, 0>, Cons<0, Head<0>>>
const testFullAddDigitE: testFullAddDigitE = true

type testFullAddDigitF = Eq<FullAddDigit<Head<0>, Head<0>, 1>, Cons<1, Head<0>>>
const testFullAddDigitF: testFullAddDigitF = true

type testFullAddDigitG = Eq<FullAddDigit<Head<0>, Head<1>, 0>, Cons<1, Head<0>>>
const testFullAddDigitG: testFullAddDigitG = true

type testFullAddDigitH = Eq<FullAddDigit<Head<0>, Head<1>, 1>, Cons<0, Head<1>>>
const testFullAddDigitH: testFullAddDigitH = true

type testFullAddDigitI = Eq<FullAddDigit<Head<1>, Head<0>, 0>, Cons<1, Head<0>>>
const testFullAddDigitI: testFullAddDigitI = true

type testFullAddDigitJ = Eq<FullAddDigit<Head<1>, Head<0>, 1>, Cons<0, Head<1>>>
const testFullAddDigitJ: testFullAddDigitJ = true

type testFullAddDigitK = Eq<FullAddDigit<Head<1>, Head<1>, 0>, Cons<0, Head<1>>>
const testFullAddDigitK: testFullAddDigitK = true

type testFullAddDigitL = Eq<FullAddDigit<Head<1>, Head<1>, 1>, Cons<1, Head<1>>>
const testFullAddDigitL: testFullAddDigitL = true

// Sum<Cons<1, Head<0>>, Cons<1, Head<0>>, 0>
// FullAddDigit<X, Y, CIN>
// Cons<0, Head<1>>

type Bin<X extends PeanoBinary> = X extends Cons<infer XBin, infer _XNext> ? XBin : null
type testBin = Eq<Bin<Cons<1, Head<1>>>, 1>
const testBin: testBin = true
type testBin2 = Eq<Bin<Head<1>>, 1>
const testBin2: testBin2 = true
type testBin3 = Eq<Bin<null>, null>
const testBin3: testBin3 = true

type Next<X extends PeanoBinary> = X extends Cons<infer _XBin, infer XNext> ? XNext : Head<0>
type testNext = Eq<Next<Cons<1, Head<1>>>, Head<1>>
const testNext: testNext = true

type SumInner<X extends PeanoBinary, Y extends PeanoBinary, CIN extends Binary> =
  FullAddDigit<X, Y, CIN> extends Cons<infer ConsSum, infer ConsNext>
  ? ConsNext extends Cons<infer COut, infer _X>
    ? Cons<ConsSum, SumInner<Next<X>, Next<Y>, COut>>
    : null
  : CIN extends 1 ? Cons<0, Head<CIN>> : null

type Sum<X extends PeanoBinary, Y extends PeanoBinary> = SumInner<X, Y, 0>

type Sum1 = Sum<Head<0>, Head<0>>
type testSum1 = Eq<Sum1, Head<0>>
const testSum1: testSum1 = true

type Sum2 = Sum<Head<0>, Head<1>>
type testSum2 = Eq<Sum2, Head<1>>
const testSum2: testSum2 = true

type Sum3 = Sum<Head<1>, Head<1>>
type testSum3 = Eq<Sum3, Cons<0, Cons<0, Head<1>>>>
const testSum3: testSum3 = true
