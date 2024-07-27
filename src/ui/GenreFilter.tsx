import { useAtom } from 'jotai';
import type { Genre } from '../utils/client';
import style from './GenreFilter.module.css';
import { genreAtom } from './searchAtom';

export function GenreFilter({ genres }: { genres: Genre[] }) {
	const [genreValue, setGenre] = useAtom(genreAtom);
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
			{genres.map((genre) => (
				<button
					type="button"
					className={style.genreButton}
					key={genre.id}
					style={{ borderRadius: 10, fontWeight: genre.title === genreValue ? 'bold' : 'normal' }}
					onClick={() =>
						setGenre((x) => {
							if (x === genre.title) {
								return undefined;
							}
							return genre.title;
						})
					}
				>
					{genre.title}
				</button>
			))}
		</div>
	);
}
