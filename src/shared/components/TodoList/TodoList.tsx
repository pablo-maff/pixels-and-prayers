export default function TodoList({ items, isLoading }: { items: boolean; isLoading: boolean }) {
  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {items ? (
        <ul>
          <li>BlaBla</li>
          <li>BlaBla</li>
          <li>BlaBla</li>
          <li>BlaBla</li>
        </ul>
      ) : (
        <p>no items avaible</p>
      )}
    </>
  );
}
