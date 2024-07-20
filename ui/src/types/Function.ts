type IFunc<R extends any> = () => R;
type IFunc1<P extends any, R extends any> = (p: P) => R;
type IFunc2<P1 extends any, P2 extends any, R extends any> = (p1: P1, p2: P2) => R;
type IFunc3<P1 extends any, P2 extends any, P3 extends any, R extends any> = (p1: P1, p2: P2, p3?: P3) => R;

type IAction = () => void;
type IAction1<P extends any> = (p: P) => void;

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type {
    IAction,
    IAction1,
    IFunc,
    IFunc1,
    IFunc2,
    IFunc3,
    DeepPartial
}