export default function AuthPage({ children }: React.PropsWithChildren) {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="bg-white min-w-[350px] rounded-lg p-8 transition-all">
        {children}
      </div>
    </div>
  );
}
