import GifProvider from "./GifProvider";
import SearchProvider from "./SearchProvider";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <GifProvider>
      <SearchProvider>{children}</SearchProvider>
    </GifProvider>
  );
}
