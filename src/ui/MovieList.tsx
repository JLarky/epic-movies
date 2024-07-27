import type { Movie } from '../utils/client';
import notFound from '../assets/no-image-svgrepo-com.svg'; // Path:

export function MovieList({ movies }: { movies: Movie[] }) {
	return (
		<section
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
				gap: 10,
			}}
		>
			{movies.map((movie) => (
				<div
					key={movie.id}
					style={{
						display: 'flex',
						flexDirection: 'column',
						borderRadius: 10,
						background: 'lightgray',
						padding: 10,
						alignItems: 'center',
					}}
				>
					<div style={{ fontWeight: 'bold', marginBottom: 8, flex: 1 }}>
						{movie.title}
						{formatRating(movie.rating)}
					</div>
					<div style={{ width: 200, height: 200 }}>
						<img
							src={movie.posterUrl || notFound.src}
							alt={movie.title}
							style={{ objectFit: 'contain', width: '100%', height: '100%' }}
						/>
					</div>
				</div>
			))}
		</section>
	);
}

function formatRating(rating: string | undefined) {
	return rating ? ` (${rating})` : '';
}
