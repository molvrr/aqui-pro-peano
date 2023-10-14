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

type Eq<X, Y> = X extends Y ? true : false

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
  X extends Cons<infer A, infer _B>
  ? Y extends Cons<infer C, infer _D>
    ? FullAdder<A, C, CIN>
    : null
  : null // TODO: Achar um valor melhor que null

type testFullAddDigitE = FullAddDigit<Head<0>, Head<0>, 0>
type testFullAddDigitF = FullAddDigit<Head<0>, Head<0>, 1>
type testFullAddDigitG = FullAddDigit<Head<0>, Head<1>, 0>
type testFullAddDigitH = FullAddDigit<Head<0>, Head<1>, 1>
type testFullAddDigitI = FullAddDigit<Head<1>, Head<0>, 0>
type testFullAddDigitJ = FullAddDigit<Head<1>, Head<0>, 1>
type testFullAddDigitK = FullAddDigit<Head<1>, Head<1>, 0>
type testFullAddDigitL = FullAddDigit<Head<1>, Head<1>, 1>

type Problem<X extends PeanoBinary, Y extends PeanoBinary, CIN extends Binary> =
 FullAddDigit<X, Y, CIN> 
