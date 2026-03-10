import { useCallback, useRef } from 'react';
import alert from '~/assets/sound/alert.wav';
import cursor from '~/assets/sound/cursor.wav';
import selection from '~/assets/sound/selection.wav';

const SOUND_URLS = {
	selection,
	alert,
	cursor,
} as const;

type SoundId = keyof typeof SOUND_URLS;

const COOLDOWN_MS = 400;

/**
 * Returns stable play functions for each sound effect. Each call is rate-limited
 * by COOLDOWN_MS so short SFX are not retriggered too fast.
 *
 * To add a new sound: add the import, add a key to SOUND_URLS, and add
 * `playYourEffect: () => play('yourEffect')` to the returned object.
 */
export function useSoundEffects() {
	const audioRefs = useRef<
		Partial<Record<SoundId, InstanceType<typeof Audio>>>
	>({});
	const lastPlayRef = useRef<Partial<Record<SoundId, number>>>({});

	const play = useCallback((id: SoundId) => {
		const now = Date.now();

		if ((lastPlayRef.current[id] ?? 0) + COOLDOWN_MS > now) return;

		const url = SOUND_URLS[id];
		let audio = audioRefs.current[id];
		if (!audio) audio = audioRefs.current[id] = new Audio(url);

		lastPlayRef.current[id] = now;
		audio.currentTime = 0;
		audio.play();
	}, []);

	return {
		playSelection: useCallback(() => play('selection'), []),
		playAlert: useCallback(() => play('alert'), []),
		playCursor: useCallback(() => play('cursor'), []),
	};
}
