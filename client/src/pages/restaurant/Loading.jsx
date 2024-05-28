function Loading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-center">Caricamento in corso...</p>
      </div>
    </>
  );
}
export default Loading;
