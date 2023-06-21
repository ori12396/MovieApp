export default interface INavbarProps {
  fetchMovies: ((searchKey?: string, page?: number) => Promise<void>) | undefined;
}
