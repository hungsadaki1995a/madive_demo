import { createContext, useContext } from 'react';
import { type RootStore } from '@/stores';

type StoreType = Record<'MobxStore', RootStore>;

const CreateStore = createContext<null | StoreType>(null);
export const useStore = () => (useContext(CreateStore) as StoreType).MobxStore;
export default CreateStore;
