import type { Genre, MovieDetails } from '../utils/client';
import notFound from '../assets/no-image-svgrepo-com.svg'; // Path:

export function MovieList({ movies }: { movies: MovieDetails[] }) {
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
					<details style={{ minHeight: 40, paddingTop: 8 }}>
						<summary>Summary</summary>
						<div style={{ marginTop: 8, flex: 1 }}>
							{('summary' in movie && movie.summary) || 'No summary provided'}
						</div>
					</details>
					<GenreList genres={movie.genres} />
					<div style={{ marginTop: 8, flex: 1 }}>
						{movie.duration} - {movie.datePublished}
					</div>
				</div>
			))}
		</section>
	);
}

function formatRating(rating: string | undefined) {
	return rating ? ` (${rating})` : '';
}

function GenreList({ genres }: { genres: Genre[] }) {
	return (
		<div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
			{genres.map((genre) => (
				<span key={genre.id}>{genre.title}</span>
			))}
		</div>
	);
}
