import { Entries } from '../types/typeBundle';

const getEntries = <T extends object>(obj: T) => Object.entries(obj) as Entries<T>;

export default getEntries;
