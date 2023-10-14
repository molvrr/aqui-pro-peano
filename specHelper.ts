export type Eq<X, Y> = X extends Y ? Y extends X ? true : false : false
export type Not<X extends boolean> = X extends true ? false : true
export type Test<Bool extends true> = Bool
