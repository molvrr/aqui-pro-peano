import type { Eq, Test } from './specHelper'

type Binary = 0 | 1
type PeanoBinary = { binary: Binary, next_digit: PeanoBinary } | null
type Head<X extends Binary> = { binary: X, next_digit: null }
type Cons<X extends Binary, Y extends PeanoBinary> = { binary: X, next_digit: Y }

type Or<X extends Binary, Y extends Binary> = X extends 0 ? Y extends 0 ? 0 : 1 : 1
type And<X extends Binary, Y extends Binary> = X extends 1 ? Y extends 1 ? 1 : 0 : 0
type Not<X extends Binary> = X extends 0 ? 1 : 0
type Nand<X extends Binary, Y extends Binary> = Not<And<X, Y>>
type Xor<X extends Binary, Y extends Binary> = Not<Or<And<X, Y>, And<Not<X>, Not<Y>>>>

// HalfAdder
type HalfAdder<X extends Binary, Y extends Binary> = { binary: Xor<X, Y>, next_digit: { binary: And<X, Y>, next_digit: null } }

export type TestHalfAdderA = Test<Eq<HalfAdder<0, 0>, Cons<0, Head<0>>>>
export type TestHalfAdderB = Test<Eq<HalfAdder<0, 1>, Cons<1, Head<0>>>>
export type TestHalfAdderC = Test<Eq<HalfAdder<1, 0>, Cons<1, Head<0>>>>
export type TestHalfAdderD = Test<Eq<HalfAdder<1, 1>, Cons<0, Head<1>>>>

// FullAdder
type FullAdder<X extends Binary, Y extends Binary, CIN extends Binary> =
  Cons<Xor<Xor<X, Y>, CIN>, Head<Or<And<X, Y>, And<CIN, Xor<X, Y>>>>>

export type TestFullAdderE = Test<Eq<FullAdder<0, 0, 0>, Cons<0, Head<0>>>>
export type TestFullAdderF = Test<Eq<FullAdder<0, 0, 1>, Cons<1, Head<0>>>>
export type TestFullAdderG = Test<Eq<FullAdder<0, 1, 0>, Cons<1, Head<0>>>>
export type TestFullAdderH = Test<Eq<FullAdder<0, 1, 1>, Cons<0, Head<1>>>>
export type TestFullAdderI = Test<Eq<FullAdder<1, 0, 0>, Cons<1, Head<0>>>>
export type TestFullAdderJ = Test<Eq<FullAdder<1, 0, 1>, Cons<0, Head<1>>>>
export type TestFullAdderK = Test<Eq<FullAdder<1, 1, 0>, Cons<0, Head<1>>>>
export type TestFullAdderL = Test<Eq<FullAdder<1, 1, 1>, Cons<1, Head<1>>>>

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
export type TestConsMerge = Test<Eq<Merge, Cons<1, Cons<0, Cons<1, Head<0>>>>>>

type FullAddDigit<X extends PeanoBinary, Y extends PeanoBinary, CIN extends Binary> =
  X extends Cons<infer XBin, infer _XNext>
  ? Y extends Cons<infer YBin, infer _YNext>
  ? FullAdder<XBin, YBin, CIN>
  : null
  : null // TODO: Achar um valor melhor que null

export type TestFullAddDigitE = Test<Eq<FullAddDigit<Head<0>, Head<0>, 0>, Cons<0, Head<0>>>>
export type TestFullAddDigitF = Test<Eq<FullAddDigit<Head<0>, Head<0>, 1>, Cons<1, Head<0>>>>
export type TestFullAddDigitG = Test<Eq<FullAddDigit<Head<0>, Head<1>, 0>, Cons<1, Head<0>>>>
export type TestFullAddDigitH = Test<Eq<FullAddDigit<Head<0>, Head<1>, 1>, Cons<0, Head<1>>>>
export type TestFullAddDigitI = Test<Eq<FullAddDigit<Head<1>, Head<0>, 0>, Cons<1, Head<0>>>>
export type TestFullAddDigitJ = Test<Eq<FullAddDigit<Head<1>, Head<0>, 1>, Cons<0, Head<1>>>>
export type TestFullAddDigitK = Test<Eq<FullAddDigit<Head<1>, Head<1>, 0>, Cons<0, Head<1>>>>
export type TestFullAddDigitL = Test<Eq<FullAddDigit<Head<1>, Head<1>, 1>, Cons<1, Head<1>>>>

// Sum<Cons<1, Head<0>>, Cons<1, Head<0>>, 0>
// FullAddDigit<X, Y, CIN>
// Cons<0, Head<1>>

type Bin<X extends PeanoBinary> = X extends Cons<infer XBin, infer _XNext> ? XBin : null
export type TestBin = Test<Eq<Bin<Cons<1, Head<1>>>, 1>>
export type TestBin2 = Test<Eq<Bin<Head<1>>, 1>>
export type TestBin3 = Test<Eq<Bin<null>, null>>

type Next<X extends PeanoBinary> = X extends Cons<infer _XBin, infer XNext> ? XNext : Head<0>
export type TestNext = Test<Eq<Next<Cons<1, Head<1>>>, Head<1>>>

type SumInner<X extends PeanoBinary, Y extends PeanoBinary, CIN extends Binary> =
  FullAddDigit<X, Y, CIN> extends Cons<infer ConsSum, infer ConsNext>
  ? ConsNext extends Cons<infer COut, infer _X>
  ? Cons<ConsSum, SumInner<Next<X>, Next<Y>, COut>>
  : null
  : CIN extends 1 ? Cons<0, Head<CIN>> : null

type Sum<X extends PeanoBinary, Y extends PeanoBinary> = SumInner<X, Y, 0>

type Sum1 = Sum<Head<0>, Head<0>>
export type TestSum1 = Test<Eq<Sum1, Head<0>>>

type Sum2 = Sum<Head<0>, Head<1>>
export type TestSum2 = Test<Eq<Sum2, Head<1>>>

type Sum3 = Sum<Head<1>, Head<1>>
export type TestSum3 = Test<Eq<Sum3, Cons<0, Cons<0, Head<1>>>>>

type Sum4 = Sum<Cons<0, Head<0>>, Cons<0, Head<0>>>
export type TestSum4 = Test<Eq<Sum4, Cons<0, Head<0>>>>

type Sum5 = Sum<Cons<0, Cons<0, Head<1>>>, Cons<0, Cons<1, Head<0>>>>
export type TestSum5 = Test<Eq<Sum5, Cons<0, Cons<1, Head<1>>>>>

type Sum6 = Sum<Cons<1, Cons<1, Cons<1, Head<1>>>>, Cons<1, Cons<1, Cons<1, Head<1>>>>>
export type TestSum6 = Test<Eq<Sum6, Cons<0, Cons<0, Cons<0, Cons<0, Cons<0, Head<1>>>>>>>>
