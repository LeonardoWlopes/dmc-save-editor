import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IAuthState {
	accessToken: string | null;
}

interface IAuthActions {
	set: (state: Partial<IAuthState>) => void;
	reset: () => void;
}

type IAuthStore = IAuthState & IAuthActions;

const DEFAULT_STATE: IAuthState = {
	accessToken: null,
};

export const useAuthStore = create<IAuthStore>()(
	persist(
		(set) => ({
			...DEFAULT_STATE,
			set: (state) => set(state),
			reset: () => set(DEFAULT_STATE),
		}),
		{
			name: '@template/auth-store',
		},
	),
);
