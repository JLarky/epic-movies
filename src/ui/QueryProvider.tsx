import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
	type DehydratedState,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export function QueryProvider({
	children,
	dehydratedState,
}: {
	children: React.ReactNode;
	dehydratedState: DehydratedState;
}) {
	return (
		<HydrationBoundary state={dehydratedState}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
		</HydrationBoundary>
	);
}
